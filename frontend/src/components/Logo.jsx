import React from 'react';
import { Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Logo = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      '&:hover': {
        transform: 'scale(1.02)',
        transition: 'transform 0.2s ease'
      }
    }}>
      <RestaurantIcon 
        sx={{ 
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          color: '#FF6B6B',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-5px)',
            },
          },
        }} 
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px',
          fontSize: { xs: '1.4rem', md: '1.8rem' }
        }}
      >
        FoodBazaar
      </Typography>
    </Box>
  );
};

export default Logo; 