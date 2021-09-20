module.exports = app => {
    app.get('/dicas', (req, res) => res.send('Rodando ok'))

    app.post('/dicas', (req, res) => {
        console.log('Req Enviada')
        console.log(req.body)    
        res.send('Post da rota dicas')
    })
}