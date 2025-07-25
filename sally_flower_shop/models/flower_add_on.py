from odoo import models, fields


class FlowerAddOn(models.Model):
    _name = 'flower.addon'
    _description = 'Flower Add-On'

    name = fields.Char(required=True)
    price = fields.Float(required=True)
