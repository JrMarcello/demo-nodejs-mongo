import bcrypt from 'bcrypt'
import uuid from 'uuid/v4'
import { getToken } from '@core/auth'
import dao from './dao'

/**
 *  Get all Users
 *
 * @returns {Promisse}
 */
export const getAll = () => {
  return dao.find({})
}

/**
 * Find a User by ID
 *
 * @param {Interger} id - User ID
 * @returns {Promisse}
 */
export const getById = id => {
  return dao.findOne({ id })
}

/**
 * Saves a User in database
 *
 * @param {Object} data
 * @returns {Promisse}
 */
export const signUp = async data => {
  data.id = uuid()
  data.senha = bcrypt.hashSync(data.senha, 10)
  data.token = await getToken({ id: data._id })

  return dao.create(data)
}

/**
 * Sign In an User
 *
 * @param {Object} params
 * @returns {Promisse}
 */
export const signIn = async params => {
  const user = await dao.findOne({ email: params.email })

  if (!user || !bcrypt.compareSync(params.senha, user.senha)) throw new Error('Usuário e/ou senha inválidos')

  user.ultimo_login = Date.now()
  user.data_atualizacao = Date.now()
  user.save()

  return user
}
