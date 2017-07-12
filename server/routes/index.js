module.exports = (app) => {
    const router = require('koa-router')();

    require('./user')(router);
    require('./system')(router);
    require('./article')(router);

    app.use(router.routes())
        .use(router.allowedMethods());

}