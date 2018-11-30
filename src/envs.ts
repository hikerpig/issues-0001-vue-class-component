export const VUE_ENV = process.env.VUE_ENV

const isServer = (VUE_ENV === 'server')
const isProduction = (process.env.NODE_ENV === 'production')

let hostGlobal: any
try {
  hostGlobal = window
} catch (err) {
  hostGlobal = require('globals')
}
export {
  isServer,
  isProduction,
  hostGlobal,
}
