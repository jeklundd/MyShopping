from rest_framework import serializers
from .models import ShoppingList, AllShoppingLists, Grocery, CustomUser, UserCo2


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ('id', 'username', 'email', 'last_login', 'date_joined', 'is_staff', 'is_active')


class UserCo2Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserCo2
        fields = ('user', 'total_co2')


class AllShoppingListsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllShoppingLists
        fields = ('ash_list_id', 'user', 'ash_list_name', 'ash_list_co2')


class GrocerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Grocery
        fields = ('g_id', 'g_name', 'g_co2')


class ShoppingListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShoppingList
        fields = ('sh_list_id', 'ash_list_id', 'g_id', 'sh_list_quantity', 'sh_list_co2', 'complete')#, 'groceries')



