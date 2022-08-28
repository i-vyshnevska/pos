/*
    Copyright 2022 Camptocamp SA (https://www.camptocamp.com).
    @author Iván Todorovich <ivan.todorovich@camptocamp.com>
    License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
*/
odoo.define("pos_lot_selection.ProductScreen", function (require) {
    "use strict";

    const ProductScreen = require("point_of_sale.ProductScreen");
    const Registries = require("point_of_sale.Registries");

    const PosLotSaleProductScreen = (ProductScreen) =>
        class extends ProductScreen {
            async _clickProduct(event) {
                const product = event.detail;
                if (
                    product.tracking !== "none"
                ) {
                    return this.showPopup("LotSelectorPopup", {product});
                }
                return super._clickProduct(event);
            }
            // _onClickPay() {
            //     // Update and check order events availability before
            //     // going to the payment screen. Prevent paying if error.
            //     if (this.currentOrder) {
            //         this.currentOrder
            //             .updateAndCheckEventAvailability()
            //             .then(() => super._onClickPay(...arguments))
            //             .catch((error) => {
            //                 this.showPopup("ErrorPopup", {
            //                     title: this.env._t("Lot availability error"),
            //                     body: error.message || String(error),
            //                 });
            //             });
            //     }
            // }
        };

    Registries.Component.extend(ProductScreen, PosLotSaleProductScreen);
    return ProductScreen;
});
