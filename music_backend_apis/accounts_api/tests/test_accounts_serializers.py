from django.test import TestCase
from django.contrib.auth import get_user_model

from music_backend_apis.accounts_api.serializers import ProfilesSerializer


class ProfilesSerializerTest(TestCase):
    def create_user(self, **kwargs):
        User = get_user_model()
        defaults = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword',
            # Include other required fields
        }
        defaults.update(kwargs)
        return User.objects.create_user(**defaults)

    def test_serializer_fields(self):
        # Test serializer fields
        serializer = ProfilesSerializer()
        expected_fields = (
            'id', 'email', 'username', 'first_name', 'last_name', 'password', 'age', 'bio', 'profile_picture')
        self.assertEqual(set(serializer.fields.keys()), set(expected_fields))

    # Rest of the existing tests...

    def test_email_validation(self):
        # Test invalid email
        data = {
            'email': 'invalid_email',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12
            # Include other required fields
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Test valid email
        data['email'] = 'test@example.com'
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})  # Ensure no validation errors

    def test_username_validation(self):
        # Test invalid username
        data = {
            'email': 'test@example.com',
            'username': '@testuser',
            'password': 'testpassword123',
            'age': 12
            # Include other required fields
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)
        error_message = serializer.errors['username'][0]
        self.assertIn('Username can only contain alphanumeric characters', str(error_message))

        # Test valid username
        data['username'] = 'testuser'
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})  # Ensure no validation errors

    def test_first_name_validation(self):
        # Test invalid first name
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12,
            'first_name': 'John@',
            # Include other required fields
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('first_name', serializer.errors)
        error_message = serializer.errors['first_name'][0]
        self.assertIn('Name can only contain letters and spaces', str(error_message))

        # Test valid first name
        data['first_name'] = 'John'
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})  # Ensure no validation errors

    def test_last_name_validation(self):
        # Test invalid last name
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12,
            'last_name': 'Doe@',
            # Include other required fields
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('last_name', serializer.errors)
        error_message = serializer.errors['last_name'][0]
        self.assertIn('Name can only contain letters and spaces', str(error_message))

        # Test valid last name
        data['last_name'] = 'Doe'
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})  # Ensure no validation errors

    def test_age_validation(self):
        # Test invalid age
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': -5,
            # Include other required fields
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('age', serializer.errors)
        error_message = serializer.errors['age'][0]
        self.assertIn('The minimum age allowed is 12', str(error_message))

        # Test valid age
        data['age'] = 12
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})  # Ensure no validation errors

    def test_bio_validation(self):
        # Test invalid bio (exceeds maximum length)
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12,
            'bio': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' * 10,  # Exceeds maximum length
            # Include other required fields
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('bio', serializer.errors)
        error_message = serializer.errors['bio'][0]
        self.assertIn('Bio can contain a maximum of 225 characters', str(error_message))

        # Test valid bio
        data['bio'] = 'Lorem ipsum dolor sit amet.'
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})  # Ensure no validation errors

    def test_profile_picture_validation(self):
        # Test invalid profile picture URL
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12,
            'profile_picture': 'invalid_url',
            # Include other required fields
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('profile_picture', serializer.errors)
        error_message = serializer.errors['profile_picture'][0]
        self.assertIn('Enter a valid URL', str(error_message))

        # Test valid profile picture URL
        data['profile_picture'] = 'http://example.com/profile.jpg'
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})  # Ensure no validation errors

    def test_missing_required_fields(self):
        # Test missing email field
        data = {
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12,
            'first_name': 'John',
            'last_name': 'Doe',
            'bio': 'Lorem ipsum dolor sit amet.',
            'profile_picture': 'http://example.com/profile.jpg'
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

        # Test missing username field
        data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'age': 12,
            'first_name': 'John',
            'last_name': 'Doe',
            'bio': 'Lorem ipsum dolor sit amet.',
            'profile_picture': 'http://example.com/profile.jpg'
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)

        # Add similar test cases for other required fields...

    def test_password_strength_validation(self):
        # Test weak password
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'weak',
            'age': 12,
            'first_name': 'John',
            'last_name': 'Doe',
            'bio': 'Lorem ipsum dolor sit amet.',
            'profile_picture': 'http://example.com/profile.jpg'
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

        # Add more test cases for password strength validation...

    def test_maximum_length_validation(self):
        # Test username exceeding maximum length
        data = {
            'email': 'test@example.com',
            'username': 'a' * 51,  # 51 characters (exceeds maximum of 50)
            'password': 'testpassword123',
            'age': 12,
            'first_name': 'John',
            'last_name': 'Doe',
            'bio': 'Lorem ipsum dolor sit amet.',
            'profile_picture': 'http://example.com/profile.jpg'
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)

        # Add similar test cases for first_name and last_name fields...

    def test_age_range_validation(self):
        # Test age below minimum
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 11,  # Below minimum age of 12
            'first_name': 'John',
            'last_name': 'Doe',
            'bio': 'Lorem ipsum dolor sit amet.',
            'profile_picture': 'http://example.com/profile.jpg'
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('age', serializer.errors)

    def test_profile_picture_url_validation(self):
        # Test invalid profile picture URL
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12,
            'first_name': 'John',
            'last_name': 'Doe',
            'bio': 'Lorem ipsum dolor sit amet.',
            'profile_picture': 'invalid_url'
        }
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('profile_picture', serializer.errors)

        # Test non-URL profile picture
        data['profile_picture'] = 'not_a_url'
        serializer = ProfilesSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('profile_picture', serializer.errors)

    def test_successful_save(self):
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'age': 12,
            'first_name': 'John',
            'last_name': 'Doe',
            'bio': 'Lorem ipsum dolor sit amet.',
            'profile_picture': 'http://example.com/profile.jpg'
        }
        serializer = ProfilesSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        profile = serializer.save()

        # Assert that the profile is saved and has the correct data
        self.assertIsNotNone(profile.id)
        self.assertEqual(profile.email, data['email'])
        self.assertEqual(profile.username, data['username'])
        self.assertEqual(profile.age, data['age'])
        self.assertEqual(profile.first_name, data['first_name'])
        self.assertEqual(profile.last_name, data['last_name'])
        self.assertEqual(profile.bio, data['bio'])
        self.assertEqual(profile.profile_picture, data['profile_picture'])
