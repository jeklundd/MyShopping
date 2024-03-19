from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    def _str_(self):
        return self.pk


class AllShoppingLists(models.Model):
    ash_list_id = models.AutoField(primary_key=True, default=None)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False, default=None, null=True)
    ash_list_name = models.CharField(max_length=30, null=True, verbose_name='Shoppinglist name')
    ash_list_co2 = models.FloatField(null=True, blank=True, verbose_name='Shoppinglist CO2')

    def _str_(self):
        return self.user


class UserCo2(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, blank=False, default=None)
    total_co2 = models.FloatField(null=True, blank=True, verbose_name='Total CO2 cost')

    def _str_(self):
        return self.user


class Grocery(models.Model):
    g_id = models.AutoField(primary_key=True, default=None)
    g_name = models.CharField(max_length=20, null=True, verbose_name='Grocery name')
    g_co2 = models.FloatField( null=True, default=None, verbose_name='Grocery CO2')

    def _str_(self):
        return self.g_id


class ShoppingList(models.Model):
    sh_list_id = models.AutoField(primary_key=True, default=None)
    ash_list_id = models.ForeignKey(AllShoppingLists, on_delete=models.CASCADE, default=None, null=True, verbose_name='All Shopping lists ID')
    g_id = models.ForeignKey(Grocery, on_delete=models.CASCADE, default=None, null=True, verbose_name='Grocery ID')
    sh_list_quantity = models.IntegerField(null=True, default=1, verbose_name='Quantity')
    sh_list_co2 = models.CharField(max_length=10, null=True, blank=True, verbose_name='Shoppinglist CO2')
    complete = models.BooleanField(default=False)

    def _str_(self):
        return self.ash_list_id



