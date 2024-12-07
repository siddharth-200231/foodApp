import React, { useContext, useState } from 'react';
import AppContext from '../Context/Context';
import CheckoutDialog from './CheckoutDialog';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import {
  RemoveShoppingCart,
  Delete as DeleteIcon,
  ShoppingCart
} from '@mui/icons-material';
import { useNotification } from '../hooks/useNotification';
import axios from '../axios';
import { orange } from '@mui/material/colors';

const Cart = () => {
  const { cart, removeFromCart } = useContext(AppContext);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const response = await axios.post(`/api/cart/${userId}/purchase`);
      
      if (response.status === 200) {
        showSuccess('Purchase completed successfully!');
        // Clear cart or update UI
      } else {
        showError(`Purchase failed: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      showError(error.response?.data?.message || 'Failed to complete purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price ? price.toLocaleString() : '0';
  }

  if (!cart || cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, mb: 4, minHeight: '70vh' }}>
        <Paper 
          elevation={8} 
          sx={{ 
            p: 8, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            borderRadius: 6,
            background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${orange[700]} 0%, ${orange[500]} 100%)`,
            }
          }}
        >
          <RemoveShoppingCart sx={{ fontSize: 100, color: orange[700], opacity: 0.8 }} />
          <Box>
            <Typography variant="h3" gutterBottom fontWeight="800" color="text.primary" sx={{ color: '#1a1a1a' }}>
              Your order is empty
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', color: '#333333' }}>
              Time to fill it with delicious memories! Explore our menu and discover culinary delights waiting just for you.
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ 
        mb: 6, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 3,
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <ShoppingCart sx={{ fontSize: 48, color: orange[700] }} />
        <Box>
          <Typography variant="h3" fontWeight="800" color="text.primary" sx={{ color: '#1a1a1a' }}>
            Your Order
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, color: '#333333' }}>
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ 
            p: 4, 
            mb: 2, 
            borderRadius: 4,
            bgcolor: 'transparent',
          }}>
            {cart.map((item) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 3, 
                  borderRadius: 3,
                  bgcolor: '#fff',
                  border: '1px solid',
                  borderColor: 'grey.100',
                  '&:last-child': { mb: 0 },
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.01)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Box
                        component="img"
                        src={item.product.imageUrl || `https://via.placeholder.com/150?text=${item.product.name}`}
                        alt={item.product.name}
                        sx={{
                          width: '100%',
                          height: 200,
                          borderRadius: 3,
                          objectFit: 'cover',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="h4" fontWeight="bold" sx={{ color: '#1a1a1a' }} gutterBottom>
                              {item.product.name}
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ maxWidth: '90%', color: '#333333' }} 
                              gutterBottom
                            >
                              {item.product.description || 'No description available'}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 3 }}>
                            <Typography variant="h4" color={orange[700]} fontWeight="bold" gutterBottom>
                              ₹{formatPrice(item.product.price)}
                            </Typography>
                            <Box sx={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 2,
                              p: 2,
                              borderRadius: 2,
                              bgcolor: orange[50],
                              border: `1px solid ${orange[200]}`,
                            }}>
                              <Typography variant="h6" fontWeight="medium" color="text.primary">
                                Quantity: {item.quantity}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <IconButton 
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                          sx={{ 
                            height: 'fit-content',
                            p: 1.5,
                            '&:hover': {
                              transform: 'scale(1.2) rotate(8deg)',
                              bgcolor: 'error.light'
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={4} 
            sx={{ 
              p: 5, 
              position: 'sticky', 
              top: 32,
              borderRadius: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)',
              border: '1px solid',
              borderColor: 'grey.100',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#1a1a1a' }} fontWeight="bold">
              Bill Details
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#333333' }}>Items ({cart.length})</Typography>
              <Typography sx={{ color: '#333333' }}>₹{formatPrice(calculateTotal())}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#333333' }}>Delivery Charge</Typography>
              <Typography color="success.main" fontWeight="medium">Free</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#333333' }}>GST (5%)</Typography>
              <Typography sx={{ color: '#333333' }}>₹{formatPrice(calculateTotal() * 0.05)}</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" color="text.primary" fontWeight="bold">Total Amount</Typography>
              <Typography variant="h6" color={orange[700]} fontWeight="bold">
                ₹{formatPrice(calculateTotal() * 1.05)}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => setCheckoutOpen(true)}
              sx={{ 
                mt: 4,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: 3,
                bgcolor: orange[700],
                '&:hover': {
                  bgcolor: orange[800],
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        onPurchase={handlePurchase}
        loading={loading}
      />
    </Container>
  );
};

export default Cart;
