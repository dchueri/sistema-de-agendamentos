module.exports = app => {
    app.get('/agendamentos', (req, res) => res.send('Rodando ok'))

    app.post('/agendamentos', (req, res) => {
        console.log('Req Enviada')
        console.log(req.body)    
        res.send('Post da rota de agendamentos')
    })
}