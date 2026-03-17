from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignupView, LoginView, CompanySignupView, CompanyProfileView, CandidateProfileView, SocialLoginView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('social/login/', SocialLoginView.as_view(), name='social_login'),
    path('candidate/profile/', CandidateProfileView.as_view(), name='candidate_profile'),
    path('company/signup/', CompanySignupView.as_view(), name='company_signup'),
    path('company/profile/', CompanyProfileView.as_view(), name='company_profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
