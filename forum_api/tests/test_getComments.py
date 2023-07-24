import json
from django.test import TestCase, Client
from django.urls import reverse
from forum_api.models import Thread, Comment
from forum_api.serializers import CommentSerializer


class getCommentTestCase(TestCase):
    # Setting up APIClient allows GET and POST requests to be simulated
    def setUp(self):
        self.client = Client()

    def test_getComment_successful(self):
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

        # Send a POST request to create the comment
        response = self.client.post(reverse('forum_api:createComment'), data=json.dumps(comment_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)  # 201 = Created


        # Now, fetch the created comment using a GET request
        comment_id = response.data['id']
        get_comment_url = reverse('forum_api:comments', kwargs={'thread_id': thread_id})
        get_comment_response = self.client.get(get_comment_url)

        # Assert the response status code is 200 (OK)
        self.assertEqual(get_comment_response.status_code, 200)

        # Assert that the response data contains the correct keys
        self.assertIn('count', get_comment_response.data)
        self.assertIn('next', get_comment_response.data)
        self.assertIn('previous', get_comment_response.data)
        self.assertIn('results', get_comment_response.data)

        # Assert the response contains the correct number of comments (in this case, 1)
        self.assertEqual(len(get_comment_response.data['results']), 1)

        # Assert the comment content matches the created comment content
        self.assertEqual(get_comment_response.data['results'][0]['content'], "This is a test comment")