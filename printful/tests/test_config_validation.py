import unittest
from printful.lib.config_validation import validate_config, validate_placement_against_catalog

class TestConfigValidation(unittest.TestCase):
    def test_valid_config(self):
        config = {
            "123": {
                "retail_price": "29.99",
                "placements": [{"type": "front", "file_id": 1}]
            }
        }
        self.assertTrue(validate_config(config))

    def test_missing_retail_price(self):
        config = {"123": {"placements": [{"type": "front", "file_id": 1}]}}
        with self.assertRaisesRegex(ValueError, "Missing retail_price"):
            validate_config(config)

    def test_invalid_retail_price(self):
        config = {"123": {"retail_price": "abc", "placements": [{"type": "front", "file_id": 1}]}}
        with self.assertRaisesRegex(ValueError, "Invalid retail_price"):
            validate_config(config)

    def test_missing_placements(self):
        config = {"123": {"retail_price": "29.99"}}
        with self.assertRaisesRegex(ValueError, "Missing placements"):
            validate_config(config)

    def test_invalid_placements_type(self):
        config = {"123": {"retail_price": "29.99", "placements": "not a list"}}
        with self.assertRaisesRegex(ValueError, "must be a non-empty list"):
            validate_config(config)

    def test_missing_placement_type(self):
        config = {"123": {"retail_price": "29.99", "placements": [{"file_id": 1}]}}
        with self.assertRaisesRegex(ValueError, "Missing type in placement"):
            validate_config(config)

    def test_missing_file_id(self):
        config = {"123": {"retail_price": "29.99", "placements": [{"type": "front"}]}}
        with self.assertRaisesRegex(ValueError, "Missing file_id in placement"):
            validate_config(config)

    def test_invalid_allowed_colors(self):
        config = {
            "123": {
                "retail_price": "29.99",
                "placements": [{"type": "front", "file_id": 1}],
                "allowed_colors": "not a list"
            }
        }
        with self.assertRaisesRegex(ValueError, "allowed_colors.*must be a non-empty list"):
            validate_config(config)

    def test_validate_placement_against_catalog(self):
        catalog_specs = {
            "665": {
                "placements": [{"placement": "front"}, {"placement": "back"}]
            }
        }
        self.assertTrue(validate_placement_against_catalog(665, "front", catalog_specs))
        self.assertTrue(validate_placement_against_catalog(665, "back", catalog_specs))
        self.assertFalse(validate_placement_against_catalog(665, "front_large", catalog_specs))
        # Should return True if product not in catalog (can't validate)
        self.assertTrue(validate_placement_against_catalog(999, "front", catalog_specs))
        # Should return True if catalog_specs is None
        self.assertTrue(validate_placement_against_catalog(665, "front_large", None))

if __name__ == "__main__":
    unittest.main()
