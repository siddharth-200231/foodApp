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
                    borderRadius: '20px',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
                        '&::before': {
                            opacity: 1,
                        },
                        '& .card-media': {
                            transform: 'scale(1.08)',
                        },
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
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            filter: 'brightness(0.95) contrast(1.1)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)',
                            zIndex: 1,
                        }}
                    />
                </Box>

                <CardContent sx={{ 
                    flexGrow: 1, 
                    p: 3,
                    background: theme => theme.palette.mode === 'dark' 
                        ? 'linear-gradient(180deg, rgba(18,18,18,0.8) 0%, rgba(18,18,18,1) 100%)'
                        : 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 100%)',
                }}>
                    {/* Restaurant Name */}
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 700,
                            color: theme => theme.palette.text.primary,
                            mb: 1,
                            lineHeight: 1.3,
                            fontSize: '1.25rem',
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
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
                                    backgroundColor: theme => theme.palette.mode === 'dark' 
                                        ? 'rgba(255,255,255,0.1)' 
                                        : 'rgba(0,0,0,0.08)',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: theme => theme.palette.text.primary,
                                    padding: '4px 8px'
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

                    {/* Average Cost */}
                    <Typography variant="body2" sx={{ 
                        color: theme => theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}>
                        Average cost for two: ₹{formatPrice(product.price * 2)}
                    </Typography>
                    {product.isPopular && (
                        <Chip
                            icon={<HotIcon sx={{ color: '#fff !important' }} />}
                            label="Popular"
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'linear-gradient(45deg, #ff4081, #c51162)',
                                color: '#fff',
                                fontWeight: 600,
                                zIndex: 2,
                            }}
                        />
                    )}
                </CardContent>

                <CardActions sx={{ 
                    p: 3, 
                    pt: 0,
                    background: theme => theme.palette.mode === 'dark' 
                        ? 'rgba(18,18,18,1)'
                        : 'rgba(255,255,255,1)',
                }}>
                    <Button 
                        fullWidth
                        size="large" 
                        variant="contained"
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #ff7043, #e64a19)',
                            boxShadow: '0 4px 15px rgba(255, 112, 67, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #e64a19, #d84315)',
                                boxShadow: '0 6px 20px rgba(255, 112, 67, 0.4)',
                                transform: 'translateY(-2px)',
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