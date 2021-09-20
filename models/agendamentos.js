const conexao = require('../infraestrutura/conexao')

class Agendamentos {
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