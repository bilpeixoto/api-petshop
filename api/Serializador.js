const ValorNaosuportado = require('./erros/ValorNaoSuportado')

class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }

    serializar (dados) {
        if(this.contentType === 'aplication/json') {
            return this.json(dados)
        }

        throw new ValorNaosuportado(this.contentType)
    }
}