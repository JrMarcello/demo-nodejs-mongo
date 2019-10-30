import mongoose from 'mongoose'

const { Schema } = mongoose

const User = new Schema({
  id: String,
  nome: {
    type: String,
    required: [true, 'Nome é um campo obrigatŕio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email é um campo obrigatŕio']
  },
  senha: {
    type: String,
    required: [true, 'Senha é um campo obrigatŕio']
  },
  telefones: [{ numero: String, ddd: String }],
  data_criacao: { type: Date, default: Date.now },
  data_atualizacao: { type: Date, default: Date.now },
  ultimo_login: { type: Date, default: Date.now },
  token: String
})

User.post('save', (error, doc, next) => {
  next(error.code === 11000 ? new Error('Email já existe') : error)
})

export default mongoose.model('User', User)
