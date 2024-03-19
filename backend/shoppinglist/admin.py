from .models import AllShoppingLists, Grocery, ShoppingList, CustomUser, UserCo2
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('id', 'username', 'email', 'last_login', 'date_joined', 'is_staff', 'is_active')


class UserCo2Admin(admin.ModelAdmin):
    list_display = ('user', 'total_co2')


class AllShoppingListsAdmin(admin.ModelAdmin):
    list_display = ('ash_list_id', 'user', 'ash_list_name', 'ash_list_co2')


class GroceryAdmin(admin.ModelAdmin):
    list_display = ('g_id', 'g_name', 'g_co2')


class ShoppingListAdmin(admin.ModelAdmin):
    list_display = ('sh_list_id', 'ash_list_id', 'g_id', 'sh_list_quantity', 'sh_list_co2', 'complete')


admin.site.register(AllShoppingLists, AllShoppingListsAdmin)
admin.site.register(Grocery, GroceryAdmin)
admin.site.register(ShoppingList, ShoppingListAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserCo2, UserCo2Admin)

