import json
from django.test import TestCase, Client
from django.urls import reverse

#need to sign up first. After you sign up then check against databse


class getThreadTestCase(TestCase):
    #setting up client allows GET and POST to be simulated or something
    def setUp(self):
        self.client = Client()

    def test_getThread_successful(self):

        # First, create a thread using the same data as in test_createThread_successful
        data = {
            "subject": "test unit test",
            "content": "test test test",
        }
        response = self.client.post(reverse('forum_api:createThread'), data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Now, let's test the getThreads view to retrieve the created thread
        get_threads_response = self.client.get(reverse('forum_api:threads'))

        # Check that the response status code is 200 (OK) when retrieving threads
        self.assertEqual(get_threads_response.status_code, 200) 
        
        # Check if the created thread appears on the page
        self.assertContains(get_threads_response, "test unit test")
        self.assertContains(get_threads_response, "test test test")      
        

