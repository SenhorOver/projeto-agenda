import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/Login'
import Contato from './modules/Contato'

try{
    const login = new Login('.form-login')
    const cadastro = new Login('.form-cadastro')

    login.init()
    cadastro.init()
} catch(e){}

try{
    const contato = new Contato()
    
    contato.init()
} catch(e){}

// import './assets/css/style.css'

