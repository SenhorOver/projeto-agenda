const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    try{
        const contatos = await Contato.buscaContatos()
    
        res.render('index', {
            pageTitle: 'Home Page',
            contatos
        })
    } catch(e){
        res.render('erro404', {
            pageTitle: '404'
        })
    }
}