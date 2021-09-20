const conexao = require('../infraestrutura/conexao')

class Dicas {
    adiciona(dicas) {
        const sql = 'INSERT INTO Dicas SET ?'

        conexao.query(sql, dicas, (erro, resultados) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}