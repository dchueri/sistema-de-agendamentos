class Tabelas {
    init(conexao) {
        console.log('Tabelas chamadas')
        this.conexao = conexao

        this.criarDicas()
    }

    criarDicas() {
        const sql = 'CREATE TABLE IF NOT EXISTS Dicas (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
         
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela DICAS criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas