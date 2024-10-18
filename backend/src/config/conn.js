import { Sequelize } from "sequelize";

const DBName = "prep_ade"
const DBUser = "root"
const DBPassword = "Sen@iDev77!."
const DBHost = "localhost"

const conn = new Sequelize(DBName, DBUser, DBPassword, {
    dialect: "mysql",
    host: DBHost
})

try {
    await conn.authenticate()
    console.log('[DB] Conexão realizada com sucesso')
} catch (error) {
    console.error('[DB] Error: ' + error)
}

export default conn;