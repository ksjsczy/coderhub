const app = require('./app')
require('./app/database')
const { APP_PORT } = require('./app/config')

app.listen(APP_PORT, () => {
    console.log(`服务器端口号${APP_PORT}启动成功~`);
})