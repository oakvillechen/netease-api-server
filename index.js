const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()

// Ensure anonymous_token exists
if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
  fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
}

const generateConfig = require('./generateConfig')
const { consturctServer } = require('./server')

let app = null

module.exports = async (req, res) => {
  if (!app) {
    await generateConfig()
    app = await consturctServer()
  }
  return app(req, res)
}
