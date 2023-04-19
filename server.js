const express = require("express")

const app = express()
const porta = 3333

function mostraPorta () {
    console.log("Servidor criado e rodando na Porta ", porta)
}

app.listen(porta, mostraPorta)