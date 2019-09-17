const jwt = require('jsonwebtoken');
module.exports = async (ctx, next) => {
    const token = ctx.request.header.token
    const decode = await jwt.verify(token, ctx.app.config.jwtKey)
    ctx.$data = decode
    await next()
};