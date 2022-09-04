/*
    Copyright 2022 Camptocamp SA
    License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl)
*/
odoo.define("pos_lot_base.db", function (require) {
    "use strict";

    const PosDB = require("point_of_sale.DB");

    PosDB.include({
        init: function () {
            this._super.apply(this, arguments);
            this.lot_by_product_id = {};
        },
        add_lots: function (lots) {
            if (!lots instanceof Array) {
                lots = [lots];
            }
            // we don't constrain lot selection to already sold products
            // as pos terminal doing inventory records only on session closing
            for (const lot of lots) {
                var product_id = lot["product_id"][0];
                if (this.lot_by_product_id[product_id]) {
                    this.lot_by_product_id[product_id].push(lot);
                } else {
                    this.lot_by_product_id[product_id] = [lot];
                    }
                }
        },
    });
    return PosDB;
});
