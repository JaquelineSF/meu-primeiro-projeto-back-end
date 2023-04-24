const express = require("express") // Aqui estou iniciando o express
const router = express.Router() // Aqui estou configurando a primeira parte da rota
const cors = require('cors')//Aqui estou instalando o pacote cors que permite consumir essa API no Front End

const conectaBancoDeDados = require('./bancoDeDados')//aqui estou ligando ao arquivo banco de dados
conectaBancoDeDados()//aqui eu estou chamando a função que conecta o banco de dados

const Mulher = require ('./mulherModel.js')

const app = express() //Aqui estou iniciando o App
app.use(express.json())
app.use(cors())

const porta = 3333 // Aqui estou criando a porta

//GET
async function mostraMulheres(request, response) {
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)

    }
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher ({
        Nome: request.body.Nome,
        Imagem: request.body.Imagem,
        Minibio: request.body.Minibio,
        Citacao: request.body.Citacao
    })
    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {

        const mulherEncontrada = await Mulher.findById(request.params.ID)

        if (request.body.Nome) {
            mulherEncontrada.Nome = request.body.Nome
        }

        if (request.body.Imagem) {
            mulherEncontrada.Imagem = request.body.Imagem
        }

        if (request.body.Minibio) {
            mulherEncontrada.Minibio = request.body.Minibio
        }
        if (request.body.Citacao){
            mulherEncontrada.Citacao = request.body.Citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados)
    }catch (erro){
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response){
   try{
    await Mulher.findByIdAndDelete(request.params.ID)
    response.json({messagem: 'Mulher deletada com sucesso!'})
   }catch(erro) {
        console.log(erro)
   }
}

app.use(router.get('/mulheres', mostraMulheres)) // Configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // Configurei rota POST /mulheres
app.use(router.patch('/mulheres/:ID', corrigeMulher))//Configurei a rota PACH /mulheres/:id
app.use(router.delete('/mulheres/:ID', deletaMulher))//Configuei a rota DELETE/mulheres

//Porta 
function mostraPorta () {
    console.log("Sevidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta) //Servidor ouvindo a porta

