const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utiles/password-handle')

const verifyLogin = async (ctx, next) => {
    //1.获取用户名和密码
    const { name, password } = ctx.request.body

    //2.判断用户名或者密码是否为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        ctx.app.emit('error', error, ctx)
        return
    }

    //3.判断用户是否存在
    const result = await userService.getUserByName(name)
    const user = result[0]
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXIST)
        ctx.app.emit('error', error, ctx)
        return
    }

    //4.判断密码是否和数据库中的密码一致(加密)
    if (md5password(password) !== user.password) {
        const error = new Error(errorTypes.PASSWORD_IS_INCORRECT)
        ctx.app.emit('error', error, ctx)
        return
    }

    ctx.user = user
    await next()
}

const verifyAuth = async (ctx, next) => {
    console.log('验证授权的middleware');
    //1.获取token
    const authorization = ctx.headers.authorization
    if (!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace('Bearer ', '')

    //2.验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
}

const verifyPermisson = async (ctx, next) => {
    console.log('验证权限的middleware');

    //1.获取参数
    let tableName = Object.keys(ctx.params)[0]
    const resourceId = ctx.params[tableName]
    tableName = tableName.replace('Id', '')
    const { id } = ctx.user

    //2.查询是否具备权限
    try {
        const isPermission = await authService.checkResource(tableName, resourceId, id)
        if (!isPermission) throw new Error()
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNPERMISSION)
        ctx.app.emit('error', error, ctx)
    }

}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermisson
}