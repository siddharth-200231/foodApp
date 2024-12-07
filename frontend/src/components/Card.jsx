import React, { useContext } from 'react';
import AppContext from '../Context/Context';
import { useNotification } from '../hooks/useNotification';
import { 
    Card as MuiCard,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
    Rating,
    IconButton,
    Skeleton,
    Fade
} from '@mui/material';
import { 
    ShoppingCart as CartIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    LocalShipping as ShippingIcon,
    Timer as TimerIcon,
    LocalOffer as OfferIcon,
    Restaurant as RestaurantIcon,
    LocalFireDepartment as HotIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FoodPlaceholderSVG from './FoodPlaceholderSVG';

const Card = ({ product }) => {
    if (!product) {
        return null;
    }

    const formatPrice = (price) => {
        if (price === undefined || price === null) return '0';
        return Number(price).toLocaleString();
    };

    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const { addToCart, user } = useContext(AppContext);
    const { showSuccess, showError } = useNotification();

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await addToCart(product, 1);
            showSuccess('Added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            showError(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    return (
        <Fade in={true} timeout={500}>
            <MuiCard 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                    }
                }}
            >
                {/* Restaurant Image */}
                <Box sx={{ position: 'relative', pt: '56.25%' }}> {/* 16:9 aspect ratio */}
                    {!imageLoaded && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                bgcolor: '#FFE0B2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <FoodPlaceholderSVG />
                        </Box>
                    )}
                    <CardMedia
                        component="img"
                        image={product.imageUrl || ''}
                        alt={product.name}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            setImageLoaded(false);
                        }}
                        sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.9)',
                        }}
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Restaurant Name */}
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 1,
                            lineHeight: 1.3
                        }}
                    >
                        {product.name}
                    </Typography>

                    {/* Cuisine Types */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {product.tags?.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{ 
                                    backgroundColor: 'rgba(0,0,0,0.08)',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    color: '#333'
                                }}
                            />
                        ))}
                    </Box>

                    {/* Restaurant Info */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Rating 
                                value={product.rating || 4.5} 
                                precision={0.5} 
                                size="small" 
                                readOnly 
                            />
                            <Typography variant="body2" color="text.primary">
                                ({product.ratingCount || '100+'})
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TimerIcon sx={{ fontSize: 18, color: '#444' }} />
                                <Typography variant="body2" sx={{ color: '#333' }}>
                                    {product.deliveryTime || '30-40 min'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ShippingIcon sx={{ fontSize: 18, color: '#444' }} />
                                <Typography variant="body2" sx={{ color: '#333' }}>
                                    ₹{product.deliveryFee || 'Free'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Average Cost */}
                    <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                        Average cost for two: ₹{formatPrice(product.price * 2)}
                    </Typography>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button 
                        fullWidth
                        size="large" 
                        variant="contained"
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #ff7043, #e64a19)',
                            boxShadow: '0 2px 8px rgba(255, 112, 67, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #e64a19, #d84315)',
                                boxShadow: '0 4px 12px rgba(255, 112, 67, 0.4)'
                            }
                        }}
                    >
                        View Restaurant
                    </Button>
                </CardActions>
            </MuiCard>
        </Fade>
    );
};

export default Card;