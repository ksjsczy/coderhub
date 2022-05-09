const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

//1.  why 123456
//2.  coderwhy 234567
//3.  tom abcdef
//4.  jerry bcdefg
//5.  lucy efghij

//1. coderwhy 123123
//2. lihua 12121321
//3. lilei abc123
//4. lucy 123456

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

// const {APP_PORT, } = process.env

module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY