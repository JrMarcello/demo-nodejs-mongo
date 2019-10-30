import moment from 'moment'
import * as repository from './repository'

/**
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 *
 * @returns {Object} HTTP response with status code and data
 */
export const getById = async (request, response) => {
  try {
    const user = await repository.getById(request.params.id)

    if (user.token !== request.user.token) return response.status(401).json({ mensagem: 'Não autorizado' })

    const sessiontime = moment.duration(moment(Date.now()).diff(moment(user.ultimo_login))).asMinutes()

    if (sessiontime > 30) return response.status(401).json({ mensagem: 'Sessão inválida' })

    return response.status(200).json(user)
  } catch (err) {
    return response.status(500).json({ mensagem: err.message })
  }
}

/**
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 *
 * @returns {Object} HTTP response with status code and data
 */
export const signUp = async (request, response) => {
  try {
    const user = await repository.signUp(request.body)

    response.status(200).json(user)
  } catch (err) {
    response.status(500).json({ mensagem: err.message })
  }
}

/**
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @returns {Object} HTTP response with status code and data
 */
export const signIn = async (request, response) => {
  try {
    const user = await repository.signIn(request.body)

    response.status(200).json(user)
  } catch (err) {
    response.status(401).json({ mensagem: err.message })
  }
}
