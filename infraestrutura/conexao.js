const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '16039509',
    database: 'agendamentos'
})

module.exports = conexao