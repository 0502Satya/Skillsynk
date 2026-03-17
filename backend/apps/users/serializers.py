from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
import re

from .models import CustomUser, Companies, JobSeekers, Recruiters, AdvertiserAccounts

User = get_user_model()

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    last_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'password_confirm', 'account_type', 'marketing_consent', 'data_processing_consent', 'first_name', 'last_name')
        read_only_fields = ('id',)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        
        # Simple password validation (require letter and number)
        password = attrs.get('password')
        if not re.search(r'\d', password) or not re.search(r'[a-zA-Z]', password):
             raise serializers.ValidationError({"password": "Password must contain at least one letter and one number."})
             
        # Validate account_type matches choices
        valid_choices = [choice[0] for choice in User.ACCOUNT_TYPE_CHOICES]
        role = attrs.get('account_type')
        if role and role not in valid_choices:
             raise serializers.ValidationError({"account_type": f"Invalid role. Must be one of: {', '.join(valid_choices)}"})
             
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        
        account_type = validated_data.get('account_type', 'CANDIDATE')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            account_type=account_type,
            marketing_consent=validated_data.get('marketing_consent', False),
            data_processing_consent=validated_data.get('data_processing_consent', False),
            is_active=True
        )
        
        if account_type == 'CANDIDATE':
            full_name = f"{first_name} {last_name}".strip()
            JobSeekers.objects.create(
                user=user,
                full_name=full_name
            )
            
        return user


class CompanySignupSerializer(serializers.Serializer):
    # Company Data
    company_name = serializers.CharField(max_length=255, required=True)
    tax_id = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    industry = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    size = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)
    website = serializers.URLField(max_length=255, required=False, allow_blank=True, allow_null=True)
    
    # User Admin Data
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        
        password = attrs.get('password')
        if not re.search(r'\d', password) or not re.search(r'[a-zA-Z]', password):
             raise serializers.ValidationError({"password": "Password must contain at least one letter and one number."})
             
        # Check if email is already taken
        if User.objects.filter(email=attrs.get('email')).exists():
            raise serializers.ValidationError({"email": "User with this email already exists."})
            
        # Check if company tax_id or name exists
        tax_id = attrs.get('tax_id')
        if tax_id and tax_id.strip() and Companies.objects.filter(tax_id=tax_id).exists():
            raise serializers.ValidationError({"tax_id": "Company with this tax ID already exists."})
             
        return attrs

    def create(self, validated_data):
        # We handle this manually in the view via transaction, but we can also do it here
        with transaction.atomic():
            company = Companies.objects.create(
                name=validated_data['company_name'],
                # size is not in Companies generated from schema, neither is tax_id
                # so we will just specify what matches the SQL schema mapping
                industry=validated_data.get('industry', ''),
                website=validated_data.get('website', '')
            )
            
            user = User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                account_type='COMPANY',
                is_active=True
            )
            
            Recruiters.objects.create(
                user=user,
                agency_name=company.name
            )
            
            # Link user to company for advertiser context (useful for organization discovery)
            AdvertiserAccounts.objects.create(
                user=user,
                company=company,
                advertiser_type='COMPANY_ADMIN'
            )
            
        return user


class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'account_type', 'is_verified', 'created_at')


class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = [
            'id', 'name', 'description', 'website', 'logo_url', 
            'cover_image_url', 'industry', 'culture', 'benefits', 
            'city', 'country', 'verified_badge'
        ]
        read_only_fields = ['id', 'verified_badge']

class CandidateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekers
        fields = [
            'id', 'full_name', 'phone', 'location', 'headline', 
            'summary', 'experience_years', 'current_salary', 
            'expected_salary', 'currency', 'resume_file_url'
        ]
        read_only_fields = ['id']

class SocialAuthSerializer(serializers.Serializer):
    provider = serializers.ChoiceField(choices=['google', 'linkedin'])
    token = serializers.CharField()
