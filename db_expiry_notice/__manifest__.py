# -*- coding: utf-8 -*-
{
    "name": "Database Expiry Notice",
    "version": "16.0.1.0.0",
    "summary": "Shows a persistent, non-blocking database expiration banner in the web client",
    "category": "Hidden/Tools",
    "author": "Mohlahrech",
    "license": "LGPL-3",
    "depends": ["web"],
    "assets": {
        "web.assets_backend": [
            "db_expiry_notice/static/src/db_expiry_banner.js",
            "db_expiry_notice/static/src/db_expiry_banner.xml",
            "db_expiry_notice/static/src/db_expiry_banner.scss",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
}
