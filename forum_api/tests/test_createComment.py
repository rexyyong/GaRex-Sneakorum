import json
from django.test import TestCase, Client
from django.urls import reverse

#need to sign up first. After you sign up then check against databse


class CreateCommentTestCase(TestCase):
    # Setting up APIClient allows GET and POST requests to be simulated
    def setUp(self):
        self.client = Client()

    def test_createComment_successful(self):
        # First, create a thread to associate the comment with
        thread_data = {
            "subject": "Test Thread",
            "content": "This is a test thread",
        }
        thread_response = self.client.post(reverse('forum_api:createThread'), data=json.dumps(thread_data), content_type='application/json')
        self.assertEqual(thread_response.status_code, 200)  # 201 = Created

        # Extract the thread ID from the response
        thread_id = thread_response.data['id']

        # Data for creating the comment
        comment_data = {
            "content": "This is a test comment",
            "thread": thread_id,
        }
        
    
        