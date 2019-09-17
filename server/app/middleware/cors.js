module.exports = options => {
    return async function success(ctx, next) {
        ctx.set('Access-Control-Allow-Origin', ctx.headers.origin); // 很奇怪的是，使用 * 会出现一些其他问题
        ctx.set('Access-Control-Allow-Headers', 'content-type,token');
        ctx.set('Access-Control-Allow-Credentials', true);
        ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
        if (ctx.method == 'OPTIONS') {
            ctx.body = true
        } else {
            await next();
        }
    };
};