from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignupView, LoginView, CompanySignupView, CompanyProfileView, CandidateProfileView, SocialLoginView, RecruiterSignupView, VerifyOTPView
from .job_views import JobListView, JobDetailView
from .application_views import ApplicationViewSet
from .candidate_views import ActionPlanView, SavedJobViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')
router.register(r'saved-jobs', SavedJobViewSet, basename='saved-job')

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('social/login/', SocialLoginView.as_view(), name='social_login'),
    path('candidate/profile/', CandidateProfileView.as_view(), name='candidate_profile'),
    path('candidate/action-plan/', ActionPlanView.as_view(), name='action_plan'),
    path('recruiter/signup/', RecruiterSignupView.as_view(), name='recruiter_signup'),
    path('company/signup/', CompanySignupView.as_view(), name='company_signup'),
    path('company/profile/', CompanyProfileView.as_view(), name='company_profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jobs/', JobListView.as_view(), name='job_list'),
    path('jobs/<uuid:pk>/', JobDetailView.as_view(), name='job_detail'),
    path('applications/stats/', ApplicationViewSet.as_view({'get': 'get_stats'}), name='application_stats'),
] + router.urls
