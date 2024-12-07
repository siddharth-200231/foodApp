import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Category as CategoryIcon,
  DarkMode,
  LightMode,
  KeyboardArrowDown,
  Home as HomeIcon,
  ShoppingBag as ShoppingBagIcon,
  ShoppingBag,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../Context/Context';
import axios from '../axios';
import Logo from './Logo';

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: 'var(--dark-bg-elevated)',
  border: '1px solid var(--glass-border)',
  '&:hover': {
    backgroundColor: 'var(--dark-bg-secondary)',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 10px var(--primary-muted)',
  },
  '&:focus-within': {
    backgroundColor: 'var(--dark-bg-secondary)',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 3px var(--primary-muted)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '500px',
  transition: 'all 0.2s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.5)',
  transition: 'color 0.2s ease',
  '.MuiInputBase-root:focus-within + &': {
    color: '#3b82f6',
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: '0.95rem',
    width: '100%',
    transition: 'all 0.2s ease',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '35ch',
      '&:focus': {
        width: '45ch',
      },
    },
  },
}));

const RestaurantMenu = ({ onSelectRestaurant }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/restaurants');
        setRestaurants(['All Restaurants', ...response.data]);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants(['All Restaurants']);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (restaurant) => {
    onSelectRestaurant(restaurant === 'All Restaurants' ? '' : restaurant);
    handleClose();
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        disabled={loading}
        sx={{
          color: '#FC8019',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
          '&:hover': {
            color: '#e67216',
            backgroundColor: 'rgba(252, 128, 25, 0.1)',
            transform: 'scale(1.05)',
          }
        }}
      >
        Restaurants
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            background: 'linear-gradient(135deg, var(--dark-bg-secondary), var(--dark-bg-primary))',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
            '& .MuiMenuItem-root': {
              fontSize: '0.9rem',
              color: 'var(--dark-text-secondary)',
              '&:hover': {
                backgroundColor: 'var(--primary-light)',
                color: 'var(--dark-text-primary)',
                transform: 'translateX(5px)',
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {loading ? (
          <MenuItem disabled>Loading restaurants...</MenuItem>
        ) : (
          restaurants.map((restaurant) => (
            <MenuItem
              key={restaurant}
              onClick={() => handleSelect(restaurant)}
            >
              {restaurant}
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

const MobileMenu = ({ onClose, onSelectRestaurant }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/restaurants');
        setRestaurants(['All Restaurants', ...response.data]);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants(['All Restaurants']);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/cart')}>
          <ListItemIcon>
            <ShoppingBagIcon />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>

        {user && (
          <ListItem button onClick={() => handleNavigation('/add_product')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Restaurants Section */}
        <ListItem>
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Restaurants" />
        </ListItem>
        
        {loading ? (
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Loading restaurants..." />
          </ListItem>
        ) : (
          restaurants.map((restaurant) => (
            <ListItem 
              button 
              key={restaurant}
              onClick={() => {
                onSelectRestaurant(restaurant === "All Restaurants" ? "" : restaurant);
                onClose();
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary={restaurant} />
            </ListItem>
          ))
        )}

        <Divider sx={{ my: 1 }} />

        {user ? (
          <>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary={user.name}
                secondary={user.email}
                primaryTypographyProps={{ noWrap: true }}
                secondaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={() => handleNavigation('/login')}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

const UserMenu = ({ anchorEl, handleClose, user, handleLogout }) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    PaperProps={{
      sx: {
        backgroundColor: 'var(--dark-bg-secondary)',
        border: '1px solid var(--glass-border)',
        borderRadius: '12px',
        mt: 1.5,
      }
    }}
  >
    <MenuItem onClick={handleClose} component={Link} to="/profile">
      <ListItemIcon>
        <PersonIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </MenuItem>
    
    <MenuItem onClick={handleClose} component={Link} to="/orders">
      <ListItemIcon>
        <ShoppingBagIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </MenuItem>
    
    <Divider sx={{ my: 1, borderColor: 'var(--glass-border)' }} />
    
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </MenuItem>
  </Menu>
);

const Navbar = ({ onSearch, onSelectRestaurant }) => {
  const { user, cart, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState(['All Restaurants']);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/resturants');
        setRestaurants(['All Restaurants', ...response.data]);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onSelectRestaurant(restaurant === 'All Restaurants' ? '' : restaurant);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  return (
    <AppBar position="sticky" className="navbar" sx={{ background: 'linear-gradient(135deg, var(--dark-bg-primary), var(--dark-bg-secondary))' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <ShoppingBag 
              sx={{ 
                fontSize: { sm: '1.8rem', md: '2.2rem' },
                color: '#FC8019',
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
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                background: 'linear-gradient(45deg, #FC8019, #FF9A4D)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
                fontSize: { sm: '1.4rem', md: '1.8rem' },
                textDecoration: 'none',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(45deg, #FC8019, #FF9A4D)',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                  transformOrigin: 'right',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  '&::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left',
                  }
                },
                transition: 'transform 0.3s ease',
              }}
            >
              Xwiggy
            </Typography>
          </Box>

          {/* Search Bar - Hide on mobile */}
          <Box sx={{ 
            flexGrow: 1, 
            maxWidth: '600px', 
            mx: { sm: 4, md: 8 },
            display: { xs: 'none', sm: 'block' },
            '&:hover': {
              boxShadow: '0 0 15px rgba(252, 128, 25, 0.3)',
            }
          }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search products..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearch}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSearch(searchQuery);
                  }
                }}
              />
            </Search>
          </Box>

          {/* Add RestaurantMenu here */}
          <RestaurantMenu onSelectRestaurant={onSelectRestaurant} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {/* Cart Icon */}
            <IconButton
              onClick={() => navigate('/cart')}
              sx={{
                p: { xs: 0.5, sm: 1 },
                '&:hover': {
                  backgroundColor: 'var(--primary-light)',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <Badge 
                badgeContent={cart.length} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    minWidth: { xs: '18px', sm: '20px' },
                    height: { xs: '18px', sm: '20px' },
                  }
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
              </Badge>
            </IconButton>

            {/* User Menu */}
            {user ? (
              <>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0.5,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { transform: 'scale(1.15)' }
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.username ? user.username[0].toUpperCase() : 'U'}
                  </Avatar>
                </IconButton>
                <UserMenu 
                  anchorEl={anchorElUser}
                  handleClose={handleCloseUserMenu}
                  user={user}
                  handleLogout={logout}
                />
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  fontSize: { sm: '0.8rem', md: '0.9rem' },
                  '&:hover': {
                    backgroundColor: 'var(--primary-dark)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '300px',
            background: 'linear-gradient(135deg, var(--dark-bg-secondary), var(--dark-bg-primary))',
            '&:hover': {
              boxShadow: '0 0 15px var(--primary-muted)',
            }
          }
        }}
      >
        <MobileMenu onClose={() => setMobileOpen(false)} onSelectRestaurant={onSelectRestaurant} />
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
