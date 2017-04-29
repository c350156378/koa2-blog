import Koa from 'koa';
import mongoose from 'koa-mongoose';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import kcors from 'kcors';
import session from 'koa-session2';


const app = new Koa();
const router = new Router();

//db

//config,网站名称，端口之类的
app.keys = ['koa2-blog'];

app.use(kcors())
    .use(logger())
    .use(bodyParser())
    .use(session({ key: "koa2-blog" }))
    .use(router.routes())
    .use(router.allowedMethods());


app.use(ctx => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + 'views';
});

app.listen(3000, () => { console.log('runnin on port 3000') });