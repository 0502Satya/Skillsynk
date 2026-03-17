from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import (
    UserSignupSerializer, UserResponseSerializer, 
    CompanySignupSerializer, CompanyProfileSerializer,
    CandidateProfileSerializer, SocialAuthSerializer
)
from .models import Companies, AdvertiserAccounts, JobSeekers, CustomUser
from .social_auth_utils import verify_google_token, verify_linkedin_token

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    # Add custom claims
    refresh['role'] = user.account_type
    
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            user_data = UserResponseSerializer(user).data
            
            return Response({
                'message': 'User registered successfully.',
                'user': user_data,
                'tokens': tokens
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, email=email, password=password)

        if user is not None:
            if not user.is_active:
                return Response({'error': 'This account is inactive.'}, status=status.HTTP_401_UNAUTHORIZED)
            
            tokens = get_tokens_for_user(user)
            user_data = UserResponseSerializer(user).data
            
            return Response({
                'message': 'Login successful.',
                'user': user_data,
                'tokens': tokens
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class CompanySignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = CompanySignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            user_data = UserResponseSerializer(user).data
            
            return Response({
                'message': 'Company and admin user registered successfully.',
                'user': user_data,
                'tokens': tokens
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompanyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get_company(self, user):
        try:
            # Find company linked to this user
            adv_account = AdvertiserAccounts.objects.get(user=user)
            return adv_account.company
        except AdvertiserAccounts.DoesNotExist:
            return None

    def get(self, request):
        company = self.get_company(request.user)
        if not company:
            return Response({"error": "No company associated with this user."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CompanyProfileSerializer(company)
        return Response(serializer.data)

    def patch(self, request):
        company = self.get_company(request.user)
        if not company:
            return Response({"error": "No company associated with this user."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CompanyProfileSerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CandidateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get_job_seeker(self, user):
        try:
            return JobSeekers.objects.get(user=user)
        except JobSeekers.DoesNotExist:
            return None

    def get(self, request):
        job_seeker = self.get_job_seeker(request.user)
        if not job_seeker:
            return Response({"error": "No profile found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CandidateProfileSerializer(job_seeker)
        return Response(serializer.data)

    def patch(self, request):
        job_seeker = self.get_job_seeker(request.user)
        if not job_seeker:
            return Response({"error": "No profile found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CandidateProfileSerializer(job_seeker, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SocialLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = SocialAuthSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        provider = serializer.validated_data['provider']
        token = serializer.validated_data['token']
        
        user_info = None
        if provider == 'google':
            user_info = verify_google_token(token)
        elif provider == 'linkedin':
            user_info = verify_linkedin_token(token)

        if not user_info:
            return Response({'error': 'Invalid social token or provider error.'}, status=status.HTTP_400_BAD_REQUEST)

        email = user_info['email']
        
        # Check if user exists, or create new candidate
        user, created = CustomUser.objects.get_or_create(
            email=email,
            defaults={
                'account_type': 'CANDIDATE',
                'is_active': True,
                # For social login, we might not have a password, but Django requires one.
                'password': 'SOCIAL_LOGIN_UNUSABLE_PASSWORD'
            }
        )

        if created:
            # Create JobSeeker profile
            full_name = f"{user_info.get('first_name', '')} {user_info.get('last_name', '')}".strip()
            JobSeekers.objects.create(
                user=user,
                full_name=full_name or "Candidate"
            )
        
        tokens = get_tokens_for_user(user)
        user_data = UserResponseSerializer(user).data
        
        return Response({
            'message': 'Social login successful.',
            'user': user_data,
            'tokens': tokens,
            'is_new_user': created
        }, status=status.HTTP_200_OK)
