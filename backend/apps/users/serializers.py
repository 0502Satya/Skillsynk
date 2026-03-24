from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
import re

from .models import (
    CustomUser, Companies, JobSeekers, Recruiters, AdvertiserAccounts,
    CandidateExperience, CandidateEducation, JobSeekerSkills, Skills,
    Jobs, Applications, CandidateCertifications, CandidateProjects,
    CandidateLanguages, CandidatePortfolioLinks
)
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
        extra_kwargs = {
            'email': {'validators': []} # Remove UniqueValidator to handle unverified re-signup manually
        }

    def validate(self, attrs):
        email = attrs.get('email')
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
             
        # Check if user exists but is verified
        existing_user = User.objects.filter(email=email).first()
        if existing_user and existing_user.is_verified:
            raise serializers.ValidationError({"email": "User with this email already exists and is verified."})
            
        return attrs

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        validated_data.pop('password_confirm')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        
        account_type = validated_data.get('account_type', 'CANDIDATE')
        
        # Use update_or_create logic for unverified users
        user, created = User.objects.update_or_create(
            email=email,
            defaults={
                'account_type': account_type,
                'marketing_consent': validated_data.get('marketing_consent', False),
                'data_processing_consent': validated_data.get('data_processing_consent', False),
                'is_active': False
            }
        )
        
        user.set_password(password)
        user.save()
        
        if account_type == 'CANDIDATE':
            full_name = f"{first_name} {last_name}".strip()
            JobSeekers.objects.update_or_create(
                user=user,
                defaults={'full_name': full_name}
            )
        elif account_type == 'RECRUITER':
            Recruiters.objects.update_or_create(
                user=user,
                defaults={'agency_name': f"{first_name} {last_name}".strip() or "Recruiter"}
            )
            
        return user


class RecruiterSignupSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, required=True)
    company_name = serializers.CharField(max_length=255, required=True)
    designation = serializers.CharField(max_length=255, required=False, allow_blank=True)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        
        password = attrs.get('password')
        if not re.search(r'\d', password) or not re.search(r'[a-zA-Z]', password):
             raise serializers.ValidationError({"password": "Password must contain at least one letter and one number."})
             
        if User.objects.filter(email=attrs.get('email'), is_verified=True).exists():
            raise serializers.ValidationError({"email": "User with this email already exists and is verified."})
             
        return attrs

    def create(self, validated_data):
        with transaction.atomic():
            email = validated_data['email']
            # Use update_or_create logic for unverified users
            user, created = User.objects.update_or_create(
                email=email,
                defaults={
                    'account_type': 'RECRUITER',
                    'is_active': False
                }
            )
            user.set_password(validated_data['password'])
            user.save()
            
            # For recruiter, we map full_name components to first/last if possible
            names = validated_data['full_name'].split(' ', 1)
            first_name = names[0]
            last_name = names[1] if len(names) > 1 else ""
            
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            # Create or update specialized recruiter/company records
            # Note: This is simplified matching the provided logic
            Recruiters.objects.update_or_create(
                user=user,
                defaults={'agency_name': validated_data['company_name']}
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
             
        # Check if email is already taken and verified
        if User.objects.filter(email=attrs.get('email'), is_verified=True).exists():
            raise serializers.ValidationError({"email": "User with this email already exists and is verified."})
            
        # Check if company tax_id or name exists
        tax_id = attrs.get('tax_id')
        if tax_id and tax_id.strip() and Companies.objects.filter(tax_id=tax_id).exists():
            raise serializers.ValidationError({"tax_id": "Company with this tax ID already exists."})
             
        return attrs

    def create(self, validated_data):
        # We handle this manually in the view via transaction, but we can also do it here
        with transaction.atomic():
            company, _ = Companies.objects.update_or_create(
                name=validated_data['company_name'],
                defaults={
                    'industry': validated_data.get('industry', ''),
                    'website': validated_data.get('website', '')
                }
            )
            
            # Use update_or_create for unverified user
            user, created = User.objects.update_or_create(
                email=validated_data['email'],
                defaults={
                    'account_type': 'COMPANY',
                    'is_active': False
                }
            )
            user.set_password(validated_data['password'])
            user.save()
            
            Recruiters.objects.create(
                user=user,
                agency_name=company.name
            )
            
            # Link user to company for advertiser context (useful for organization discovery)
            AdvertiserAccounts.objects.update_or_create(
                user=user,
                company=company,
                defaults={'advertiser_type': 'COMPANY_ADMIN'}
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

class CandidateExperienceSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='designation', allow_blank=True, required=False)
    company = serializers.CharField(source='company_name', allow_blank=True, required=False)
    description = serializers.CharField(source='responsibilities', allow_blank=True, required=False)
    current = serializers.BooleanField(source='is_current', required=False)

    class Meta:
        model = CandidateExperience
        fields = ['id', 'title', 'company', 'start_date', 'end_date', 'current', 'description']

class CandidateEducationSerializer(serializers.ModelSerializer):
    school = serializers.CharField(source='institution', allow_blank=True, required=False)
    field = serializers.CharField(source='field_of_study', allow_blank=True, required=False)

    class Meta:
        model = CandidateEducation
        fields = ['id', 'degree', 'school', 'field', 'start_year', 'end_year', 'grade']

class CandidateCertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateCertifications
        fields = ['id', 'name', 'issuing_organization', 'issue_date', 'credential_url']

class CandidateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProjects
        fields = ['id', 'title', 'description', 'tech_stack', 'project_url']

class CandidateLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateLanguages
        fields = ['id', 'language', 'proficiency_level']

class CandidatePortfolioLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidatePortfolioLinks
        fields = ['id', 'platform', 'url']

from .utils import calculate_profile_completeness

class CandidateProfileSerializer(serializers.ModelSerializer):
    experience = CandidateExperienceSerializer(many=True, source='candidate_experience_job_seeker', required=False)
    education = CandidateEducationSerializer(many=True, source='candidate_education_job_seeker', required=False)
    certifications = CandidateCertificationSerializer(many=True, source='candidate_certifications_job_seeker', required=False)
    projects = CandidateProjectSerializer(many=True, source='candidate_projects_job_seeker', required=False)
    languages = CandidateLanguageSerializer(many=True, source='candidate_languages_job_seeker', required=False)
    portfolio_links = CandidatePortfolioLinkSerializer(many=True, source='candidate_portfolio_links_job_seeker', required=False)
    skills = serializers.SerializerMethodField()
    bio = serializers.CharField(source='summary', allow_blank=True, required=False)
    completeness = serializers.SerializerMethodField()

    class Meta:
        model = JobSeekers
        fields = [
            'id', 'full_name', 'first_name', 'middle_name', 'last_name', 
            'phone', 'whatsapp_number', 'location', 'city', 'country', 'headline', 
            'bio', 'summary', 'experience_years', 'current_salary', 
            'expected_salary', 'currency', 'resume_file_url',
            'resume_headline', 'notice_period', 'date_of_birth', 'gender',
            'marital_status', 'current_company', 'current_designation',
            'industry', 'functional_area', 'ug_qualification', 'pg_qualification', 'pincode',
            'desired_titles', 'work_mode', 'preferred_locations', 'is_open_to_opportunities',
            'experience', 'education', 'certifications', 'projects', 'languages', 'portfolio_links', 'skills', 'completeness', 'social_links'
        ]
        read_only_fields = ['id', 'completeness']
        extra_kwargs = {
            'summary': {'write_only': True, 'required': False}
        }

    def get_completeness(self, obj):
        return calculate_profile_completeness(obj.user)

    def get_skills(self, obj):
        return list(JobSeekerSkills.objects.filter(job_seeker=obj).values_list('skill__name', flat=True))

    @transaction.atomic
    def update(self, instance, validated_data):
        # Handle complex relational fields
        experience_data = validated_data.pop('candidate_experience_job_seeker', None)
        education_data = validated_data.pop('candidate_education_job_seeker', None)
        certification_data = validated_data.pop('candidate_certifications_job_seeker', None)
        project_data = validated_data.pop('candidate_projects_job_seeker', None)
        language_data = validated_data.pop('candidate_languages_job_seeker', None)
        portfolio_data = validated_data.pop('candidate_portfolio_links_job_seeker', None)
        skills_data = self.context['request'].data.get('skills', None)
        
        # Update JobSeeker main fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle Experience
        if experience_data is not None:
            instance.candidate_experience_job_seeker.all().delete()
            for exp in experience_data:
                CandidateExperience.objects.create(job_seeker=instance, **exp)

        # Handle Education
        if education_data is not None:
            instance.candidate_education_job_seeker.all().delete()
            for edu in education_data:
                CandidateEducation.objects.create(job_seeker=instance, **edu)

        # Handle Certifications
        if certification_data is not None:
            instance.candidate_certifications_job_seeker.all().delete()
            for cert in certification_data:
                CandidateCertifications.objects.create(job_seeker=instance, **cert)

        # Handle Projects
        if project_data is not None:
            instance.candidate_projects_job_seeker.all().delete()
            for proj in project_data:
                CandidateProjects.objects.create(job_seeker=instance, **proj)

        # Handle Languages
        if language_data is not None:
            instance.candidate_languages_job_seeker.all().delete()
            for lang in language_data:
                CandidateLanguages.objects.create(job_seeker=instance, **lang)

        # Handle Portfolio Links
        if portfolio_data is not None:
            instance.candidate_portfolio_links_job_seeker.all().delete()
            for port in portfolio_data:
                CandidatePortfolioLinks.objects.create(job_seeker=instance, **port)

        # Handle Skills
        if skills_data is not None:
            JobSeekerSkills.objects.filter(job_seeker=instance).delete()
            for skill_name in skills_data:
                skill, _ = Skills.objects.get_or_create(name=skill_name)
                JobSeekerSkills.objects.create(job_seeker=instance, skill=skill)

        return instance

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    company_logo = serializers.CharField(source='company.logo_url', read_only=True)
    
    class Meta:
        model = Jobs
        fields = [
            'id', 'title', 'company_name', 'company_logo', 'description', 
            'requirements', 'location', 'employment_type', 'experience_required',
            'salary_min', 'salary_max', 'currency', 'posted_at', 'status'
        ]

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    company_name = serializers.CharField(source='job.company.name', read_only=True)

    class Meta:
        model = Applications
        fields = [
            'id', 'job', 'job_title', 'company_name', 'status', 
            'applied_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'applied_at', 'updated_at']

class SocialAuthSerializer(serializers.Serializer):
    provider = serializers.ChoiceField(choices=['google', 'linkedin'])
    token = serializers.CharField()

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp_code = serializers.CharField(max_length=6, required=True)
