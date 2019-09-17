// 处理成功响应
exports.success = (ctx, result = null, message = "请求成功", status = 200) => {
    ctx.body = {
        status: status,
        message: message,
        data: result
    };
    ctx.status = 200;
};

// 处理失败响应
exports.error = (ctx, status, message) => {
    ctx.body = {
        status: status,
        message: message
    };
    ctx.status = 200;
};