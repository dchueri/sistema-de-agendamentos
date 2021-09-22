const { default: axios } = require('axios')
const moment = require('moment')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/agendamento')

class Agendamento {
    adiciona(agendamento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(agendamento.data, 'DD/MM/YYYY').format(
            'YYYY-MM-DD HH:MM:SS'
        )
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = agendamento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const agendamentoDatado = {...agendamento, dataCriacao, data}
   
            return repositorio.adiciona(agendamentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return { ...agendamento, id }
            })
        } 
    }

    lista(res) {
        const sql = 'SELECT * FROM Agendamentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Agendamentos WHERE id=${id}`

        conexao.query(sql, async (erro, resultados) => {
            const agendamento = resultados[0]
            const cpf = agendamento.cliente
            if(erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)

                agendamento.cliente = data

                res.status(200).json(agendamento)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format(
                'YYYY-MM-DD HH:MM:SS'
            )
        }      
        const sql = 'UPDATE Agendamentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Agendamentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Agendamento