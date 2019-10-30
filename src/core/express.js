import express from 'express'
import bodyParser from 'body-parser'
import glob from 'glob'
import path from 'path'
import configs from './configs'

const server = express()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

glob.sync(path.join(__dirname, '../modules/**/routes.js')).forEach(routePath => {
  server.use(configs.API_BASE_PATH, require(path.resolve(routePath)).default())
})

server.get('*', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h3>Tech Mahindra API - V1.0.0</h3>\n')
})

export default server
