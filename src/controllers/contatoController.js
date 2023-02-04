const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    const csrfToken = req.csrfToken()
    res.render('contato', {
        pageTitle: 'Contatos',
        csrfToken,
        contato: {}
    })
} 

exports.register = async (req, res) => {
    try{
        const contato = new Contato(req.body)
        await contato.register()
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato'))
            return
        }
        
        req.flash('success', 'Contato registrado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
    } catch(e){
        console.log(e)
        res.render('erro404', {pageTitle: '404'})
    }
}


exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('erro404', {pageTitle: '404'})

    try{
        const contato = await Contato.buscaPorId(req.params.id)
        if(!contato) return res.render('erro404', {pageTitle: '404'})
    
        const csrfToken = req.csrfToken()
        res.render('contato', {
            pageTitle: 'Contatos',
            csrfToken,
            contato
        })
    } catch(e){
        res.render('erro404', {pageTitle: '404'})
    }
}


exports.edit = async (req, res) => {
    try{
        if(!req.params.id) return res.render('erro404', {pageTitle: '404'})
        const contato = new Contato(req.body)
    
        await contato.edit(req.params.id)
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato'))
            return
        }
        
        req.flash('success', 'Contato editado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
    } catch(e){
        console.log(e)
        res.render('erro404', {pageTitle: '404'})
    }

}


exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('erro404', {pageTitle: '404'})

    try{
        const contato = await Contato.delete(req.params.id)
        if(!contato) return res.render('erro404', {pageTitle: '404'})
    
        req.flash('success', 'Contato apagado com sucesso')
        req.session.save(() => res.redirect('/'))
    } catch(e){
        res.render('erro404', {pageTitle: '404'})
    }
}