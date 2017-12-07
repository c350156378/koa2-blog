const systemModel = require('../models/system');

module.exports = (router) => {
    router.get('/api/setting', async(ctx, next) => {
            const result = await systemModel.find().exec();
            ctx.body = {
                success: true,
                data: result
            };
        })
        .post('/api/setting', async(ctx, next) => {
            const sys = {
                blog_poster: ctx.request.body.blog_poster,
                blog_title: ctx.request.body.blog_title,
                blog_desc: ctx.request.body.blog_desc,
            };
            const result = await systemModel.remove();

            const sysObj = new systemModel(sys);
            sysObj.save((err, doc) => {
                if (err) {
                    console.log(err);
                }
            });


            ctx.body = {
                success: true
            }

        });
}