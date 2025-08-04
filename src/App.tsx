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

// Real menu data
const fallbackMenu: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters & Appetizers",
    icon: "🥗",
    items: [
      {
        id: "1",
        name: "Paneer Tikka",
        price: "₹280",
        description: "Marinated cottage cheese cubes grilled to perfection with bell peppers and onions",
        isVeg: true,
        isPopular: true,
        rating: 4.5,
        prepTime: "15 mins"
      },
      {
        id: "2",
        name: "Chicken Tikka",
        price: "₹320",
        description: "Tender chicken pieces marinated in yogurt and spices, grilled in tandoor",
        isVeg: false,
        isPopular: true,
        rating: 4.7,
        prepTime: "18 mins"
      },
      {
        id: "3",
        name: "Veg Spring Rolls",
        price: "₹180",
        description: "Crispy rolls filled with fresh vegetables and served with sweet chili sauce",
        isVeg: true,
        rating: 4.2,
        prepTime: "12 mins"
      },
      {
        id: "4",
        name: "Fish Amritsari",
        price: "₹380",
        description: "Batter fried fish pieces with traditional Punjabi spices",
        isVeg: false,
        rating: 4.4,
        prepTime: "20 mins"
      },
      {
        id: "5",
        name: "Mushroom 65",
        price: "₹240",
        description: "Spicy and tangy mushroom appetizer with curry leaves and green chilies",
        isVeg: true,
        rating: 4.3,
        prepTime: "14 mins"
      }
    ]
  },
  {
    id: "mains",
    name: "Main Course",
    icon: "🍛",
    items: [
      {
        id: "6",
        name: "Butter Chicken",
        price: "₹420",
        description: "Tender chicken in rich tomato and butter gravy with aromatic spices",
        isVeg: false,
        isPopular: true,
        rating: 4.8,
        prepTime: "25 mins"
      },
      {
        id: "7",
        name: "Paneer Butter Masala",
        price: "₹360",
        description: "Cottage cheese cubes in creamy tomato-based gravy with butter and cream",
        isVeg: true,
        isPopular: true,
        rating: 4.6,
        prepTime: "20 mins"
      },
      {
        id: "8",
        name: "Dal Makhani",
        price: "₹280",
        description: "Slow-cooked black lentils with butter, cream and aromatic spices",
        isVeg: true,
        rating: 4.5,
        prepTime: "30 mins"
      },
      {
        id: "9",
        name: "Chicken Biryani",
        price: "₹450",
        originalPrice: "₹520",
        description: "Fragrant basmati rice layered with spiced chicken and cooked in dum style",
        isVeg: false,
        isPopular: true,
        rating: 4.7,
        prepTime: "35 mins"
      },
      {
        id: "10",
        name: "Veg Biryani",
        price: "₹380",
        description: "Aromatic basmati rice with mixed vegetables and traditional spices",
        isVeg: true,
        rating: 4.4,
        prepTime: "30 mins"
      },
      {
        id: "11",
        name: "Mutton Rogan Josh",
        price: "₹520",
        description: "Tender mutton pieces in rich Kashmiri-style curry with yogurt and spices",
        isVeg: false,
        rating: 4.6,
        prepTime: "40 mins"
      }
    ]
  },
  {
    id: "breads",
    name: "Breads & Rice",
    icon: "🍞",
    items: [
      {
        id: "12",
        name: "Butter Naan",
        price: "₹60",
        description: "Soft leavened bread brushed with butter and baked in tandoor",
        isVeg: true,
        rating: 4.5,
        prepTime: "8 mins"
      },
      {
        id: "13",
        name: "Garlic Naan",
        price: "₹80",
        description: "Naan bread topped with fresh garlic and coriander",
        isVeg: true,
        isPopular: true,
        rating: 4.6,
        prepTime: "10 mins"
      },
      {
        id: "14",
        name: "Tandoori Roti",
        price: "₹40",
        description: "Whole wheat bread cooked in tandoor oven",
        isVeg: true,
        rating: 4.3,
        prepTime: "6 mins"
      },
      {
        id: "15",
        name: "Jeera Rice",
        price: "₹180",
        description: "Basmati rice tempered with cumin seeds and whole spices",
        isVeg: true,
        rating: 4.2,
        prepTime: "15 mins"
      },
      {
        id: "16",
        name: "Kashmiri Pulao",
        price: "₹220",
        description: "Fragrant rice with dry fruits, nuts and saffron",
        isVeg: true,
        rating: 4.4,
        prepTime: "20 mins"
      }
    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "🥤",
    items: [
      {
        id: "17",
        name: "Fresh Lime Soda",
        price: "₹80",
        description: "Refreshing lime juice with soda water and mint",
        isVeg: true,
        rating: 4.3,
        prepTime: "5 mins"
      },
      {
        id: "18",
        name: "Mango Lassi",
        price: "₹120",
        description: "Creamy yogurt drink blended with fresh mango pulp",
        isVeg: true,
        isPopular: true,
        rating: 4.6,
        prepTime: "5 mins"
      },
      {
        id: "19",
        name: "Masala Chai",
        price: "₹40",
        description: "Traditional Indian tea brewed with aromatic spices",
        isVeg: true,
        rating: 4.4,
        prepTime: "8 mins"
      },
      {
        id: "20",
        name: "Fresh Coconut Water",
        price: "₹60",
        description: "Natural tender coconut water served fresh",
        isVeg: true,
        rating: 4.2,
        prepTime: "2 mins"
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    items: [
      {
        id: "21",
        name: "Gulab Jamun",
        price: "₹120",
        description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
        isVeg: true,
        isPopular: true,
        rating: 4.7,
        prepTime: "5 mins"
      },
      {
        id: "22",
        name: "Ras Malai",
        price: "₹140",
        description: "Cottage cheese dumplings in sweetened milk with cardamom and pistachios",
        isVeg: true,
        rating: 4.5,
        prepTime: "5 mins"
      },
      {
        id: "23",
        name: "Kulfi",
        price: "₹100",
        description: "Traditional Indian ice cream with cardamom and pistachios",
        isVeg: true,
        rating: 4.4,
        prepTime: "3 mins"
      },
      {
        id: "24",
        name: "Chocolate Brownie",
        price: "₹180",
        originalPrice: "₹220",
        description: "Warm chocolate brownie served with vanilla ice cream",
        isVeg: true,
        rating: 4.6,
        prepTime: "8 mins"
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