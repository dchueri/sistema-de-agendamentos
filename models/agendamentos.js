const conexao = require('../infraestrutura/conexao')

class Agendamento {
    adiciona(agendamentos) {
        const sql = 'INSERT INTO Agendamentos SET ?'

        conexao.query(sql, agendamentos, (erro, resultados) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Agendamento