import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#ff4757',
      light: '#ff6b81',
      dark: '#ff1f3d',
    },
    secondary: {
      main: '#2ed573',
      light: '#7bed9f',
      dark: '#26ae60',
    },
    background: {
      default: mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
      paper: mode === 'dark' ? '#2d3436' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#2d3436',
      secondary: mode === 'dark' ? '#b2bec3' : '#636e72',
    },
    action: {
      active: mode === 'dark' ? '#fff' : '#000',
      hover: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundColor: mode === 'dark' 
            ? 'rgba(26, 26, 26, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '6px 16px',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
          transition: 'all 0.2s ease'
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.3)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: mode === 'dark'
              ? '0 8px 16px rgba(0,0,0,0.4)'
              : '0 8px 16px rgba(0,0,0,0.15)',
          },
          transition: 'all 0.3s ease'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#101f33' : '#ffffff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : undefined,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
        },
        body1: {
          color: mode === 'dark' ? '#b0bec5' : '#424242',
        },
        body2: {
          color: mode === 'dark' ? '#b0bec5' : '#424242',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
          '& .MuiChip-label': {
            color: 'inherit',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-1px'
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px'
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  }
});

export { getTheme as default }; 