import * as http from 'http'

import { SERVER_HOST, SERVER_PORT } from './config'
import { app } from './server'

app.get('/', (req: any, res, next) => {
  console.log('req.language', req.language)
  console.log('req.languages', req.languages)
  if (req.i18n) res.send(req.i18n.t('HELLO'))
  else res.send('OOPS...')
})

const httpServer = http.createServer(app)
const port = parseInt(SERVER_PORT, 10)

httpServer.listen(port, SERVER_HOST, (error) => {
  if (error) {
    console.log('😔 Server error', error)
    return
  }

  const serverUrl = `http://${SERVER_HOST}:${port}`
  console.log(`🚀 Server ready at ${serverUrl}`)
})
