import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ACCOUNT_TYPE_CHOICES = (
        ('CANDIDATE', 'Candidate'),
        ('COMPANY', 'Company'),
        ('RECRUITER', 'Recruiter'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    account_type = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    phone_verified = models.BooleanField(default=False)
    two_factor_enabled = models.BooleanField(default=False)
    profile_photo_url = models.TextField(null=True, blank=True)
    profile_completeness_score = models.IntegerField(null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True, db_column='last_login_at')
    last_active = models.DateTimeField(null=True, blank=True)
    failed_login_attempts = models.IntegerField(null=True, blank=True)
    marketing_consent = models.BooleanField(default=False)
    data_processing_consent = models.BooleanField(default=False)
    data_export_requested = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    class Meta:
        db_table = 'users'

class UserSessions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='user_sessions_user')
    refresh_token = models.CharField(max_length=255, null=True, blank=True)
    ip_address = models.CharField(max_length=255, null=True, blank=True)
    user_agent = models.CharField(max_length=255, null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'user_sessions'

class UserConsents(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='user_consents_user')
    consent_type = models.CharField(max_length=255, null=True, blank=True)
    granted = models.BooleanField(default=False)
    ip_address = models.CharField(max_length=255, null=True, blank=True)
    granted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'user_consents'

class DeletionRequests(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='deletion_requests_user')
    request_reason = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    requested_at = models.DateTimeField(null=True, blank=True)
    processed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'deletion_requests'

class AdminRoles(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'admin_roles'

class Permissions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'permissions'

class RolePermissions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.ForeignKey('AdminRoles', on_delete=models.CASCADE, null=True, blank=True, related_name='role_permissions_role')
    permission = models.ForeignKey('Permissions', on_delete=models.CASCADE, null=True, blank=True, related_name='role_permissions_permission')

    class Meta:
        db_table = 'role_permissions'

class UserRoles(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='user_roles_user')
    role = models.ForeignKey('AdminRoles', on_delete=models.CASCADE, null=True, blank=True, related_name='user_roles_role')

    class Meta:
        db_table = 'user_roles'

class AuditLogs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    actor_user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='audit_logs_actor_user')
    target_entity_type = models.CharField(max_length=255, null=True, blank=True)
    target_entity_id = models.UUIDField(null=True, blank=True)
    action = models.CharField(max_length=255, null=True, blank=True)
    old_values = models.JSONField(null=True, blank=True)
    new_values = models.JSONField(null=True, blank=True)
    ip_address = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'audit_logs'

class JobSeekers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='job_seekers_user')
    full_name = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    video_intro_url = models.TextField(null=True, blank=True)
    headline = models.CharField(max_length=255, null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    experience_years = models.IntegerField(null=True, blank=True)
    current_salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    expected_salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    resume_file_url = models.TextField(null=True, blank=True)
    resume_parsed_data = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'job_seekers'

class CandidateEducation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_education_job_seeker')
    degree = models.CharField(max_length=255, null=True, blank=True)
    institution = models.CharField(max_length=255, null=True, blank=True)
    field_of_study = models.CharField(max_length=255, null=True, blank=True)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    grade = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'candidate_education'

class CandidateExperience(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_experience_job_seeker')
    company_name = models.CharField(max_length=255, null=True, blank=True)
    designation = models.CharField(max_length=255, null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    responsibilities = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'candidate_experience'

class CandidateCertifications(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_certifications_job_seeker')
    name = models.CharField(max_length=255, null=True, blank=True)
    issuing_organization = models.CharField(max_length=255, null=True, blank=True)
    issue_date = models.DateField(null=True, blank=True)
    credential_url = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'candidate_certifications'

class CandidateProjects(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_projects_job_seeker')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tech_stack = models.JSONField(null=True, blank=True)
    project_url = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'candidate_projects'

class CandidateLanguages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_languages_job_seeker')
    language = models.CharField(max_length=255, null=True, blank=True)
    proficiency_level = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'candidate_languages'

class CandidatePortfolioLinks(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_portfolio_links_job_seeker')
    platform = models.CharField(max_length=255, null=True, blank=True)
    url = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'candidate_portfolio_links'

class JobSeekerSkills(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='job_seeker_skills_job_seeker')
    skill = models.ForeignKey('Skills', on_delete=models.CASCADE, null=True, blank=True, related_name='job_seeker_skills_skill')
    proficiency_level = models.CharField(max_length=255, null=True, blank=True)
    years_of_experience = models.IntegerField(null=True, blank=True)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'job_seeker_skills'

class SavedJobs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='saved_jobs_job_seeker')
    job = models.ForeignKey('Jobs', on_delete=models.CASCADE, null=True, blank=True, related_name='saved_jobs_job')
    saved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'saved_jobs'

class JobAlerts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='job_alerts_job_seeker')
    keywords = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    experience_min = models.IntegerField(null=True, blank=True)
    frequency = models.CharField(max_length=255, null=True, blank=True)
    last_triggered = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'job_alerts'

class Jobs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('Companies', on_delete=models.CASCADE, null=True, blank=True, related_name='jobs_company')
    recruiter = models.ForeignKey('Recruiters', on_delete=models.CASCADE, null=True, blank=True, related_name='jobs_recruiter')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    requirements = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    location = models.ForeignKey('Locations', on_delete=models.CASCADE, null=True, blank=True, related_name='jobs_location')
    job_category = models.ForeignKey('JobCategories', on_delete=models.CASCADE, null=True, blank=True, related_name='jobs_job_category')
    industry = models.ForeignKey('Industries', on_delete=models.CASCADE, null=True, blank=True, related_name='jobs_industry')
    employment_type = models.CharField(max_length=255, null=True, blank=True)
    experience_required = models.IntegerField(null=True, blank=True)
    salary_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    boost_score = models.IntegerField(null=True, blank=True)
    posted_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = 'jobs'

class JobSkills(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job = models.ForeignKey('Jobs', on_delete=models.CASCADE, null=True, blank=True, related_name='job_skills_job')
    skill = models.ForeignKey('Skills', on_delete=models.CASCADE, null=True, blank=True, related_name='job_skills_skill')
    is_required = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'job_skills'

class JobStatusHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job = models.ForeignKey('Jobs', on_delete=models.CASCADE, null=True, blank=True, related_name='job_status_history_job')
    previous_status = models.CharField(max_length=255, null=True, blank=True)
    new_status = models.CharField(max_length=255, null=True, blank=True)
    changed_by_user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='job_status_history_changed_by_user')
    reason = models.TextField(null=True, blank=True)
    changed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'job_status_history'

class Applications(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job = models.ForeignKey('Jobs', on_delete=models.CASCADE, null=True, blank=True, related_name='applications_job')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='applications_job_seeker')
    status = models.CharField(max_length=255, null=True, blank=True)
    cover_letter = models.TextField(null=True, blank=True)
    interview_schedule = models.DateTimeField(null=True, blank=True)
    offer_details = models.JSONField(null=True, blank=True)
    rejection_reason = models.TextField(null=True, blank=True)
    applied_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = 'applications'

class ApplicationStatusHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey('Applications', on_delete=models.CASCADE, null=True, blank=True, related_name='application_status_history_application')
    previous_status = models.CharField(max_length=255, null=True, blank=True)
    new_status = models.CharField(max_length=255, null=True, blank=True)
    changed_by_user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='application_status_history_changed_by_user')
    reason = models.TextField(null=True, blank=True)
    changed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'application_status_history'

class ApplicationNotes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey('Applications', on_delete=models.CASCADE, null=True, blank=True, related_name='application_notes_application')
    recruiter_user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='application_notes_recruiter_user')
    note = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'application_notes'

class Companies(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    website = models.CharField(max_length=255, null=True, blank=True)
    logo_url = models.TextField(null=True, blank=True)
    cover_image_url = models.TextField(null=True, blank=True)
    industry = models.CharField(max_length=255, null=True, blank=True)
    culture = models.TextField(null=True, blank=True)
    benefits = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    verified_badge = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'companies'

class CompanyReviews(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('Companies', on_delete=models.CASCADE, null=True, blank=True, related_name='company_reviews_company')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='company_reviews_job_seeker')
    rating = models.IntegerField(null=True, blank=True)
    review_text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'company_reviews'

class CompanyTeamInvitations(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('Companies', on_delete=models.CASCADE, null=True, blank=True, related_name='company_team_invitations_company')
    invited_email = models.CharField(max_length=255, null=True, blank=True)
    role = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    invited_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'company_team_invitations'

class Recruiters(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='recruiters_user')
    agency_name = models.CharField(max_length=255, null=True, blank=True)
    subscription_plan = models.ForeignKey('SubscriptionPlans', on_delete=models.CASCADE, null=True, blank=True, related_name='recruiters_subscription_plan')
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'recruiters'

class RecruiterSavedSearches(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recruiter = models.ForeignKey('Recruiters', on_delete=models.CASCADE, null=True, blank=True, related_name='recruiter_saved_searches_recruiter')
    search_criteria = models.JSONField(null=True, blank=True)
    alert_enabled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'recruiter_saved_searches'

class RecruiterPipelines(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recruiter = models.ForeignKey('Recruiters', on_delete=models.CASCADE, null=True, blank=True, related_name='recruiter_pipelines_recruiter')
    name = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'recruiter_pipelines'

class PipelineStages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pipeline = models.ForeignKey('RecruiterPipelines', on_delete=models.CASCADE, null=True, blank=True, related_name='pipeline_stages_pipeline')
    stage_name = models.CharField(max_length=255, null=True, blank=True)
    order_index = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'pipeline_stages'

class CandidateShortlists(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recruiter = models.ForeignKey('Recruiters', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_shortlists_recruiter')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_shortlists_job_seeker')
    job = models.ForeignKey('Jobs', on_delete=models.CASCADE, null=True, blank=True, related_name='candidate_shortlists_job')
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'candidate_shortlists'

class Trainers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='trainers_user')
    bio = models.TextField(null=True, blank=True)
    expertise = models.JSONField(null=True, blank=True)
    approval_status = models.CharField(max_length=255, null=True, blank=True)
    rejection_reason = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'trainers'

class TrainerKycDocuments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trainer = models.ForeignKey('Trainers', on_delete=models.CASCADE, null=True, blank=True, related_name='trainer_kyc_documents_trainer')
    document_type = models.CharField(max_length=255, null=True, blank=True)
    file_url = models.TextField(null=True, blank=True)
    verification_status = models.CharField(max_length=255, null=True, blank=True)
    uploaded_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'trainer_kyc_documents'

class TrainerBankDetails(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trainer = models.ForeignKey('Trainers', on_delete=models.CASCADE, null=True, blank=True, related_name='trainer_bank_details_trainer')
    account_holder_name = models.CharField(max_length=255, null=True, blank=True)
    bank_name = models.CharField(max_length=255, null=True, blank=True)
    account_number = models.CharField(max_length=255, null=True, blank=True)
    ifsc_code = models.CharField(max_length=255, null=True, blank=True)
    tax_id = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'trainer_bank_details'

class Institutes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='institutes_user')
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    accreditation_number = models.CharField(max_length=255, null=True, blank=True)
    documents = models.JSONField(null=True, blank=True)
    verification_status = models.CharField(max_length=255, null=True, blank=True)
    verified_badge = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'institutes'

class Courses(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trainer = models.ForeignKey('Trainers', on_delete=models.CASCADE, null=True, blank=True, related_name='courses_trainer')
    institute = models.ForeignKey('Institutes', on_delete=models.CASCADE, null=True, blank=True, related_name='courses_institute')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    is_free = models.BooleanField(default=False)
    language = models.CharField(max_length=255, null=True, blank=True)
    certificate_available = models.BooleanField(default=False)
    approval_status = models.CharField(max_length=255, null=True, blank=True)
    preview_video_url = models.TextField(null=True, blank=True)
    learning_outcomes = models.TextField(null=True, blank=True)
    prerequisites = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'courses'

class CourseSkills(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey('Courses', on_delete=models.CASCADE, null=True, blank=True, related_name='course_skills_course')
    skill = models.ForeignKey('Skills', on_delete=models.CASCADE, null=True, blank=True, related_name='course_skills_skill')
    skill_level = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'course_skills'

class CourseSections(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey('Courses', on_delete=models.CASCADE, null=True, blank=True, related_name='course_sections_course')
    title = models.CharField(max_length=255, null=True, blank=True)
    order_index = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'course_sections'

class Lectures(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section = models.ForeignKey('CourseSections', on_delete=models.CASCADE, null=True, blank=True, related_name='lectures_section')
    title = models.CharField(max_length=255, null=True, blank=True)
    lecture_type = models.CharField(max_length=255, null=True, blank=True)
    content_url = models.TextField(null=True, blank=True)
    duration_minutes = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'lectures'

class QuizQuestions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lecture = models.ForeignKey('Lectures', on_delete=models.CASCADE, null=True, blank=True, related_name='quiz_questions_lecture')
    question_text = models.TextField(null=True, blank=True)
    question_type = models.CharField(max_length=255, null=True, blank=True)
    passing_score = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'quiz_questions'

class QuizOptions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey('QuizQuestions', on_delete=models.CASCADE, null=True, blank=True, related_name='quiz_options_question')
    option_text = models.TextField(null=True, blank=True)
    is_correct = models.BooleanField(default=False)

    class Meta:
        db_table = 'quiz_options'

class QuizAttempts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey('QuizQuestions', on_delete=models.CASCADE, null=True, blank=True, related_name='quiz_attempts_question')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='quiz_attempts_job_seeker')
    enrollment = models.ForeignKey('Enrollments', on_delete=models.CASCADE, null=True, blank=True, related_name='quiz_attempts_enrollment')
    selected_option_id = models.UUIDField(null=True, blank=True)
    score = models.IntegerField(null=True, blank=True)
    attempted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'quiz_attempts'

class Assignments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lecture = models.ForeignKey('Lectures', on_delete=models.CASCADE, null=True, blank=True, related_name='assignments_lecture')
    instructions = models.TextField(null=True, blank=True)
    submission_type = models.CharField(max_length=255, null=True, blank=True)
    max_score = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'assignments'

class AssignmentSubmissions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assignment = models.ForeignKey('Assignments', on_delete=models.CASCADE, null=True, blank=True, related_name='assignment_submissions_assignment')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='assignment_submissions_job_seeker')
    enrollment = models.ForeignKey('Enrollments', on_delete=models.CASCADE, null=True, blank=True, related_name='assignment_submissions_enrollment')
    file_url = models.TextField(null=True, blank=True)
    score = models.IntegerField(null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'assignment_submissions'

class CourseQuestions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey('Courses', on_delete=models.CASCADE, null=True, blank=True, related_name='course_questions_course')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='course_questions_job_seeker')
    question_text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'course_questions'

class CourseAnswers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey('CourseQuestions', on_delete=models.CASCADE, null=True, blank=True, related_name='course_answers_question')
    responder_user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='course_answers_responder_user')
    answer_text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'course_answers'

class Enrollments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey('Courses', on_delete=models.CASCADE, null=True, blank=True, related_name='enrollments_course')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='enrollments_job_seeker')
    payment = models.ForeignKey('Payments', on_delete=models.CASCADE, null=True, blank=True, related_name='enrollments_payment')
    enrolled_at = models.DateTimeField(null=True, blank=True)
    progress_percentage = models.IntegerField(null=True, blank=True)
    completion_date = models.DateTimeField(null=True, blank=True)
    certificate_url = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'enrollments'

class CertificateTemplates(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    html_template = models.TextField(null=True, blank=True)
    thumbnail_url = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = 'certificate_templates'

class Certificates(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey('Courses', on_delete=models.CASCADE, null=True, blank=True, related_name='certificates_course')
    job_seeker = models.ForeignKey('JobSeekers', on_delete=models.CASCADE, null=True, blank=True, related_name='certificates_job_seeker')
    template = models.ForeignKey('CertificateTemplates', on_delete=models.CASCADE, null=True, blank=True, related_name='certificates_template')
    file_url = models.TextField(null=True, blank=True)
    issued_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'certificates'

class CourseCoupons(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey('Courses', on_delete=models.CASCADE, null=True, blank=True, related_name='course_coupons_course')
    code = models.CharField(max_length=255, null=True, blank=True)
    discount_percentage = models.IntegerField(null=True, blank=True)
    valid_until = models.DateTimeField(null=True, blank=True)
    usage_limit = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'course_coupons'

class TrainerEarnings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trainer = models.ForeignKey('Trainers', on_delete=models.CASCADE, null=True, blank=True, related_name='trainer_earnings_trainer')
    course = models.ForeignKey('Courses', on_delete=models.CASCADE, null=True, blank=True, related_name='trainer_earnings_course')
    enrollment = models.ForeignKey('Enrollments', on_delete=models.CASCADE, null=True, blank=True, related_name='trainer_earnings_enrollment')
    gross_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    platform_commission = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    net_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'trainer_earnings'

class Payouts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trainer = models.ForeignKey('Trainers', on_delete=models.CASCADE, null=True, blank=True, related_name='payouts_trainer')
    period_start = models.DateTimeField(null=True, blank=True)
    period_end = models.DateTimeField(null=True, blank=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    transaction_reference = models.CharField(max_length=255, null=True, blank=True)
    payout_status = models.CharField(max_length=255, null=True, blank=True)
    processed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'payouts'

class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    product_type = models.CharField(max_length=255, null=True, blank=True)
    role_type = models.CharField(max_length=255, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    billing_cycle = models.CharField(max_length=255, null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'products'

class Orders(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='orders_user')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'orders'

class OrderItems(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey('Orders', on_delete=models.CASCADE, null=True, blank=True, related_name='order_items_order')
    product = models.ForeignKey('Products', on_delete=models.CASCADE, null=True, blank=True, related_name='order_items_product')
    quantity = models.IntegerField(null=True, blank=True)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    reference_entity_type = models.CharField(max_length=255, null=True, blank=True)
    reference_entity_id = models.UUIDField(null=True, blank=True)

    class Meta:
        db_table = 'order_items'

class SubscriptionPlans(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    role_type = models.CharField(max_length=255, null=True, blank=True)
    billing_cycle = models.CharField(max_length=255, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    features = models.JSONField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'subscription_plans'

class Subscriptions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='subscriptions_user')
    plan = models.ForeignKey('SubscriptionPlans', on_delete=models.CASCADE, null=True, blank=True, related_name='subscriptions_plan')
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    auto_renew = models.BooleanField(default=False)
    status = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'subscriptions'

class SubscriptionUsage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    subscription = models.ForeignKey('Subscriptions', on_delete=models.CASCADE, null=True, blank=True, related_name='subscription_usage_subscription')
    feature_key = models.CharField(max_length=255, null=True, blank=True)
    used_count = models.IntegerField(null=True, blank=True)
    limit_count = models.IntegerField(null=True, blank=True)
    last_updated = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'subscription_usage'

class Payments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey('Orders', on_delete=models.CASCADE, null=True, blank=True, related_name='payments_order')
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='payments_user')
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    payment_method = models.CharField(max_length=255, null=True, blank=True)
    gateway_transaction_id = models.CharField(max_length=255, null=True, blank=True)
    idempotency_key = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    gateway_response = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'payments'

class PaymentWebhookLogs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gateway_name = models.CharField(max_length=255, null=True, blank=True)
    event_type = models.CharField(max_length=255, null=True, blank=True)
    payload = models.JSONField(null=True, blank=True)
    processed = models.BooleanField(default=False)
    received_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'payment_webhook_logs'

class Invoices(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey('Orders', on_delete=models.CASCADE, null=True, blank=True, related_name='invoices_order')
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='invoices_user')
    invoice_number = models.CharField(max_length=255, null=True, blank=True)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    pdf_url = models.TextField(null=True, blank=True)
    issued_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'invoices'

class Refunds(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.ForeignKey('Payments', on_delete=models.CASCADE, null=True, blank=True, related_name='refunds_payment')
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    reason = models.TextField(null=True, blank=True)
    refund_status = models.CharField(max_length=255, null=True, blank=True)
    gateway_refund_id = models.CharField(max_length=255, null=True, blank=True)
    processed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'refunds'

class RevenueDistributions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_item = models.ForeignKey('OrderItems', on_delete=models.CASCADE, null=True, blank=True, related_name='revenue_distributions_order_item')
    beneficiary_type = models.CharField(max_length=255, null=True, blank=True)
    beneficiary_id = models.UUIDField(null=True, blank=True)
    gross_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    commission_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    net_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'revenue_distributions'

class Wallets(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='wallets_user')
    wallet_type = models.CharField(max_length=255, null=True, blank=True)
    balance = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'wallets'

class WalletTransactions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    wallet = models.ForeignKey('Wallets', on_delete=models.CASCADE, null=True, blank=True, related_name='wallet_transactions_wallet')
    transaction_type = models.CharField(max_length=255, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    reference_type = models.CharField(max_length=255, null=True, blank=True)
    reference_id = models.UUIDField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'wallet_transactions'

class CreditTypes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = 'credit_types'

class CreditBalances(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_balances_user')
    credit_type = models.ForeignKey('CreditTypes', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_balances_credit_type')
    available_credits = models.IntegerField(null=True, blank=True)
    reserved_credits = models.IntegerField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = 'credit_balances'

class CreditTransactions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_transactions_user')
    credit_type = models.ForeignKey('CreditTypes', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_transactions_credit_type')
    transaction_type = models.CharField(max_length=255, null=True, blank=True)
    amount = models.IntegerField(null=True, blank=True)
    reference_type = models.CharField(max_length=255, null=True, blank=True)
    reference_id = models.UUIDField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'credit_transactions'

class CreditPackages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey('Products', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_packages_product')
    credit_type = models.ForeignKey('CreditTypes', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_packages_credit_type')
    credit_amount = models.IntegerField(null=True, blank=True)
    validity_days = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'credit_packages'

class CreditReservations(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_reservations_user')
    credit_type = models.ForeignKey('CreditTypes', on_delete=models.CASCADE, null=True, blank=True, related_name='credit_reservations_credit_type')
    reserved_amount = models.IntegerField(null=True, blank=True)
    reference_type = models.CharField(max_length=255, null=True, blank=True)
    reference_id = models.UUIDField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'credit_reservations'

class AdvertiserAccounts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='advertiser_accounts_user')
    advertiser_type = models.CharField(max_length=255, null=True, blank=True)
    company = models.ForeignKey('Companies', on_delete=models.CASCADE, null=True, blank=True, related_name='advertiser_accounts_company')
    institute = models.ForeignKey('Institutes', on_delete=models.CASCADE, null=True, blank=True, related_name='advertiser_accounts_institute')
    wallet = models.ForeignKey('Wallets', on_delete=models.CASCADE, null=True, blank=True, related_name='advertiser_accounts_wallet')
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'advertiser_accounts'

class AdCampaigns(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    advertiser = models.ForeignKey('AdvertiserAccounts', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_campaigns_advertiser')
    campaign_name = models.CharField(max_length=255, null=True, blank=True)
    budget_total = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    budget_spent = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    bidding_model = models.CharField(max_length=255, null=True, blank=True)
    cost_per_click = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    cost_per_thousand = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    targeting_criteria = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'ad_campaigns'

class AdCreatives(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    campaign = models.ForeignKey('AdCampaigns', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_creatives_campaign')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    media_url = models.TextField(null=True, blank=True)
    landing_url = models.TextField(null=True, blank=True)
    approval_status = models.CharField(max_length=255, null=True, blank=True)
    rejection_reason = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'ad_creatives'

class AdSlots(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slot_name = models.CharField(max_length=255, null=True, blank=True)
    page_type = models.CharField(max_length=255, null=True, blank=True)
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    pricing_model = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = 'ad_slots'

class AdImpressions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creative = models.ForeignKey('AdCreatives', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_impressions_creative')
    slot = models.ForeignKey('AdSlots', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_impressions_slot')
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_impressions_user')
    ip_address = models.CharField(max_length=255, null=True, blank=True)
    user_agent = models.CharField(max_length=255, null=True, blank=True)
    impression_cost = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'ad_impressions'

class AdClicks(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    impression = models.ForeignKey('AdImpressions', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_clicks_impression')
    creative = models.ForeignKey('AdCreatives', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_clicks_creative')
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_clicks_user')
    click_cost = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'ad_clicks'

class AdConversions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    campaign = models.ForeignKey('AdCampaigns', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_conversions_campaign')
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_conversions_user')
    conversion_type = models.CharField(max_length=255, null=True, blank=True)
    conversion_value = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'ad_conversions'

class AdCampaignMetrics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    campaign = models.ForeignKey('AdCampaigns', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_campaign_metrics_campaign')
    date = models.DateField(null=True, blank=True)
    impressions = models.IntegerField(null=True, blank=True)
    clicks = models.IntegerField(null=True, blank=True)
    conversions = models.IntegerField(null=True, blank=True)
    spend = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'ad_campaign_metrics'

class AdBudgetTransactions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    campaign = models.ForeignKey('AdCampaigns', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_budget_transactions_campaign')
    wallet_transaction = models.ForeignKey('WalletTransactions', on_delete=models.CASCADE, null=True, blank=True, related_name='ad_budget_transactions_wallet_transaction')
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    transaction_type = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'ad_budget_transactions'

class Skills(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'skills'

class JobCategories(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    parent_category = models.ForeignKey('JobCategories', on_delete=models.CASCADE, null=True, blank=True, related_name='job_categories_parent_category')
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = 'job_categories'

class Industries(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = 'industries'

class Locations(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    latitude = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    longitude = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    timezone = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = 'locations'

class SearchQueries(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='search_queries_user')
    query_text = models.CharField(max_length=255, null=True, blank=True)
    filters = models.JSONField(null=True, blank=True)
    result_count = models.IntegerField(null=True, blank=True)
    searched_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'search_queries'

class SavedSearches(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='saved_searches_user')
    search_type = models.CharField(max_length=255, null=True, blank=True)
    search_criteria = models.JSONField(null=True, blank=True)
    alert_enabled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'saved_searches'

class SearchResultClicks(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    search_query = models.ForeignKey('SearchQueries', on_delete=models.CASCADE, null=True, blank=True, related_name='search_result_clicks_search_query')
    entity_type = models.CharField(max_length=255, null=True, blank=True)
    entity_id = models.UUIDField(null=True, blank=True)
    clicked_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'search_result_clicks'

class NotificationPreferences(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='notification_preferences_user')
    email_enabled = models.BooleanField(default=False)
    sms_enabled = models.BooleanField(default=False)
    push_enabled = models.BooleanField(default=False)
    marketing_enabled = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = 'notification_preferences'

class NotificationTemplates(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    template_key = models.CharField(max_length=255, null=True, blank=True)
    subject_template = models.TextField(null=True, blank=True)
    body_template = models.TextField(null=True, blank=True)
    channel = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'notification_templates'

class Notifications(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='notifications_user')
    template = models.ForeignKey('NotificationTemplates', on_delete=models.CASCADE, null=True, blank=True, related_name='notifications_template')
    channel = models.CharField(max_length=255, null=True, blank=True)
    content = models.JSONField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    read_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'notifications'

class MessageThreads(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    thread_type = models.CharField(max_length=255, null=True, blank=True)
    reference_entity_type = models.CharField(max_length=255, null=True, blank=True)
    reference_entity_id = models.UUIDField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'message_threads'

class ThreadParticipants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    thread = models.ForeignKey('MessageThreads', on_delete=models.CASCADE, null=True, blank=True, related_name='thread_participants_thread')
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='thread_participants_user')
    role = models.CharField(max_length=255, null=True, blank=True)
    joined_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'thread_participants'

class Messages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    thread = models.ForeignKey('MessageThreads', on_delete=models.CASCADE, null=True, blank=True, related_name='messages_thread')
    sender = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='messages_sender')
    message_type = models.CharField(max_length=255, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    attachment_url = models.TextField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
    sent_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'messages'

class InterviewNotifications(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey('Applications', on_delete=models.CASCADE, null=True, blank=True, related_name='interview_notifications_application')
    recruiter = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='interview_notifications_recruiter')
    job_seeker = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True, related_name='interview_notifications_job_seeker')
    scheduled_time = models.DateTimeField(null=True, blank=True)
    meeting_link = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'interview_notifications'

class CommunicationDeliveryLogs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    notification = models.ForeignKey('Notifications', on_delete=models.CASCADE, null=True, blank=True, related_name='communication_delivery_logs_notification')
    provider_name = models.CharField(max_length=255, null=True, blank=True)
    provider_message_id = models.CharField(max_length=255, null=True, blank=True)
    delivery_status = models.CharField(max_length=255, null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'communication_delivery_logs'

