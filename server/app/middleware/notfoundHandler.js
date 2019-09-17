module.exports = (options) => {
    return async function notFoundHandler(ctx, next) {
        try {
            await next()
        } catch (err) {
            ctx.logger.error(err);
            ctx.helper.error(ctx, 400, err.errors || err.code || err.message || err.name || '未知异常')
        }
    };
};