const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utiles/password-handle')

const verifyUser = async (ctx, next) => {
    //1.获取用户名和密码
    const { name, password } = ctx.request.body

    //2.判断用户名或者密码是否为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        ctx.app.emit('error', error, ctx)
        return
    }

    //3.判断这次注册的用户名是否被注册过
    const result = await service.getUserByName(name)
    if (result.length) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS)
        ctx.app.emit('error', error, ctx)
        return
    }

    await next()
}

const handlePassword = async (ctx, next) => {
    ctx.request.body.password = md5password(ctx.request.body.password)
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}