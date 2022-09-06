/*
    Copyright 2022 Camptocamp SA
    License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl)
*/
odoo.define("pos_lot_base.models", function (require) {
    "use strict";

    const models = require("point_of_sale.models");

    models.load_models([
        {
            model: "stock.production.lot",
            after: "product.product",
            condition: function (self) {
                return !self.config.limited_lots_loading;
            },
            domain: function (self) {
                return [
                    "&",
                    "&",
                    ["product_id", "in", self.getLoadedProductIds()],
                    ["available_on_pos", "=", true],
                    "|",
                    ["company_id", "=", self.config.company_id[0]],
                    ["company_id", "=", false],
                ];
            },
            fields: ["name", "product_id", "product_qty"],
            loaded: function (self, lots) {
                self.db.add_lots(
                    lots.map((lot) => {
                        lot.pos = self;
                        return new models.StockProductionLot({}, lot);
                    })
                );
            },
        },
    ]);

    var posmodel_super = models.PosModel.prototype;
    models.PosModel = models.PosModel.extend({
        async after_load_server_data() {
            var res = await posmodel_super.after_load_server_data.call(this);
            // Postpone lot loading according to pos config
            this.loadLotsBackground();
            return res;
        },
        async loadLotsBackground() {
            let page = 0;
            const lot_model = _.find(
                this.models,
                (model) => model.model === "stock.production.lot"
            );
            let lots = [];
            do {
                lots = await this.rpc(
                    {
                        model: "stock.production.lot",
                        method: "search_read",
                        kwargs: {
                            domain: lot_model.domain(this),
                            fields: lot_model.fields,
                            offset: page * this.env.pos.config.limited_lots_amount,
                            limit: this.env.pos.config.limited_lots_amount,
                        },
                        context: {...this.session.user_context},
                    },
                    {shadow: true}
                );
                lot_model.loaded(this, lots);
                page += 1;
            } while (lots.length === this.config.limited_lots_amount);
        },
        getLoadedProductIds() {
            // Return Object.keys(this.db.product_by_id);
            // Or keep ids from tracked products only?
            return _.map(
                _.filter(this.db.product_by_id, (prod) => prod.tracking !== "none"),
                (prod) => prod.id
            );
        },
    });
});
