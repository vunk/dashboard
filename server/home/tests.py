from django.test import LiveServerTestCase
from django.urls import resolve

from home import views


class HomeTestCase(LiveServerTestCase):
    def test_url(self):
        found = resolve('/')
        self.assertEqual(found.func, views.index)

    def test_home_page_content(self):
        response = self.client.get(self.live_server_url)
        self.assertIn('<table>', response.content.decode())
