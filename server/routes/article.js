const articleModel = require('../models/article');

module.exports = (router) => {
    router.get('/api/articles/', async(ctx, next) => {
        const term = ctx.request.query.name;
        const reg = new RegExp(term, 'i');
        console.log(term);
        const result = await articleModel.find({ article_title: { $regex: reg } }).exec();
        console.log(result);
        ctx.body = {
            success: true,
            data: result
        }
    });
    router.get('/detail/:id', async(ctx, next) => {
            const id = ctx.params.id;
            const result = await articleModel.findById({ _id: id }).exec();
            console.log(result);
            ctx.body = {
                success: true,
                data: result
            }
        })
        .del('/detail/:id', async(ctx, next) => {
            const id = ctx.params.id;
            const result = await articleModel.deleteOne({ _id: id }).exec();
            ctx.body = {
                success: true
            }
        });
    router.get('/list/:id', async(ctx, next) => {
            const currentPage = (ctx.params.id && ctx.params.id > 0) ? (ctx.params.id - 1) * 5 : 0;
            const result = await articleModel.find({}).sort({ _id: -1 }).skip(currentPage).limit(5).exec();
            const count = await articleModel.count({}).exec();
            ctx.body = {
                success: true,
                data: result,
                count: count
            };
        })
        .post('/publish', async(ctx, next) => {
            const article = {
                article_title: ctx.request.body.article_title,
                article_cat: ctx.request.body.article_cat,
                article_content: ctx.request.body.article_content
            };
            const articleObj = new articleModel(article);
            const result = await articleObj.save((err, doc) => {
                if (err) {
                    console.log(err);
                }

            });

            ctx.body = {
                success: true
            }

        });


}