const validator = require('validator')

export default class Contato {
    constructor(){
        this.form = document.querySelector('.form-contato')
    }

    init() {
        this.events()
    }

    events(){
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.removeErrors(e)
            this.validate(e)
        })
    }

    removeErrors(e){
        const el = e.target
        const errors = el.querySelectorAll('.text-danger')
        errors.forEach(error => {
            error.remove()
        })
    }

    validate(e){
        const el = e.target
        const nomeInput = el.querySelector('input[name="nome"]')
        const emailInput = el.querySelector('input[name="email"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')
        let error = false

        if(!nomeInput.value){
            const divError = this.createError('Campo "Nome" é obrigatório')
            nomeInput.insertAdjacentElement('afterend', divError)
            error = true
        }

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            const divError = this.createError('E-mail inválido')
            emailInput.insertAdjacentElement('afterend', divError)
            error = true
        }

        if(!emailInput.value && !telefoneInput.value) {
            const divError = this.createError('É necessário que ou campo "Email" ou "Telefone" esteja preenchido')
            const divError2 = this.createError('É necessário que ou campo "Email" ou "Telefone" esteja preenchido')

            emailInput.insertAdjacentElement('afterend', divError2)
            telefoneInput.insertAdjacentElement('afterend', divError)
            error = true
        }


        if(!error) el.submit()
    }

    createError(msg){
        const div = document.createElement('div')
        div.classList.add('text-danger')
        div.innerText = msg
        return div
    }
}