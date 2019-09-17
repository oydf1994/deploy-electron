module.exports = options => {
  return async function index(ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${new Date().toLocaleString()}- ${ms}ms`)
  };
};