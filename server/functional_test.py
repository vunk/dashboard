import requests
import unittest


class FunctionalTestCase(unittest.TestCase):

    def test_can_get_home_page(self):
        response = requests.get('http://127.0.0.1:8000')
        self.assertEqual(response.status_code, requests.codes.ok)
        self.assertIn('django', response.text)


if __name__ == '__main__':
    unittest.main()
