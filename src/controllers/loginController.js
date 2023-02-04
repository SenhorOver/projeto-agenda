const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado', {pageTitle: 'Logado'})
    const csrfToken = req.csrfToken()
    return res.render('login', {
        pageTitle: 'Login',
        csrfToken
    })
}


exports.register = async (req, res) => {
    try{
        const login = new Login(req.body)
        await login.register()
    
        
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect('/login')
            })
            return
        }
        
        req.flash('success', 'Seu usuário foi criado com sucesso.')
        req.session.save(function () {
            return res.redirect('/login')
        })
    } catch(e) {
        console.log(e)
        return res.render('erro404', {
            pageTitle: '404 - Error'
        })
    }
}

exports.login = async (req, res) => {
    try{
        const login = new Login(req.body)
        await login.login()
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect('/login')
            })
            return
        }
        
        req.flash('success', 'Você entrou no sistema')
        req.session.user = login.user
        req.session.save(function () {
            return res.redirect('/login')
        })
    } catch(e) {
        console.log(e)
        return res.render('erro404', {
            pageTitle: '404 - Error'
        })
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}