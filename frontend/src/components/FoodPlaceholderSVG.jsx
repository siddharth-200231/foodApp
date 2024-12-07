import React from 'react';

const FoodPlaceholderSVG = () => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    {/* Plate */}
    <circle cx="120" cy="120" r="100" fill="#F5F5F5" />
    <circle cx="120" cy="120" r="90" fill="#E0E0E0" />
    
    {/* Rice/Base */}
    <ellipse cx="120" cy="130" rx="60" ry="30" fill="#FFFFFF" />
    
    {/* Main dish elements */}
    <path 
      d="M80 110c20-15 60-15 80 0c-5 25-75 25-80 0z" 
      fill="#FF9800"
    />
    <path 
      d="M90 105c15-10 45-10 60 0c-5 15-55 15-60 0z" 
      fill="#F57C00"
    />
    
    {/* Vegetables */}
    <circle cx="95" cy="100" r="8" fill="#4CAF50" />
    <circle cx="145" cy="100" r="8" fill="#4CAF50" />
    <circle cx="120" cy="95" r="6" fill="#81C784" />
    
    {/* Garnish */}
    <path 
      d="M100 85c5-3 35-3 40 0c-5 3-35 3-40 0z" 
      fill="#A5D6A7"
    />
    
    {/* Steam effect */}
    <path 
      d="M110 70q5-10 10 0t10 0t10 0" 
      stroke="#BDBDBD" 
      strokeWidth="2" 
      fill="none"
    />
  </svg>
);

export default FoodPlaceholderSVG; 