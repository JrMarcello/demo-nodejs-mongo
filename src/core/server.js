import 'dotenv/config'
import server from '@core/express'
import db from '@core/database'
import configs from '@core/configs'

server.listen(configs.SERVER.PORT, () => {
  console.log(`Server running in http://localhost:${configs.SERVER.PORT}`)
})
