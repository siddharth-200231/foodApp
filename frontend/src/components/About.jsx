import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  // Updated color scheme with more vibrant colors
  const developerColors = {
    'Atul Kumar Das': '#FF3366',      // Vibrant Pink
    'Ojashwee Udgata': '#00E5FF',     // Electric Blue
    'Tanmay Kumar Parida': '#7CFF3F',  // Neon Green
    'Swastik Magraj': '#FF9100'       // Bright Orange
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={6}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.97), rgba(30, 30, 30, 0.97))',
          borderRadius: '30px',
          border: '2px solid rgba(252, 128, 25, 0.5)',
          boxShadow: '0 8px 32px rgba(252, 128, 25, 0.2), 0 16px 48px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 12px 36px rgba(252, 128, 25, 0.25), 0 20px 60px rgba(0, 0, 0, 0.35)',
          },
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#FC8019',
            textAlign: 'center',
            fontWeight: '900',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: '1px',
          }}
        >
          About Xwiggy
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.primary',
            textAlign: 'center',
            mb: 6,
            opacity: 0.9 
          }}
        >
          A modern food delivery platform built with cutting-edge technologies
        </Typography>

        <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', mb: 8 }}>
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              flex: '1 1 300px',
              background: 'rgba(252, 128, 25, 0.15)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.4s ease',
              border: '1px solid rgba(252, 128, 25, 0.3)',
              '&:hover': { 
                transform: 'translateY(-8px)',
                boxShadow: '0 15px 30px rgba(252, 128, 25, 0.25)',
                background: 'rgba(252, 128, 25, 0.2)',
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#FC8019', mb: 2 }}>Frontend Stack</Typography>
            <Box component="ul" sx={{ color: 'text.primary', pl: 2 }}>
              {['React.js', 'Material-UI', 'Axios', 'React Router', 'Vite', 'Notistack'].map((tech) => (
                <Typography component="li" key={tech} sx={{ mb: 1 }}>
                  {tech}
                </Typography>
              ))}
            </Box>
          </Paper>

          <Paper 
            elevation={3}
            sx={{
              p: 4,
              flex: '1 1 300px',
              background: 'rgba(252, 128, 25, 0.15)',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 20px rgba(252, 128, 25, 0.2)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#FC8019', mb: 2 }}>Backend Stack</Typography>
            <Box component="ul" sx={{ color: 'text.primary', pl: 2 }}>
              {['Spring Boot', 'Spring Security', 'JWT', 'JPA/Hibernate', 'H2 Database'].map((tech) => (
                <Typography component="li" key={tech} sx={{ mb: 1 }}>
                  {tech}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>

        <Paper 
          elevation={3}
          sx={{
            p: 6,
            background: 'rgba(252, 128, 25, 0.1)',
            borderRadius: '24px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(252, 128, 25, 0.2)',
          }}
        >
          <Typography variant="h5" sx={{ 
            color: '#FC8019', 
            mb: 5, 
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '900',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
            letterSpacing: '1px',
          }}>
            Development Team
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 5,
            color: 'text.primary' 
          }}>
            {[
              { role: 'Frontend Developer', name: 'Atul Kumar Das' },
              { role: 'Backend Developer', name: 'Ojashwee Udgata' },
              { role: 'Associate Developer', name: 'Tanmay Kumar Parida' },
              { role: 'Associate Developer', name: 'Swastik Magraj' }
            ].map((member) => (
              <Box 
                key={member.name}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: '16px',
                  background: `linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03))`,
                  border: `2px solid ${developerColors[member.name]}50`,
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(145deg, ${developerColors[member.name]}10, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.03)',
                    boxShadow: `0 15px 30px ${developerColors[member.name]}30`,
                    '&:before': {
                      opacity: 1,
                    }
                  }
                }}
              >
                <Typography variant="subtitle1" sx={{ 
                  color: developerColors[member.name],
                  mb: 2,
                  fontSize: '1.4rem',
                  fontWeight: '900',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '0.5px',
                }}>
                  {member.role}
                </Typography>
                <Typography variant="body1" sx={{
                  fontSize: '1.2rem',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: '500',
                }}>
                  {member.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Paper>
    </Container>
  );
};

export default About; 