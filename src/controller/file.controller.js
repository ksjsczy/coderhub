const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
    async saveAvatarInfo(ctx, next) {
        //1.获取图像相关的信息
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user

        //2.讲图像信息数据保存到数据库中
        const result = await fileService.createAvatar(filename, mimetype, size, id)

        //3.更新用户头像信息
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await userService.updateAvatarUrlById(avatarUrl, id)

        //4.返回结果
        ctx.body = '上传头像成功~'
    }

    async savePictureInfo(ctx, next) {
        const files = ctx.req.files
        // if (!files) {
        //     ctx.body = '图片已存在~'
        //     return
        // }
        //1.获取动态配图相关的信息
        const { id } = ctx.user
        const { momentId } = ctx.query
        for (let file of files) {
            //1.获取动态配图相关的信息
            const { filename, mimetype, size } = file

            //2.讲图像信息数据保存到数据库中
            await fileService.createFile(filename, mimetype, size, momentId, id)
        }

        //3.返回结果
        ctx.body = '上传动态配图成功~'
    }


}

module.exports = new FileController()