
from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
import uuid
class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):

        # required parameters : full_name,email,mobile,password,gender
        data = request.data
        serializers = UserSerializer(data=data, partial=True)
        if serializers.is_valid():
            try:
                user = User.objects.create_user(
                    **data, user_id=str(uuid.uuid4())[:7])
            except Exception as e:
                return Response({"error": str(e)})
            return Response({"success": True, "email": user.email, "id": user.id})
        return Response(serializers.errors)
