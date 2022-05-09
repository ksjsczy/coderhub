const connections = require('../app/database')

class authService {
    async checkResource(tableName, resourceId, id) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
        const [result] = await connections.execute(statement, [resourceId, id])
        return result.length === 0 ? false : true
    }

}

module.exports = new authService()