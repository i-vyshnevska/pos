/*
    Copyright 2022 Camptocamp SA (https://www.camptocamp.com).
    License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
*/
odoo.define("pos_lot_selection.LotSelectorPopup", function (require) {
    "use strict";

    const Registries = require("point_of_sale.Registries");
    const EditListPopup = require("point_of_sale.EditListPopup");

    const LotSelectorPopup = (EditListPopup) =>
        class extends EditListPopup {
            getPayload() {
                return {
                    newArray: [Object.assign({}, {text: $("#new_select").val()})],
                };
            }
        };

    Registries.Component.extend(EditListPopup, LotSelectorPopup);
    return EditListPopup;
});
