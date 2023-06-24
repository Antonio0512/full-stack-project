from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

UserProfile = get_user_model()


class ProfilesApiViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('profiles')

    def test_get_profiles(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_profile(self):
        data = {
            "email": "test@example.com",
            "password": "Toni1234",
            "username": "testuser",
            "first_name": "John",
            "last_name": "Doe",
            "age": 25,
            "bio": "Test bio",
            "profile_picture": "http://example.com/profile.jpg"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_profile_invalid_data(self):
        # Test with invalid data
        data = {
            'email': 'test@example.com',
            'password': 'password',
            'username': '',  # Invalid, required field
            'first_name': 'John',
            'last_name': 'Doe',
            'age': 25,
            'bio': 'Test bio',
            'profile_picture': 'http://example.com/profile.jpg'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ProfilesDetailsApiViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserProfile.objects.create_user(
            email='test@example.com',
            password='password',
            username='testuser',
            first_name='John',
            last_name='Doe',
            age=25,
            bio='Test bio',
            profile_picture=None
        )
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.url = reverse('profile-details', args=[self.user.id])

    def test_get_profile(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.data)

    def test_get_profile_invalid_id(self):
        url = reverse('profile-details', args=[999])  # Invalid profile ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_profile(self):
        data = {
            'first_name': 'Updated name',
            'bio': 'Updated bio'
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['first_name'], 'Updated name')
        self.assertEqual(response.data['user']['bio'], 'Updated bio')

    def test_update_profile_unauthenticated(self):
        self.client.credentials()  # Clear authentication credentials
        data = {
            'first_name': 'Updated name',
            'bio': 'Updated bio'
        }
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_profile_invalid_id(self):
        url = reverse('profile-details', args=[999])  # Invalid profile ID
        data = {
            'first_name': 'Updated name',
            'bio': 'Updated bio'
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_profile_invalid_data(self):
        data = {
            'first_name': '',  # Invalid, required field
            'bio': 'Updated bio'
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_profile(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(UserProfile.objects.filter(pk=self.user.id).exists())

    def test_delete_profile_invalid_id(self):
        url = reverse('profile-details', args=[999])  # Invalid profile ID
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_profile_unauthenticated(self):
        self.client.credentials()  # Clear authentication credentials
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class LoginAPIViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserProfile.objects.create_user(
            email='test@example.com',
            password='password',
            username='testuser',
            first_name='John',
            last_name='Doe',
            age=25,
            bio='Test bio',
            profile_picture=None
        )
        self.url = reverse('login')

    def test_login_valid_credentials(self):
        data = {
            'email': self.user.email,
            'password': 'password'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.data)
        self.assertIn('user', response.data)

    def test_login_invalid_credentials(self):
        data = {
            'email': self.user.email,
            'password': 'wrong_password'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
