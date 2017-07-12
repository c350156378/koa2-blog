const Koa = require('koa');
const mongoose = require('koa-mongoose');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const kcors = require('kcors');
const historyApiFallback = require('koa-history-api-fallback');
const serve = require('koa-static');


const app = new Koa();
const router = new Router();

//db
app.use(mongoose({
    user: '',
    pass: '',
    host: '127.0.0.1',
    port: 27017,
    database: 'koa2-blog',
    db: {
        native_parser: true
    },
    server: {
        poolSize: 5
    }
}));



//config,网站名称，端口之类的
app.keys = ['koa2-blog'];

app.use(kcors())
    .use(logger())
    .use(bodyParser())
    .use(historyApiFallback())
    .use(serve(__dirname + '/dist'));

require('./routes/index')(app);

app.listen(3000, () => { console.log('runnin on port 3000') });