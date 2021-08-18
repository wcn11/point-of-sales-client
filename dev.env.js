'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./config/prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: 'development',
    VUE_APP_BASE_URL_API: 'api-pos.beliayam.test'
})