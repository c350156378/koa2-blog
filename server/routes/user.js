const userModel = require('../models/user');

module.exports = (router) => {
    router.post('/api/login', async(ctx, next) => {
        const data = ctx.request.body;
        const userInfo = await userModel.find({ email: data.email }).exec();
        if (userInfo !== null) {
            ctx.body = {
                success: true
            }
        } else {
            ctx.body = {
                success: false,
                info: '用户不存在'
            }
        }

    })
}