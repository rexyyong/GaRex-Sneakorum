import json
from django.test import TestCase, Client
from django.urls import reverse
from forum_api.models import Thread, Comment
from forum_api.serializers import CommentSerializer

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

        # Send a POST request to create the comment
        response = self.client.post(reverse('forum_api:createComment'), data=json.dumps(comment_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)  # 201 = Created

        # Check that the reply count of the associated thread has been updated
        updated_thread = Thread.objects.get(pk=thread_id)
        self.assertEqual(updated_thread.replyCount, 1)

        # Check the response data to ensure the comment has been created properly
        self.assertEqual(response.data['content'], comment_data['content'])
        self.assertEqual(response.data['thread'], comment_data['thread'])

        # Check that the comment has been properly stored in the database
        comment_id = response.data['id']
        comment = Comment.objects.get(pk=comment_id)
        self.assertEqual(comment.content, comment_data['content'])
        self.assertEqual(comment.thread.id, comment_data['thread'])

        # Check that the response data matches the serialized comment
        serialized_comment = CommentSerializer(comment)
        self.assertEqual(response.data, serialized_comment.data)
    
        