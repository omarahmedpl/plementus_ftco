from odoo import models, api


class PosConfig(models.Model):
    _inherit = 'pos.config'

    @api.model
    def _get_available_product_domain(self):
        domain = super()._get_available_product_domain()

        flowers_category = self.env['pos.category'].search([('name', '=', 'Flowers')], limit=1)
        if flowers_category:
            # Remove other pos_categ_ids filters if needed
            domain = [d for d in domain if not (isinstance(d, tuple) and d[0] == 'pos_categ_ids')]

            # Add only the Flowers category
            domain.append(('pos_categ_ids', 'in', [flowers_category.id]))
        print(domain , 'sssssssssss')
        return domain
