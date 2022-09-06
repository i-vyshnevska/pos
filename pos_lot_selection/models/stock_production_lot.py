# Copyright 2022 Camptocamp SA
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl)

from odoo import api, fields, models
from odoo.tools import float_compare


class ProductionLot(models.Model):
    _inherit = "stock.production.lot"

    available_on_pos = fields.Boolean(compute="_compute_available_on_pos", store=True)

    @api.depends("quant_ids.quantity")
    def _compute_available_on_pos(self):
        for lot in self:
            lot.available_on_pos = (
                float_compare(lot.product_qty, 0, precision_digits=2) > 0
            )
