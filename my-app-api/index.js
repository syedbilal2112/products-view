
"use strict";

const server = require('./listener/server');
const serverInit = require('./app/init/init');
const router = require('./app/routes/router');
var fs = require('fs');

var getConfig = async function (configFile) {
  await fs.readFile(configFile, function (err, data) {
    if (err) {
      return err;
    }
    let constants = JSON.parse(data);
    serverInit.serverInit(constants);
  })
}
var init = async function () {
  let constants = await getConfig(process.argv[2])
}

init()
/**
 * Initialize Router
 */
server.start(router.router);