import "./App.css";
import React, { useState, useMemo, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProduct from "./components/UpdateProduct";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { SnackbarProvider } from 'notistack';
import './styles/global.css';
import About from './components/About';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useMemo(() => getTheme('dark'), []);

  useEffect(() => {
    document.body.className = 'dark-theme';
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="dark-theme">
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CssBaseline />
          <BrowserRouter>
            <Navbar 
              onSelectCategory={handleCategorySelect} 
              onSelectRestaurant={handleRestaurantSelect} 
              onSearch={setSearchQuery}
              isDarkMode={true}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home 
                    selectedCategory={selectedCategory} 
                    selectedRestaurant={selectedRestaurant} 
                    searchQuery={searchQuery} 
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add_product" element={<AddProduct />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/update/:id" element={<UpdateProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
