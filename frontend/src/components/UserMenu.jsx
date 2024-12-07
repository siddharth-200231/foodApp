import React, { useState, useEffect } from 'react';
import { 
    IconButton, 
    Menu, 
    MenuItem, 
    Avatar, 
    Typography,
    Divider,
    ListItemIcon 
} from '@mui/material';
import { 
    AccountCircle, 
    ShoppingBag, 
    Logout 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserMenu = ({ user, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        onLogout();
    };

    return (
        <>
            <IconButton
                onClick={handleMenu}
                sx={{
                    p: 0.5,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: 'primary.light',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        backgroundColor: 'primary.main',
                        '& .MuiAvatar-root': {
                            color: 'primary.main',
                            backgroundColor: 'white'
                        }
                    }
                }}
            >
                <Avatar 
                    sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: 'white',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease-in-out'
                    }}
                >
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        width: 240,
                        mt: 1.5,
                        borderRadius: '12px',
                        '& .MuiList-root': {
                            py: 1
                        }
                    }
                }}
            >
                <MenuItem sx={{ py: 1.5 }}>
                    <Typography 
                        variant="subtitle1" 
                        noWrap 
                        sx={{ 
                            fontWeight: 600,
                            color: 'primary.main'
                        }}
                    >
                        {user.name || 'User'}
                    </Typography>
                </MenuItem>
                <Typography
                    variant="body2"
                    sx={{ 
                        px: 2, 
                        pb: 1.5,
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                    }}
                >
                    {user.email}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <MenuItem 
                    onClick={() => navigate('/orders')}
                    sx={{
                        py: 1.2,
                        '&:hover': {
                            backgroundColor: 'primary.lighter',
                            '& .MuiListItemIcon-root': {
                                color: 'primary.main'
                            }
                        }
                    }}
                >
                    <ListItemIcon>
                        <ShoppingBag fontSize="small" />
                    </ListItemIcon>
                    My Orders
                </MenuItem>
                <MenuItem 
                    onClick={handleLogout}
                    sx={{
                        py: 1.2,
                        '&:hover': {
                            backgroundColor: 'error.lighter',
                            color: 'error.main',
                            '& .MuiListItemIcon-root': {
                                color: 'error.main'
                            }
                        }
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu; 