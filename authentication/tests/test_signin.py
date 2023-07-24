import json
from django.test import TestCase, Client
from django.urls import reverse

#need to sign up first. After you sign up then check against databse


class SigninTestCase(TestCase):
    #setting up client allows GET and POST to be simulated or something
    def setUp(self):
        self.client = Client()

    def test_signin_successful(self):
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

        #Prepare JSON data for successful login
        Signin_data = {
            'username': 'john_doe',
            'password': 'mysecretpassword',
        }
        response = self.client.post(reverse('signin'), data=json.dumps(Signin_data), content_type='application/json')

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check the response message
        self.assertEqual(response.json(), {'message': 'Login successful'})


    def test_signin_unsuccessful(self):
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

        #Prepare JSON data for successful login
        Signin_data = {
            'username': 'john_doe',
            'password': 'wrongpassword', #password does not match
        }
        response = self.client.post(reverse('signin'), data=json.dumps(Signin_data), content_type='application/json')

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 300)

        # Check the response message
        self.assertEqual(response.json(), {'message': 'Login unsuccessful'})