module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "entities": ["dist/src/models/*.js"],
    "migrations": ["./dist/src/exports/*.js"]
}
