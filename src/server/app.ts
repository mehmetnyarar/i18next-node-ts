import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import i18next from 'i18next' // https://github.com/i18next/i18next/issues/1177
import * as i18nextMiddleware from 'i18next-express-middleware'
import i18nNodeFs from 'i18next-node-fs-backend'

import { CORS_WHITE_LIST } from '@config'

// ========= APP

const app = express()

// ========= CORS

const corsWhiteList = CORS_WHITE_LIST.split(',')
export const corsOptions: cors.CorsOptions = {
  origin: corsWhiteList,
  credentials: true
}

// ========= LOCALIZATION

const languageDetector = new i18nextMiddleware.LanguageDetector(
  null,
  {
    order: ['header'],
    caches: false
  },
  {
    fallbackLng: 'ru'
  }
)
const i18nBackend = new i18nNodeFs(null, {
  loadPath: __dirname + '/locales/{{lng}}.json',
  addPath: __dirname + '/locales/missing.json',
  jsonIndent: 2
})
// const i18next = require('i18next') // This works
i18next
  .use(languageDetector)
  .use(i18nBackend)
  .init({
    load: 'languageOnly',
    preload: ['ru', 'kz', 'en'],
    whitelist: ['ru', 'kz', 'en'],
    fallbackLng: 'ru'
  })

// ========= SETUP MIDDLEWARES

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(i18nextMiddleware.handle(i18next))

export default app
