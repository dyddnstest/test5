americano = require 'americano'

port = process.env.PORT || 3616
host = process.env.HOST || '0.0.0.0'

start = (host, port, callback) ->
  americano.start
    name: 'x-Appbuilder'
    port: port
    root: __dirname
    host: host


if not module.parent
  port = process.env.PORT || 4000
  host = process.env.HOST || '0.0.0.0'
  start host, port, (err) ->
    if err
      console.log "Initialization failed, not starting"
      console.log err.stack
      process.exit 1

    else
      module.exports = start