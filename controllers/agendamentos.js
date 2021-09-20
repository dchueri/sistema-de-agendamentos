const Agendamento = require('../models/agendamentos')

module.exports = app => {
    app.get('/agendamentos', (req, res) => res.send('Rodando ok'))

    app.post('/agendamentos', (req, res) => {
        const agendamento = req.body

        Agendamento.adiciona(agendamento)
        res.send('Post da rota de agendamentos')
    })
}