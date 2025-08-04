import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import MenuCategory from './components/MenuCategory';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Firebase services
import {
  fetchCategories,
  fetchMenuItems,
  fetchRestaurantInfo,
  transformFirebaseDataToMenu
} from './firebase/firebaseService';
import { APP_CONFIG } from './config/app';

// Types
interface MenuItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image?: string;
  description?: string;
  isVeg: boolean;
  isPopular?: boolean;
  rating?: number;
  prepTime?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  description?: string;
  items: MenuItem[];
}

interface RestaurantInfo {
  name: string;
  tagline?: string;
  tagline2?: string;
  logo?: string;
  heroImage?: string;
  phone?: string;
  address?: string;
}

// Fallback restaurant info
const fallbackRestaurantInfo: RestaurantInfo = {
  name: "Testy sizzler",
  tagline: "Mexican restaurant",
  tagline2: "Mexican restaurant",
  logo: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200",
  heroImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
  phone: "+91 63765 35219",
  address: "Gujarat High Court, Vishwas City 1, Sola, Ahmedabad"
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(fallbackRestaurantInfo);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Restaurant ID from configuration
  const RESTAURANT_ID = APP_CONFIG.RESTAURANT_ID;

  // Load data from Firebase
  useEffect(() => {
    const loadFirebaseData = async () => {
      try {
        setIsLoading(true);

        // Fetch data from Firebase
        const [categories, menuItems, restaurantData] = await Promise.all([
          fetchCategories(RESTAURANT_ID),
          fetchMenuItems(RESTAURANT_ID),
          fetchRestaurantInfo(RESTAURANT_ID)
        ]);

        console.log('Firebase restaurant data:', restaurantData);

        // Transform Firebase data to match our structure
        if (categories.length > 0 && menuItems.length > 0) {
          const transformedMenu = transformFirebaseDataToMenu(categories, menuItems);
          setMenu(transformedMenu);
          setDataLoaded(true);
        }

        // FORCE USE FALLBACK DATA FOR NAME AND TAGLINES
        // This ensures your new restaurant name and taglines are always used
        setRestaurantInfo({
          name: fallbackRestaurantInfo.name, // Always use "Testy sizzler"
          tagline: fallbackRestaurantInfo.tagline, // Always use "Mexican restaurant"
          tagline2: fallbackRestaurantInfo.tagline2, // Always use "Mexican restaurant"
          phone: (restaurantData?.phone) || fallbackRestaurantInfo.phone,
          address: (restaurantData?.address) || fallbackRestaurantInfo.address,
          logo: (restaurantData?.logo) || fallbackRestaurantInfo.logo,
          heroImage: (restaurantData?.heroImage) || fallbackRestaurantInfo.heroImage
        });

      } catch (error) {
        console.error('Error loading Firebase data:', error);
        // Keep fallback data if Firebase fails
        setRestaurantInfo(fallbackRestaurantInfo);
      } finally {
        // Simulate loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    loadFirebaseData();
  }, [RESTAURANT_ID]);

  // Filter menu based on search query
  const filteredMenu = useMemo(() => {
    if (!searchQuery.trim()) {
      return menu;
    }

    const query = searchQuery.toLowerCase().trim();
    return menu.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      )
    })).filter(category => category.items.length > 0);
  }, [menu, searchQuery]);

  // Handle scroll-based active category detection
  useEffect(() => {
    if (searchQuery) return;

    const handleScroll = () => {
      const categories = document.querySelectorAll('.category-section');
      const scrollPosition = window.scrollY + 200;

      categories.forEach((category) => {
        const categoryElement = category as HTMLElement;
        const categoryTop = categoryElement.offsetTop;
        const categoryBottom = categoryTop + categoryElement.offsetHeight;

        if (scrollPosition >= categoryTop && scrollPosition < categoryBottom) {
          setActiveCategory(categoryElement.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('');
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoadingSpinner restaurantName={restaurantInfo.name} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <div className="app">
        <Header
          restaurantInfo={restaurantInfo}
          categories={menu}
          activeCategory={activeCategory}
        />

        <main>
          <HeroSection restaurantInfo={restaurantInfo} />

          <SearchSection
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />

          <motion.div
            className="menu-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {filteredMenu.map((category, index) => (
                category.items.length > 0 && (
                  <MenuCategory
                    key={`${category.id}-${searchQuery}`}
                    category={category}
                    animationDelay={index * 0.1}
                  />
                )
              ))}
            </AnimatePresence>

            {filteredMenu.length === 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: 'center',
                  padding: '4rem 1rem',
                  color: theme.colors.textMuted
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3>No items found</h3>
                <p>No dishes match "{searchQuery}". Try a different search term.</p>
              </motion.div>
            )}
          </motion.div>
        </main>

        <Footer restaurantInfo={restaurantInfo} />
      </div>
    </ThemeProvider>
  );
}

export default App;