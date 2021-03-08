const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
const ValorNaosuportado = require('./erros/ValorNaoSuportado')
app.use('/api/fornecedores', roteador)

app.use((erro, req, res, proximo) => {
    let status = 500

    if(erro instanceof NaoEncontrado) {
        status = 404
    }

    if(erro instanceof CampoInvalido) {
        status = 400
    }

    if(erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    if(erro instanceof ValorNaosuportado) {
        status = 406
    }
    
    res.status(status).json({ 
        mensagem: erro.message,
        id:  erro.idErro
    })
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando'))