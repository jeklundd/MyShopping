from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from shoppinglist import views

router = routers.DefaultRouter()
router.register(r'user', views.UserView, 'user')
router.register(r'userdetails', views.UserDetailsView, 'userdetails')
router.register(r'allshoppinglists', views.AllShoppingListsView, 'allshoppinglists')
router.register(r'allshoppinglistsdetails', views.AllShoppingListsDetailsView, 'allshoppinglistsdetails')
router.register(r'shoppinglist', views.ShoppingListView, 'shoppinglist')
router.register(r'shoppinglistdetails', views.ShoppingListDetailsView, 'shoppinglistdetails')
router.register(r'groceries', views.GroceryView, 'grocery')
router.register(r'userco2', views.UserCo2View, 'userco2')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    ]
