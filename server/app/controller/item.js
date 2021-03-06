'use strict';

const Controller = require('egg').Controller;

class ItemController extends Controller {
    async add() {
        if (this.ctx.request.body.id) {
            const res = await this.app.model.Item.update(this.ctx.request.body, {
                where: {
                    id: this.ctx.request.body.id
                }
            })
            this.ctx.helper.success(this.ctx, res)
        } else {
            const item = {
                ...this.ctx.request.body,
                user: this.ctx.$data.id
            }
            const res = await this.app.model.Item.create(item)
            this.ctx.helper.success(this.ctx, res)
        }

    }
    async list() {
        const res = await this.app.model.Item.findAll({
            where: {
                user: this.ctx.$data.id
            }
        })
        this.ctx.helper.success(this.ctx, res)
    }
    async del() {
        const res = await this.app.model.Item.destroy({
            where: {
                id: this.ctx.query.id
            }
        })
        this.ctx.helper.success(this.ctx, res)
    }
}

module.exports = ItemController;
