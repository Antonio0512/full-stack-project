from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
import re


def validate_password_strength(password):
    validate_password(password)


def validate_email(value):
    if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
        raise serializers.ValidationError("Enter a valid email address.")


def validate_username(value):
    if not re.match(r"^[a-zA-Z0-9_-]{3,50}$", value):
        raise serializers.ValidationError(
            "Username can only contain alphanumeric characters, hyphens, and underscores."
            "It must be between 3 and 50 characters long.")


def validate_name_characters(value):
    if not re.match(r"^[a-zA-Z\s]*$", value):
        raise serializers.ValidationError("Name can only contain letters and spaces.")


def validate_age_range(value):
    if value < 12:
        raise serializers.ValidationError("The minimum age allowed is 12.")


def validate_bio_length(value):
    if len(value) > 225:
        raise serializers.ValidationError("Bio can contain a maximum of 225 characters.")


def validate_url(value):
    pattern = r"http(s)?://([\w-]+\.)+[\w-]+(/[\w\-.?%&=]*)?"
    if not re.match(pattern, value):
        raise serializers.ValidationError("Enter a valid URL.")
