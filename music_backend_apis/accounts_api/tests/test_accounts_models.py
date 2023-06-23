from django.db import IntegrityError
from django.test import TestCase
from django.contrib.auth import get_user_model


class UserProfileModelTest(TestCase):
    def setUp(self):
        self.UserProfile = get_user_model()

    def test_create_user(self):
        # Test creating a user with required fields
        user = self.UserProfile.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpassword'
        )
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertIsNotNone(user.date_joined)

    def test_create_user_missing_required_fields(self):
        # Test creating a user with missing required fields
        with self.assertRaises(ValueError):
            self.UserProfile.objects.create_user(
                email='',
                username='testuser',
                password='testpassword'
            )
        with self.assertRaises(ValueError):
            self.UserProfile.objects.create_user(
                email='test@example.com',
                username='testuser',
                password=''
            )

        # Add similar test cases for other required fields...

    def test_create_superuser(self):
        # Test creating a superuser
        superuser = self.UserProfile.objects.create_superuser(
            email='admin@example.com',
            username='admin',
            password='adminpassword'
        )
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_staff)

    def test_email_unique(self):
        # Test uniqueness of email field
        email = 'test@example.com'
        self.UserProfile.objects.create_user(
            email=email,
            username='testuser1',
            password='testpassword1'
        )
        with self.assertRaises(IntegrityError):
            self.UserProfile.objects.create_user(
                email=email,
                username='testuser2',
                password='testpassword2'
            )

    def test_username_unique(self):
        # Test uniqueness of username field
        username = 'testuser'
        self.UserProfile.objects.create_user(
            email='test1@example.com',
            username=username,
            password='testpassword1'
        )
        with self.assertRaises(IntegrityError):
            self.UserProfile.objects.create_user(
                email='test2@example.com',
                username=username,
                password='testpassword2'
            )

    # Add more test cases to cover other validators and model methods...
