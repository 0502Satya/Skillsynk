from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SavedJobs, Jobs, JobSeekers
from .serializers import JobSerializer

class SavedJobViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        try:
            job_seeker = JobSeekers.objects.get(user=self.request.user)
            return SavedJobs.objects.filter(job_seeker=job_seeker).select_related('job', 'job__company')
        except JobSeekers.DoesNotExist:
            return SavedJobs.objects.none()
        
    def list(self, request):
        queryset = self.get_queryset()
        jobs = [sj.job for sj in queryset]
        from .serializers import JobSerializer
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

    def create(self, request):
        job_id = request.data.get('job')
        try:
            job_seeker = JobSeekers.objects.get(user=request.user)
            job = Jobs.objects.get(id=job_id)
            
            saved_job, created = SavedJobs.objects.get_or_create(
                job_seeker=job_seeker,
                job=job
            )
            if not created:
                return Response({"message": "Job already saved"}, status=status.HTTP_200_OK)
            return Response({"message": "Job saved successfully"}, status=status.HTTP_201_CREATED)
        except (JobSeekers.DoesNotExist, Jobs.DoesNotExist):
            return Response({"error": "Invalid job or user"}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            job_seeker = JobSeekers.objects.get(user=request.user)
            SavedJobs.objects.filter(job_seeker=job_seeker, job_id=pk).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except JobSeekers.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class ActionPlanView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        from .utils import calculate_profile_completeness
        from .models import Applications, JobSeekers, JobSeekerSkills
        
        try:
            job_seeker = JobSeekers.objects.get(user=request.user)
        except JobSeekers.DoesNotExist:
            return Response({"error": "Job seeker profile not found"}, status=status.HTTP_404_NOT_FOUND)
            
        completeness = calculate_profile_completeness(request.user)
        application_count = Applications.objects.filter(job_seeker=job_seeker).count()
        skill_count = JobSeekerSkills.objects.filter(job_seeker=job_seeker).count()
        
        actions = []
        
        if completeness < 100:
            actions.append({
                "id": "complete_profile",
                "title": "Complete your profile",
                "description": f"Your profile is {completeness}% complete. Add more details to stand out.",
                "icon": "person_add",
                "link": "/dashboard/profile"
            })
            
        if skill_count < 3:
            actions.append({
                "id": "add_skills",
                "title": "Add more skills",
                "description": "Candidates with 5+ skills are 2x more likely to be noticed.",
                "icon": "bolt",
                "link": "/dashboard/profile"
            })
            
        if application_count == 0:
            actions.append({
                "id": "first_application",
                "title": "Apply to your first job",
                "description": "Start your journey by applying to recommended roles.",
                "icon": "rocket_launch",
                "link": "/dashboard"
            })
        else:
            actions.append({
                "id": "track_applications",
                "title": "Track your applications",
                "description": f"You have {application_count} active applications. Check their status.",
                "icon": "fact_check",
                "link": "/dashboard/applications"
            })
            
        return Response(actions)
