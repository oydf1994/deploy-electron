'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
class HomeController extends Controller {
  async index() {
    this.ctx.helper.success(this.ctx, '欢迎光临')
  }
  async login() {
    const res = await this.app.model.User.findOrCreate({
      where: this.ctx.request.body
    })
    if (res != null) {
      let token = jwt.sign({
        id: res[0].dataValues.id
      }, this.config.jwtKey, {
        expiresIn: 60 * 60 * 2 // 1小时过期
      });
      // this.ctx.body = res
      this.ctx.helper.success(this.ctx, { token, name: res[0].dataValues.name })
    } else {
      this.ctx.helper.error(this.ctx, 400, '账号密码错误')

    }
  }
}
module.exports = HomeController;