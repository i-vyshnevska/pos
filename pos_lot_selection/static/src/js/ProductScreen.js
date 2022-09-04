/*
    Copyright 2022 Camptocamp SA (https://www.camptocamp.com).
    @author Iván Todorovich <ivan.todorovich@camptocamp.com>
    License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
*/
odoo.define("pos_lot_selection.ProductScreen", function (require) {
    "use strict";

    const ProductScreen = require("point_of_sale.ProductScreen");
    const Registries = require("point_of_sale.Registries");
    const NumberBuffer = require("point_of_sale.NumberBuffer");

    const PosLotSaleProductScreen = (ProductScreen) =>
        class extends ProductScreen {
            async _clickProduct(event) {
                const product = event.detail;
                let draftPackLotLines;
                if (product.tracking !== "none") {
                    const {confirmed, payload} = await this.showPopup(
                        "LotSelectorPopup",
                        {product}
                    );
                    // Do not add product if options is undefined.
                    if (!confirmed) return;
                    // Add the product after having the extra information.
                    // debugger;

                    const modifiedPackLotLines = Object.fromEntries(
                        payload.newArray
                            .filter((item) => item.id)
                            .map((item) => [item.id, item.text])
                    );
                    const newPackLotLines = payload.newArray
                        .filter((item) => !item.id)
                        .map((item) => ({lot_name: item.text}));

                    draftPackLotLines = {modifiedPackLotLines, newPackLotLines};

                    this.currentOrder.add_product(product, {draftPackLotLines});
                    NumberBuffer.reset();
                    return;
                }
                return super._clickProduct(event);
            }
        };

    Registries.Component.extend(ProductScreen, PosLotSaleProductScreen);
    return ProductScreen;
});
