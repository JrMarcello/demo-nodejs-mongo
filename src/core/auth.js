import jwt from 'jsonwebtoken'
import configs from './configs'

export const checkAuthorization = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) return res.status(401).send({ messgem: 'Não autorizado' })

  const token = req.headers.authorization.split(' ')[1]

  if (!token) return res.status(401).send({ messgem: 'Não autorizado' })

  req.user = await jwt.verify(token, configs.SECRET_KEY)
  req.user.token = token

  return next()
}

export const getToken = payload => jwt.sign(payload, configs.SECRET_KEY, { algorithm: 'HS256', expiresIn: '365d' })
