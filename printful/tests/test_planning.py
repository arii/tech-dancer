import unittest
from printful.lib.planning import build_update_plan

class TestPlanning(unittest.TestCase):
    def setUp(self):
        # Updated to match Printful API v1 structure: { "sync_product": {...}, "sync_variants": [...] }
        self.mock_products = [
            {
                "sync_product": {
                    "id": 101,
                    "product_id": 665, # Catalog Product ID
                    "name": "Product A",
                },
                "sync_variants": [
                    {"id": 201, "color": "Black", "size": "M", "retail_price": "20.00"},
                    {"id": 202, "color": "White", "size": "M", "retail_price": "20.00"}
                ]
            },
            {
                "sync_product": {
                    "id": 102,
                    "product_id": 163, # Catalog Product ID
                    "name": "Product B",
                },
                "sync_variants": [
                    {"id": 301, "color": "Red", "size": "L", "retail_price": "25.00"}
                ]
            }
        ]
        self.config = {
            "101": {
                "retail_price": "30.00",
                "placements": [{"type": "front", "file_id": 111}],
                "allowed_colors": ["Black"]
            },
            "102": {
                "retail_price": "35.00",
                "placements": [{"type": "front", "file_id": 222}]
            }
        }
        self.catalog_specs = {
            "665": {"placements": [{"placement": "front"}, {"placement": "back"}]},
            "163": {"placements": [{"placement": "front"}]}
        }

    def test_build_plan_basic(self):
        plan = build_update_plan(self.mock_products, self.config)
        self.assertEqual(plan["products_selected"], 2)
        # Variant 201 (Black) should be selected, 202 (White) skipped because of allowed_colors, 301 (Red) selected
        self.assertEqual(plan["variants_selected"], 2)
        self.assertEqual(plan["variants_skipped_by_color"], 1)

    def test_filter_by_product_id(self):
        plan = build_update_plan(self.mock_products, self.config, product_ids=["101"])
        self.assertEqual(plan["products_selected"], 1)
        self.assertEqual(plan["updates"][0]["product_id"], "101")

    def test_filter_by_color(self):
        # Global color filter
        plan = build_update_plan(self.mock_products, self.config, colors=["Red"])
        self.assertEqual(plan["variants_selected"], 1)
        self.assertEqual(plan["updates"][0]["variants"][0]["color"], "Red")

    def test_max_variants(self):
        plan = build_update_plan(self.mock_products, self.config, max_variants=1)
        self.assertEqual(plan["variants_selected"], 1)

    def test_missing_config_skips(self):
        config = {"101": self.config["101"]} # Product 102 missing
        plan = build_update_plan(self.mock_products, config)
        self.assertEqual(plan["products_selected"], 1)
        self.assertEqual(plan["variants_selected"], 1) # Only Black variant of 101

    def test_invalid_catalog_placement_fails(self):
        config = {
            "101": {
                "retail_price": "30.00",
                "placements": [{"type": "invalid_placement", "file_id": 111}]
            }
        }
        with self.assertRaisesRegex(ValueError, "placement \"invalid_placement\" is not listed for product 665"):
            build_update_plan(self.mock_products, config, catalog_specs=self.catalog_specs)

    def test_valid_catalog_placement_passes(self):
        plan = build_update_plan(self.mock_products, self.config, catalog_specs=self.catalog_specs)
        self.assertEqual(plan["products_selected"], 2)

if __name__ == "__main__":
    unittest.main()
