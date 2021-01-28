const ormconfig = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "database": "jobit",
    "synchronize": true,
    "entities": ["./dist/src/models/*.js"],
    "migrations" : ["./dist/src/exports/*.js"]
}

export default ormconfig;