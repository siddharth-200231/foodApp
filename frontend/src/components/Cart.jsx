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
      <Container maxWidth="md" sx={{ mt: 8, mb: 4, minHeight: '60vh' }}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            borderRadius: 4,
            background: '#fff',
          }}
        >
          <RemoveShoppingCart sx={{ fontSize: 80, color: orange[700] }} />
          <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
            Your order is empty
          </Typography>
          <Typography variant="h6" color="text.primary" sx={{ maxWidth: 500, opacity: 0.8 }}>
            Looks like you haven't added any dishes to your order yet.
            Check out our menu and discover delicious meals!
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Box sx={{ 
        mb: 5, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        p: 3,
        borderRadius: 2,
        bgcolor: '#fff',
        boxShadow: 1
      }}>
        <ShoppingCart sx={{ fontSize: 40, color: orange[700] }} />
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          Your Order
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            mb: 2, 
            borderRadius: 3,
            bgcolor: '#fff',
          }}>
            {cart.map((item) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  bgcolor: '#fff',
                  '&:last-child': { mb: 0 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src={item.product.imageUrl || `https://via.placeholder.com/150?text=${item.product.name}`}
                        alt={item.product.name}
                        sx={{
                          width: '100%',
                          height: 150,
                          borderRadius: 2,
                          objectFit: 'cover',
                          boxShadow: 2
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
                            {item.product.name}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color="text.primary" 
                            sx={{ opacity: 0.8 }} 
                            gutterBottom
                          >
                            {item.product.description || 'No description available'}
                          </Typography>
                          <Typography variant="h5" color={orange[700]} fontWeight="bold" gutterBottom>
                            ₹{formatPrice(item.product.price)}
                          </Typography>
                          <Box sx={{ 
                            mt: 2, 
                            p: 1, 
                            borderRadius: 1, 
                            bgcolor: orange[50],
                            border: `1px solid ${orange[200]}`,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1
                          }}>
                            <Typography variant="body1" fontWeight="medium" color="text.primary">
                              Quantity: {item.quantity}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton 
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                          sx={{ 
                            alignSelf: 'flex-start',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              bgcolor: 'error.light'
                            }
                          }}
                        >
                          <DeleteIcon />
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
              p: 4, 
              position: 'sticky', 
              top: 24,
              borderRadius: 3,
              bgcolor: '#fff',
            }}
          >
            <Typography variant="h5" gutterBottom color="text.primary" fontWeight="bold">
              Bill Details
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.primary">Items ({cart.length})</Typography>
              <Typography color="text.primary">₹{formatPrice(calculateTotal())}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.primary">Delivery Charge</Typography>
              <Typography color="success.main" fontWeight="medium">Free</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.primary">GST (5%)</Typography>
              <Typography color="text.primary">₹{formatPrice(calculateTotal() * 0.05)}</Typography>
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
                mt: 3,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                bgcolor: orange[700],
                '&:hover': {
                  bgcolor: orange[800],
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease'
              }}
            >
              Place Order
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
