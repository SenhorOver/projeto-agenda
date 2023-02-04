import validator from 'validator'

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
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
        const emailInput = el.querySelector('input[name="email"]')
        const pwdInput = el.querySelector('input[name="password"]')
        let error = false

        if(!validator.isEmail(emailInput.value)) {
            const divError = Login.createError('E-mail inválido')
            emailInput.insertAdjacentElement('afterend', divError)
            error = true
        }

        if(pwdInput.value.length < 3 || pwdInput.value.length > 50) {
            const divError = Login.createError('Senha precisa ter entre 3 e 50 caracteres')
            pwdInput.insertAdjacentElement('afterend', divError)
            error = true
        }

        if(!error) el.submit()
    }

    static createError(msg){
        const div = document.createElement('div')
        div.innerText = msg
        div.classList.add('text-danger')
        return div
    }
}