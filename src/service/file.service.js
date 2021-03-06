const connections = require('../app/database')

class FileService {
    async createAvatar(filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);`
        const [result] = await connections.execute(statement, [filename, mimetype, size, userId])
        return result
    }
    async getAvatarByUserId(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        const [result] = await connections.execute(statement, [userId])
        return result[result.length - 1]
    }
    async createFile(filename, mimetype, size, momentId, userId) {
        const statement = `INSERT INTO file (filename, mimetype, size, moment_id, user_id) VALUES (?,?,?,?,?);`
        const [result] = await connections.execute(statement, [filename, mimetype, size, momentId, userId])
        return result
    }
    async getFileByFileName(fileName) {
        const statement = `SELECT * FROM file WHERE filename = ?;`
        const [result] = await connections.execute(statement, [fileName])
        console.log('这里做出了修改');
        return result[0]
    }
}

module.exports = new FileService()

