import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Context/Context';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(var(--dark-bg-secondary-rgb), 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography 
            component="h1" 
            variant="h3" 
            sx={{ 
              mb: 5,
              fontWeight: 700,
              background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              sx={{
                mb: 3,
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  fontSize: '1.1rem',
                  padding: '4px 0',
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--dark-text-secondary)'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)',
                  },
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              sx={{
                mb: 5,
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  fontSize: '1.1rem',
                  padding: '4px 0',
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--dark-text-secondary)'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)',
                  },
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mb: 4,
                py: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.2rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
                '&:hover': {
                  background: 'linear-gradient(45deg, var(--secondary-color), var(--primary-color))',
                }
              }}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                href="/signup"
                variant="body1"
                sx={{
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 