import requests
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas
from ..serializers import GetPendingRequestsSerializer
from ..models import PendingRequests
from rest_framework import status


class GetSuggestionsView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id', None)
        if user_id:
            data = requests.get('http://localhost:8000/getalluser/').json()
            df = pandas.DataFrame(data)
            df = df[df['is_varified'] == True]
            df = df[df['user_id'] != user_id]
            pendings = PendingRequests.objects.filter(user_id=user_id)
            serializer = GetPendingRequestsSerializer(pendings, many=True)
            df2 = pandas.DataFrame(serializer.data, index=list(
                range(len(serializer.data))))
            followers = df2.to_numpy().flatten().tolist()
            df.drop(df.index[df['user_id'].isin(followers)], inplace=True)
            return Response(df.to_dict(orient="index").values())
        return Response({"not_found": True}, status=status.HTTP_404_NOT_FOUND)
