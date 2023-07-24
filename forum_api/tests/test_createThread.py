import json
from django.test import TestCase, Client
from django.urls import reverse

#need to sign up first. After you sign up then check against databse


class createThreadTestCase(TestCase):
    #setting up client allows GET and POST to be simulated or something
    def setUp(self):
        self.client = Client()

    def test_createThread_successful(self):
         # Prepare JSON data for a successful signup
        data = {
            "subject": "test unit test",
            "content": "test test test",
        }
        response = self.client.post(reverse('forum_api:createThread'), data=json.dumps(data), content_type='application/json')

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)


