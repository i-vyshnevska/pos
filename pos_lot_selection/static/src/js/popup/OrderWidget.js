odoo.define("pos_lot_selection.CustomOrderWidget", function (require) {
    "use strict";

    const Registries = require("point_of_sale.Registries");
    const OrderWidget = require("point_of_sale.OrderWidget");

    var CustomOrderWidget = (OrderWidget) =>
        class extends OrderWidget {
            async _editPackLotLines(event) {
                const orderline = event.detail.orderline;
                this.env.session.lots = await this.env.pos.get_lots(orderline.product);
                return super._editPackLotLines(event);
            }
        };

    Registries.Component.extend(OrderWidget, CustomOrderWidget);
    return OrderWidget;
});
