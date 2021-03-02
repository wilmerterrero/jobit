module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "tabardeveloper",
    "database": "jobsapi",
    "synchronize": true,
    "entities": ["dist/src/models/*.js"],
}
