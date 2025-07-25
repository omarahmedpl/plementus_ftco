from odoo import fields, models, api


class ProductProduct(models.Model):
    _inherit = 'product.product'

    flower_id = fields.Many2one('sally.flower', string="Flower Details")
    is_flower_category = fields.Boolean(
        compute='_compute_is_flower_category',
        help="Indicates if the product is in the Flowers category"
    )
    last_watered_date = fields.Datetime()

    @api.depends('pos_categ_ids')
    def _compute_is_flower_category(self):
        for product in self:
            product.is_flower_category = bool(product.pos_categ_ids and product.pos_categ_ids.name == 'Flowers')
