import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#FF4848',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#71D7D0',
      dark: '#3DBEB5',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#F7F7F7',
      paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#FFFFFF' : '#2D3436',
      secondary: mode === 'dark' ? '#B2BEC3' : '#636E72',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.5px',
      backgroundImage: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: '12px',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: mode === 'dark' 
            ? 'linear-gradient(145deg, #1E1E1E, #262626)'
            : 'linear-gradient(145deg, #FFFFFF, #F8F9FA)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: mode === 'dark' 
              ? '0 20px 40px rgba(0,0,0,0.4)'
              : '0 20px 40px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.2)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF4848, #3DBEB5)',
            boxShadow: '0 6px 20px rgba(255, 107, 107, 0.3)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export { getTheme as default }; 