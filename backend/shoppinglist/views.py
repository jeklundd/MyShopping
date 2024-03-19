from .serializers import AllShoppingListsSerializer, GrocerySerializer, ShoppingListSerializer, UserSerializer, UserCo2Serializer
from .models import ShoppingList, AllShoppingLists, Grocery, CustomUser, UserCo2
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class UserDetailsView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        request_user = self.request.user
        queryset = CustomUser.objects.filter(username=request_user)
        return queryset


class UserCo2View(viewsets.ModelViewSet):
    serializer_class = UserCo2Serializer

    def get_queryset(self):
        queryset = UserCo2.objects.all()
        user = self.request.query_params.get('user', None)
        if user is not None:
            queryset = queryset.filter(user_id=user)
        return queryset


class AllShoppingListsView(viewsets.ModelViewSet):
    queryset = AllShoppingLists.objects.all()
    serializer_class = AllShoppingListsSerializer


class AllShoppingListsDetailsView(viewsets.ModelViewSet):
    serializer_class = AllShoppingListsSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        request_user = self.request.user
        queryset = AllShoppingLists.objects.filter(user=request_user)
        return queryset


class ShoppingListDetailsView(viewsets.ModelViewSet):
    serializer_class = ShoppingListSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = ShoppingList.objects.all()
        ash_list_id  = self.request.query_params.get('ash_list_id', None)
        if ash_list_id is not None:
            queryset = queryset.filter(ash_list_id__ash_list_id=ash_list_id)
        return queryset


class ShoppingListView(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

    def retrieve(self, request, *args, **kwargs):
        queryParams = self.request.Get.get('ash_list_id')
        if queryParams is None:
            queryset = ShoppingList.objects.none()
        else:
            queryset = ShoppingList.objects.filter(ash_list_id=queryParams)
            serializer_class = ShoppingListSerializer(queryset)
        return serializer_class.data


class GroceryView(viewsets.ModelViewSet):
    queryset = Grocery.objects.all()
    serializer_class = GrocerySerializer


