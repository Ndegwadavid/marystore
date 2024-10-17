from django.contrib import admin
from .models import Cart, CartItem, Order, OrderItem

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ['total_price']
    
    def total_price(self, obj):
        return obj.quantity * obj.product.price
    total_price.short_description = 'Total Price'

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'items_count', 'total_amount', 'updated_at']
    inlines = [CartItemInline]
    
    def items_count(self, obj):
        return obj.items.count()
    
    def total_amount(self, obj):
        return sum(item.quantity * item.product.price for item in obj.items.all())

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['price']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'status', 'total_amount', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'user__email']
    inlines = [OrderItemInline]
    readonly_fields = ['total_amount']