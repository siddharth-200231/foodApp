import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={6}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(45, 45, 45, 0.95))',
          borderRadius: '20px',
          border: '1px solid rgba(252, 128, 25, 0.3)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 24px rgba(252, 128, 25, 0.2)',
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
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
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

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', mb: 6 }}>
          <Paper 
            elevation={3}
            sx={{
              p: 3,
              flex: '1 1 300px',
              background: 'rgba(252, 128, 25, 0.1)',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)' }
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
              p: 3,
              flex: '1 1 300px',
              background: 'rgba(252, 128, 25, 0.1)',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)' }
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
            p: 4,
            background: 'rgba(252, 128, 25, 0.05)',
            borderRadius: '12px',
          }}
        >
          <Typography variant="h5" sx={{ color: '#FC8019', mb: 3, textAlign: 'center' }}>
            Development Team
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 3,
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
                  p: 2,
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(252, 128, 25, 0.1)',
                  }
                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#FC8019', mb: 1 }}>
                  {member.role}
                </Typography>
                <Typography variant="body1">
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