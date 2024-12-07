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

    const [isHovered, setIsHovered] = React.useState(false);

    const isOutOfStock = !product.available || product.stockQuantity === 0;

    const handleViewRestaurant = () => {
        navigate(`/product/${product.id}`, {
            state: { 
                isAvailable: product.available,
                stockQuantity: product.stockQuantity,
                isOutOfStock: isOutOfStock
            }
        });
    };

    return (
        <Fade in={true} timeout={700}>
            <MuiCard 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: theme => theme.palette.mode === 'dark' 
                        ? 'linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%)'
                        : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 10px 40px -10px rgba(0,0,0,0.5)'
                        : '0 10px 40px -10px rgba(0,0,0,0.1)',
                    '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: theme => theme.palette.mode === 'dark'
                            ? '0 25px 50px -12px rgba(0,0,0,0.7)'
                            : '0 25px 50px -12px rgba(0,0,0,0.15)',
                        '& .card-media': {
                            transform: 'scale(1.1)',
                        }
                    },
                    opacity: isOutOfStock ? 0.8 : 1,
                    filter: isOutOfStock ? 'grayscale(0.5)' : 'none',
                }}
            >
                <Box sx={{ position: 'relative', pt: '75%' }}>
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
                        className="card-media"
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
                            transition: 'transform 0.5s ease',
                            filter: 'contrast(1.1) saturate(1.2)',
                            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: isHovered
                                ? 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))'
                                : 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
                            zIndex: 1,
                            transition: 'all 0.3s ease',
                        }}
                    />
                </Box>

                <CardContent 
                    sx={{ 
                        flexGrow: 1, 
                        p: 3,
                        mt: -4,
                        position: 'relative',
                        borderRadius: '24px 24px 0 0',
                        background: theme => theme.palette.mode === 'dark' 
                            ? 'linear-gradient(to bottom, rgba(26,26,26,0.98), rgba(26,26,26,1))'
                            : 'linear-gradient(to bottom, rgba(255,255,255,0.98), rgba(255,255,255,1))',
                        backdropFilter: 'blur(10px)',
                    }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {product.tags?.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{ 
                                    background: theme => theme.palette.mode === 'dark'
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'rgba(0,0,0,0.05)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    borderRadius: '8px',
                                    height: '24px',
                                }}
                            />
                        ))}
                    </Box>

                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700,
                            mb: 1,
                            fontSize: '1.25rem',
                            letterSpacing: '-0.02em',
                            color: theme => theme.palette.mode === 'dark' 
                                ? '#fff' 
                                : '#2d3436',
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Rating 
                                value={product.rating || 4.5} 
                                precision={0.5} 
                                size="small" 
                                readOnly 
                            />
                            <Typography variant="body2" sx={{ 
                                color: theme => theme.palette.text.primary,
                                fontWeight: 500,
                                fontSize: '0.9rem'
                            }}>
                                ({product.ratingCount || '100+'})
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TimerIcon sx={{ fontSize: 18, color: '#444' }} />
                                <Typography variant="body2" sx={{ 
                                    color: theme => theme.palette.text.primary,
                                    fontWeight: 500,
                                    fontSize: '0.9rem'
                                }}>
                                    {product.deliveryTime || '30-40 min'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ShippingIcon sx={{ fontSize: 18, color: '#444' }} />
                                <Typography variant="body2" sx={{ 
                                    color: theme => theme.palette.text.primary,
                                    fontWeight: 500,
                                    fontSize: '0.9rem'
                                }}>
                                    ₹{product.deliveryFee || 'Free'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography variant="body2" sx={{ 
                        color: theme => theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}>
                        Average cost for two: ₹{formatPrice(product.price * 2)}
                    </Typography>

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        mt: 2,
                        color: isOutOfStock ? 'error.main' : 'success.main'
                    }}>
                        <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: isOutOfStock ? 'error.main' : 'success.main',
                        }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {isOutOfStock ? 'Out of Stock' : 'Available'}
                        </Typography>
                    </Box>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button 
                        fullWidth
                        variant="contained"
                        onClick={handleViewRestaurant}
                        disabled={isOutOfStock}
                        sx={{
                            borderRadius: '12px',
                            fontWeight: 600,
                            padding: '10px 24px',
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            background: theme => theme.palette.primary.main,
                            '&:hover': {
                                background: theme => theme.palette.primary.dark,
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease',
                            opacity: isOutOfStock ? 0.7 : 1,
                            '&.Mui-disabled': {
                                background: theme => theme.palette.action.disabledBackground,
                                color: theme => theme.palette.action.disabled,
                            }
                        }}
                    >
                        {isOutOfStock ? 'Out of Stock' : 'View Restaurant'}
                    </Button>
                </CardActions>

                {product.isPopular && (
                    <Chip
                        icon={<HotIcon sx={{ color: '#fff' }} />}
                        label="Popular"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            background: 'linear-gradient(45deg, #FF416C, #FF4B2B)',
                            color: '#fff',
                            fontWeight: 600,
                            zIndex: 2,
                            fontSize: '0.8rem',
                            height: '28px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(255, 65, 108, 0.3)',
                        }}
                    />
                )}
            </MuiCard>
        </Fade>
    );
};

export default Card;