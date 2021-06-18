
module.exports = {
    secretKey: "MySecretKey",
    mqtt: {
        host: 'localhost',
        port: 1883,
        username: 'mqtt-test',
        password: 'mqtt-test',

    },
    development: {
        username: "sa",
        password: "root",
        database: "Wimera_DB",
        host: "localhost",
        dialect: "mssql",
        operatorsAliases: false
      }
};

