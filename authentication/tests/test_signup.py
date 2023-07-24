import json
from django.test import TestCase, Client
from django.urls import reverse

class SignupTestCase(TestCase):
    #setting up client allows GET and POST to be simulated or something
    def setUp(self):
        self.client = Client()

    def test_signup_successful(self):
        # Prepare JSON data for a successful signup
        data = {
            'username': 'john_doe',
            'pass1': 'mysecretpassword',
            'pass2': 'mysecretpassword',
            'email': 'john@example.com',
            'fname': 'John',
            'lname': 'Doe',
        }
        response = self.client.post(reverse('signup'), data=json.dumps(data), content_type='application/json')

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check the response message
        self.assertEqual(response.json(), {'message': 'Signup successful'})

    def test_signup_unsuccessful(self):
        # Prepare JSON data for an unsuccessful signup (passwords don't match)
        data = {
            'username': 'jane_doe',
            'pass1': 'mypassword1',
            'pass2': 'mypassword2',  # Passwords don't match
            'email': 'jane@example.com',
            'fname': 'Jane',
            'lname': 'Doe',
        }
        response = self.client.post(reverse('signup'), data=json.dumps(data), content_type='application/json')

        # Check that the response status code is 300 (Multiple Choices)
        self.assertEqual(response.status_code, 300)

        # Check the response message
        self.assertEqual(response.json(), {'message': 'Signup unsuccessful'})

