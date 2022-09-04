odoo.define("pos_lot_selection.LotSelectorPopup", function (require) {
    "use strict";

    const {useState} = owl.hooks;
    const {useListener} = require("web.custom_hooks");
    const AbstractAwaitablePopup = require("point_of_sale.AbstractAwaitablePopup");
    const Registries = require("point_of_sale.Registries");
    const {_lt} = require("@web/core/l10n/translation");
    const session = require("web.session");

    class LotSelectorPopup extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);
            // If there's a product, get lots available related to this product
            this.slected_items = [];
            const product = this.props.product;
            if (product) {
                // let order = this.env.pos.get_order();
                // let lines = order.orderlines.models;
                // for (var i = 0; i < lines.length; i++) {
                //     if (lines[i].get_product() === product) {
                //         const isAllowOnlyOneLot = lines[i].product.isAllowOnlyOneLot();
                //         const packLotLinesToEdit = lines[i].getPackLotLinesToEdit(isAllowOnlyOneLot);
                //         this.slected_items = packLotLinesToEdit.filter(lot => lot.text.length !== 0);
                //     }
                // }

                this.lots = this.env.pos.db.lot_by_product_id[this.props.product.id];
            }
        }
        getPayload() {
            return {
                newArray: [Object.assign({}, {text: $("#new_select").val()})],
            };
        }
    }
    LotSelectorPopup.template = "LotSelectorPopup";
    LotSelectorPopup.defaultProps = {
        title: _lt("Lot/Serial"),
        body: "",
        array: [],
        selected_lot: "",
    };
    Registries.Component.add(LotSelectorPopup);
    return LotSelectorPopup;
});
