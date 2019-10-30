import mongoose from 'mongoose'
import configs from '@core/configs'

mongoose.Promise = global.Promise

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

export default mongoose
  .connect(configs.DB_URI, options)
  .then(() => {
    console.log(`DB connected! [${configs.DB_URI}]`)
  })
  .catch(err => {
    console.error(err)
  })
