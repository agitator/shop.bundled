# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from shop.bundled.testing import SHOP_BUNDLED_INTEGRATION_TESTING  # noqa
from plone import api

import unittest


class TestSetup(unittest.TestCase):
    """Test that shop.bundled is properly installed."""

    layer = SHOP_BUNDLED_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if shop.bundled is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'shop.bundled'))

    def test_browserlayer(self):
        """Test that IShopBundledLayer is registered."""
        from shop.bundled.interfaces import (
            IShopBundledLayer)
        from plone.browserlayer import utils
        self.assertIn(IShopBundledLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = SHOP_BUNDLED_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['shop.bundled'])

    def test_product_uninstalled(self):
        """Test if shop.bundled is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'shop.bundled'))

    def test_browserlayer_removed(self):
        """Test that IShopBundledLayer is removed."""
        from shop.bundled.interfaces import IShopBundledLayer
        from plone.browserlayer import utils
        self.assertNotIn(IShopBundledLayer, utils.registered_layers())
