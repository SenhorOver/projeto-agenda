exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    // res.locals.csrfToken = req.csrfToken()
    next()
}

exports.erroCSRF = (err, req, res, next) => {
    if(err){
        return res.render('erro404', {
            pageTitle: '404 - Error'
        })
    }

    next()
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login')
        req.session.save(() => res.redirect('/'))
        return
    }
    
    next()
}