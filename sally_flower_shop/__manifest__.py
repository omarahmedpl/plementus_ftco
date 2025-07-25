# -*- coding: utf-8 -*-
{
    'name': 'Sally Flower Shop',
    'version': '1.0',
    'summary': 'Brief description of the module',
    'description': '''
        Detailed description of the module
    ''',
    'category': 'Uncategorized',
    'author': 'Omar Ahmed Saeed',
    'company': 'Plementus',
    'maintainer': 'Omar Ahmed Saeed',
    'website': 'https://www.cybrosys.com',
    'depends': ['base', 'point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/sally_flower_shop_sample_views.xml',
        'data/pos_category.xml',
    ],
    "assets": {
        'point_of_sale._assets_pos': [
            'sally_flower_shop/static/src/js/**/*',
        ]
    },
    'license': 'LGPL-3',
    'installable': True,
    'application': False,
    'auto_install': False,
}
