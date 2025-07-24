# -*- coding: utf-8 -*-
{
    "name": "Todo List",
    "version": "17.0",
    "category": "Tools",
    'summary': 'Omar Ahmed Saeed FTCO TodoList',
    'description': '''
      Detailed description of the module
  ''',
    'author': 'Omar Ahmed Saeed',
    'company': 'Plementus',
    'maintainer': 'Omar Ahmed Saeed',
    'website': 'www.plementus.com',
    "depends": ["base", "web"],
    "data": [
        "views/todo_list_sample_views.xml"
    ],
    "assets": {
        'web.assets_backend': [
            'todo_list/static/src/*/**',
        ]
    },
    "license": "LGPL-3",
    "installable": True,
    "auto_install": False,
    "application": True
}
