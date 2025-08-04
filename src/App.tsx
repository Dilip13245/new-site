import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
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

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
  padding-top: 60px;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    margin-left: 0;
  }
`;

const MenuContainer = styled(motion.div)`
  padding: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

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

// Fallback menu data
const fallbackMenu: MenuCategory[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    icon: "🥗",
    items: [
      {
        id: "1",
        name: "Caesar Salad",
        price: "₹299",
        description: "Fresh romaine lettuce with caesar dressing",
        isVeg: true,
        isPopular: true,
        rating: 4.5,
        prepTime: "10 mins"
      },
      {
        id: "2",
        name: "Chicken Wings",
        price: "₹399",
        description: "Spicy buffalo wings with ranch dip",
        isVeg: false,
        rating: 4.3,
        prepTime: "15 mins"
      }
    ]
  },
  {
    id: "mains",
    name: "Main Course",
    icon: "🍽️",
    items: [
      {
        id: "3",
        name: "Grilled Chicken",
        price: "₹599",
        originalPrice: "₹699",
        description: "Perfectly grilled chicken with herbs",
        isVeg: false,
        isPopular: true,
        rating: 4.7,
        prepTime: "25 mins"
      },
      {
        id: "4",
        name: "Vegetable Pasta",
        price: "₹449",
        description: "Fresh pasta with seasonal vegetables",
        isVeg: true,
        rating: 4.2,
        prepTime: "20 mins"
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    items: [
      {
        id: "5",
        name: "Chocolate Cake",
        price: "₹249",
        description: "Rich chocolate cake with cream",
        isVeg: true,
        rating: 4.6,
        prepTime: "5 mins"
      }
    ]
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(fallbackRestaurantInfo);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Restaurant ID from configuration
  const RESTAURANT_ID = APP_CONFIG.RESTAURANT_ID;

  // Load data from Firebase with optimized loading
  useEffect(() => {
    const loadFirebaseData = async () => {
      // Start with fallback data immediately
      setMenu(fallbackMenu);
      setRestaurantInfo(fallbackRestaurantInfo);
      
      try {
        // Set a timeout for Firebase calls (5 seconds max)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 5000)
        );

        // Race Firebase calls against timeout
        const [categories, menuItems, restaurantData] = await Promise.race([
          Promise.all([
            fetchCategories(RESTAURANT_ID),
            fetchMenuItems(RESTAURANT_ID),
            fetchRestaurantInfo(RESTAURANT_ID)
          ]),
          timeoutPromise
        ]) as any;

        console.log('Firebase data loaded:', { categories: categories.length, menuItems: menuItems.length });

        // Transform Firebase data if available
        if (categories.length > 0 && menuItems.length > 0) {
          const transformedMenu = transformFirebaseDataToMenu(categories, menuItems);
          setMenu(transformedMenu);
          setDataLoaded(true);
          console.log('Firebase menu loaded successfully');
        } else {
          console.log('Using fallback menu data');
        }

        // Update restaurant info with Firebase data (keeping fallback name/taglines)
        setRestaurantInfo({
          name: fallbackRestaurantInfo.name,
          tagline: fallbackRestaurantInfo.tagline,
          tagline2: fallbackRestaurantInfo.tagline2,
          phone: (restaurantData?.phone) || fallbackRestaurantInfo.phone,
          address: (restaurantData?.address) || fallbackRestaurantInfo.address,
          logo: (restaurantData?.logo) || fallbackRestaurantInfo.logo,
          heroImage: (restaurantData?.heroImage) || fallbackRestaurantInfo.heroImage
        });

      } catch (error) {
        console.log('Using fallback data due to Firebase error:', error.message);
        // Fallback data is already set, no need to do anything
      } finally {
        // Remove artificial delay - load immediately
        setIsLoading(false);
      }
    };

    // Small delay to show loading spinner briefly
    setTimeout(() => {
      loadFirebaseData();
    }, 300);
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

      <AppContainer>
        <Header
          restaurantInfo={restaurantInfo}
          categories={menu}
          activeCategory={activeCategory}
        />

        <LayoutContainer>
          <Sidebar
            restaurantInfo={restaurantInfo}
            categories={menu}
            activeCategory={activeCategory}
          />

          <MainContent>
            <SearchSection
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />

            <MenuContainer
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
            </MenuContainer>

            <Footer restaurantInfo={restaurantInfo} />
          </MainContent>
        </LayoutContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;