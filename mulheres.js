const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        Nome: 'Jaqueline Sousa',
        Minibio: 'Desenvolvedora e Engenheira de Dados'

    },
    {
        Nome: 'Iana Chan',
        Minibio: 'Fundadora da Pragramaria'
    },
    {
        Nome: 'Nina da Hora',
        Minibio: 'Hacker antirracista'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}
function mostraPorta () {
    console.log("Servidor criado e rodando na Porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)