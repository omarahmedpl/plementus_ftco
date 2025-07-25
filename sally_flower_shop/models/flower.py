# -*- coding: utf-8 -*-

from odoo import _, api, fields, models


class SallyFlower(models.Model):
    _name = 'sally.flower'
    _description = 'Flower Item'

    common_name = fields.Char(required=True)
    scientific_name = fields.Char(required=True)
    season_start = fields.Date()
    season_end = fields.Date()
    watering_frequency = fields.Integer(string="Watering Frequency (Days)", default=3)
    watering_amount = fields.Float(string="Watering Amount (ml)")
