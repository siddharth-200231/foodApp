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
                {/* Offer Badge */}
                {product.discount > 0 && (
                    <Chip 
                        icon={<OfferIcon sx={{ fontSize: 16 }} />}
                        label={`${product.discount}% OFF`} 
                        size="small" 
                        sx={{ 
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            background: 'linear-gradient(45deg, #00c853, #69f0ae)',
                            color: 'white',
                            fontWeight: 600,
                            borderRadius: 2,
                            zIndex: 2
                        }}
                    />
                )}

                {/* Favorite Button with Ripple Effect */}
                <IconButton 
                    sx={{ 
                        position: 'absolute', 
                        right: 12, 
                        top: 12,
                        zIndex: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.1) rotate(5deg)',
                            bgcolor: 'rgba(255, 255, 255, 1)'
                        }
                    }}
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    {isFavorite ? 
                        <FavoriteIcon sx={{ color: '#ff4081' }} /> : 
                        <FavoriteBorderIcon />
                    }
                </IconButton>

                {/* Product Image with Loading Skeleton */}
                <Box sx={{ position: 'relative', pt: '75%' }}>
                    {!imageLoaded && (
                        <Skeleton 
                            variant="rectangular" 
                            sx={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%'
                            }} 
                        />
                    )}
                    <CardMedia
                        component="img"
                        image={product.imageUrl || `https://via.placeholder.com/300?text=${product.name}`}
                        alt={product.name}
                        onLoad={() => setImageLoaded(true)}
                        sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Restaurant Name */}
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: '#666',
                            mb: 1
                        }}
                    >
                        <RestaurantIcon sx={{ fontSize: 16 }} />
                        {product.restaurant || 'Restaurant Name'}
                    </Typography>

                    {/* Product Name with Spicy Indicator */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                            {product.name}
                        </Typography>
                        {product.isSpicy && <HotIcon sx={{ color: '#ff5252' }} />}
                    </Box>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {product.tags?.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{ 
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    fontSize: '0.75rem'
                                }}
                            />
                        ))}
                    </Box>

                    {/* Delivery Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <TimerIcon sx={{ fontSize: 18, color: '#666' }} />
                            <Typography variant="body2" color="text.secondary">
                                {product.deliveryTime || '30-40 min'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ShippingIcon sx={{ fontSize: 18, color: '#666' }} />
                            <Typography variant="body2" color="text.secondary">
                                ₹{product.deliveryFee || 'Free'}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Rating and Price */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating 
                                value={product.rating || 4.5} 
                                precision={0.5} 
                                size="small" 
                                readOnly 
                            />
                            <Typography variant="body2" color="text.secondary">
                                ({product.ratingCount || '100+'})
                            </Typography>
                        </Box>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: '#2c3e50'
                            }}
                        >
                            ₹{formatPrice(product.price)}
                        </Typography>
                    </Box>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                    <Button 
                        size="medium" 
                        variant="outlined"
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{
                            flex: 1,
                            borderRadius: 2,
                            borderColor: '#ff7043',
                            color: '#ff7043',
                            fontWeight: 600,
                            '&:hover': {
                                borderColor: '#e64a19',
                                backgroundColor: 'rgba(255, 112, 67, 0.08)'
                            }
                        }}
                    >
                        View Details
                    </Button>
                    <Button
                        size="medium"
                        variant="contained"
                        startIcon={<CartIcon />}
                        onClick={handleAddToCart}
                        disabled={!product.available}
                        sx={{
                            flex: 1,
                            borderRadius: 2,
                            fontWeight: 600,
                            background: product.available 
                                ? 'linear-gradient(45deg, #ff7043, #e64a19)'
                                : '#9e9e9e',
                            boxShadow: '0 2px 8px rgba(255, 112, 67, 0.3)',
                            '&:hover': {
                                background: product.available 
                                    ? 'linear-gradient(45deg, #e64a19, #d84315)'
                                    : '#757575',
                                boxShadow: '0 4px 12px rgba(255, 112, 67, 0.4)'
                            }
                        }}
                    >
                        {product.available ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                </CardActions>
            </MuiCard>
        </Fade>
    );
};

export default Card;