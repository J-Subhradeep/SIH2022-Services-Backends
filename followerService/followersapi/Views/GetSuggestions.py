import requests
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas
from ..serializers import FollowersSerializer, GetPendingRequestsSerializer, PendingRequestsSerializer
from ..models import PendingRequests, Followers
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
            sent_pendings = PendingRequests.objects.filter(req_user_id=user_id)
            followings = Followers.objects.filter(user_id=user_id)
            serializer = GetPendingRequestsSerializer(pendings, many=True)
            serializer1 = PendingRequestsSerializer(sent_pendings, many=True)

            serializer2 = FollowersSerializer(followings, many=True)
            df1 = pandas.DataFrame(serializer1.data, index=list(
                range(len(serializer1.data))))
            # df2 = pandas.DataFrame(serializer.data, index=list(
            #     range(len(serializer.data))))
            df3 = pandas.DataFrame(serializer2.data, index=list(
                range(len(serializer2.data))))
            # followers = df2.to_numpy().flatten().tolist()
            followers2 = df3.to_numpy().flatten().tolist()
            followers1 = df1.to_numpy().flatten().tolist()
            # df.drop(df.index[df['user_id'].isin(followers)], inplace=True)
            df.drop(df.index[df['user_id'].isin(followers1)], inplace=True)
            df.drop(df.index[df['user_id'].isin(followers2)], inplace=True)
            return Response(df.to_dict(orient="index").values())
        return Response({"not_found": True}, status=status.HTTP_404_NOT_FOUND)
