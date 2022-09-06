/*
    Copyright 2022 Camptocamp SA (https://www.camptocamp.com).
    License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
*/
odoo.define("pos_lot_selection.LotSelectorPopup", function (require) {
    "use strict";

    const AbstractAwaitablePopup = require("point_of_sale.AbstractAwaitablePopup");
    const Registries = require("point_of_sale.Registries");
    const {_lt} = require("@web/core/l10n/translation");
    const EditListPopup = require("point_of_sale.EditListPopup");

    const LotSelectorPopup = (EditListPopup) =>
        class extends EditListPopup {
        constructor() {
            super(...arguments);
            // If there's a product, get lots available related to this product
            if (this.props.product) {
                this.lots = this.env.pos.db.lot_by_product_id[this.props.product.id];
            }
        }
        getPayload() {
            return {
                newArray: [Object.assign({}, {text: $("#new_select").val()})],
            };
        }
    };
    
    Registries.Component.extend(EditListPopup, LotSelectorPopup );
    return EditListPopup;
});
