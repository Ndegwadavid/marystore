from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions

from .models import Cart, Order
from .serializers import CartSerializer, OrderSerializer

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['POST'])
    def add_item(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        try:
            cart_item = cart.items.get(product_id=product_id)
            cart_item.quantity += quantity
            cart_item.save()
        except CartItem.DoesNotExist:
            cart.items.create(product_id=product_id, quantity=quantity)
        
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        cart = Cart.objects.get(user=request.user)
        if not cart.items.exists():
            return Response(
                {"error": "Cannot create empty order"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        total_amount = sum(
            item.quantity * item.product.price 
            for item in cart.items.all()
        )
        
        order = Order.objects.create(
            user=request.user,
            total_amount=total_amount,
            shipping_address=request.data.get('shipping_address')
        )
        
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
        
        cart.items.all().delete()
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)