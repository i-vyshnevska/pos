// /*
//     Copyright 2021 Camptocamp (https://www.camptocamp.com).
//     @author Iván Todorovich <ivan.todorovich@camptocamp.com>
//     License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
// */
// odoo.define("pos_lot_selection.AddLotButton", function (require) {
//     "use strict";

//     const PosComponent = require("point_of_sale.PosComponent");
//     const ProductScreen = require("point_of_sale.ProductScreen");
//     const {useListener} = require("web.custom_hooks");
//     const Registries = require("point_of_sale.Registries");

//     class AddLotButton extends PosComponent {
//         constructor() {
//             super(...arguments);
//             useListener("click", this.onClick);
//         }
//         async onClick() {
//             await this.showPopup("AddLotButton", {});
//         }
//     }
//     AddLotButton.template = "AddLotButton";

//     ProductScreen.addControlButton({
//         component: AddLotButton,
//         condition: function () {
//             return this.env.pos.config.iface_event_sale;
//         },
//     });

//     Registries.Component.add(AddLotButton);
//     return AddLotButton;
// });
