const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.fornecedor.id)
    res.send(
        JSON.stringify(produtos)
    )
})

roteador.get('/:idProduto', async (req, res) => {
    const produtos = await Tabela.listar(req.fornecedor.id)
    res.send(
        JSON.stringify(produtos)
    )
})

roteador.post('/', async (req, res) => {
    try{
        const idFornecedor = req.fornecedor.id
        const corpo = req.body
        dados = Object.assign({}, corpo, {fornecedor: idFornecedor})
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201).json(produto)
    } catch(erro) {
        res.send(JSON.stringify(erro))
    }
})

roteador.delete('/:id', async (req, res) => {
    try {
        dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
        const produto = new Produto(dados)
        await produto.apagar()
        res.status(204)
        res.end()
    } catch (erro) {
        res.status(400)
        res.send(JSON.stringify(erro))
    }
})

const roteadorReclamacoes = require('./reclamacoes')
roteador.use('/:idProduto/reclamacoes', roteadorReclamacoes)

module.exports = roteador