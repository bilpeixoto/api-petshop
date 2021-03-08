class CampoInvalido extends Error {
    constructor (campo) {
        const mensagem = `O campo ${campo} está inválido`
        super(mensagem)
        this.name = 'CampoInválido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido