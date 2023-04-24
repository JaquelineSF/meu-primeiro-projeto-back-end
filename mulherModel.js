const mongoose = require ('mongoose')

const MulherSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true
    },
    Imagem: {
        type: String,
        required:true,
    },
    Citacao: {
        type: String,
        required: true,
    },
    Minibio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('diva', MulherSchema)