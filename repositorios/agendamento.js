const query = require('../infraestrutura/database/queries')

class Agendamento {
    adiciona(agendamento) {
        const sql = 'INSERT INTO Agendamentos SET ?'
        return query(sql, agendamento)
    }
}

module.exports = new Agendamento()