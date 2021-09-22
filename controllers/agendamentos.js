const Agendamento = require('../models/agendamentos')

module.exports = app => {
    app.get('/agendamentos', (req, res) => {
        Agendamento.lista(res)
    })

    app.get('/agendamentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Agendamento.buscaPorId(id, res)
    })

    app.post('/agendamentos', (req, res) => {
        const agendamento = req.body

        Agendamento.adiciona(agendamento)
            .then(agendamentoCadastrado => 
                res.status(201).json(agendamentoCadastrado)
            )
            .catch(erros => res.status(400).json(erros))
    }) 

    app.patch('/agendamentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Agendamento.altera(id, valores, res)
    })

    app.delete('/agendamentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Agendamento.deleta(id, res)
    })
}