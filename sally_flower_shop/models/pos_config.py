from odoo import models, api


class PosConfig(models.Model):
    _inherit = 'pos.config'

    @api.model
    def _get_available_product_domain(self):
        domain = super()._get_available_product_domain()
        domain += [('pos_categ_ids.name', '=', 'Flowers')]
        return domain