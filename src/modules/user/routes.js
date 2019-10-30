import express from 'express'
import { checkAuthorization } from '@core/auth'
import * as controller from './controller'

const router = express.Router()
const API_USER_BASE_PAH = '/user'

export default () => {
  router.get(`${API_USER_BASE_PAH}/:id`, checkAuthorization, controller.getById)
  router.post(`${API_USER_BASE_PAH}/signup`, controller.signUp)
  router.post(`${API_USER_BASE_PAH}/signin`, controller.signIn)

  return router
}
