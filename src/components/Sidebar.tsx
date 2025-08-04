import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Phone, MapPin, Clock } from 'lucide-react';

interface SidebarProps {
  restaurantInfo: {
    name: string;
    tagline?: string;
    tagline2?: string;
    logo?: string;
    phone?: string;
    address?: string;
  };
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
    items: any[];
  }>;
  activeCategory: string;
}

const SidebarContainer = styled.aside`
  position: fixed;
  top: 60px;
  left: 0;
  width: 280px;
  height: calc(100vh - 60px);
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.sidebar};
  overflow-y: auto;
  z-index: ${theme.zIndex.sticky - 1};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const RestaurantSection = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.card};
  margin-bottom: ${theme.spacing.md};
`;

const RestaurantLogo = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${theme.spacing.md};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.button};
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.lg};
  object-fit: cover;
`;

const LogoFallback = styled.div`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.white};
`;

const RestaurantName = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const RestaurantTagline = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  transition: ${theme.transitions.fast};
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-1px);
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm};
  flex-shrink: 0;
  box-shadow: ${theme.shadows.sm};
`;

const ContactText = styled.div`
  flex: 1;
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.textLight};
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const CategoriesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0;
  padding: ${theme.spacing.sm} 0;
`;

const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CategoryItem = styled(motion.button)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => props.isActive 
    ? theme.colors.primary 
    : theme.colors.surface
  };
  color: ${props => props.isActive 
    ? theme.colors.white 
    : theme.colors.text
  };
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-align: left;
  width: 100%;
  font-size: ${theme.fontSizes.sm};
  box-shadow: ${props => props.isActive 
    ? theme.shadows.button 
    : theme.shadows.sm
  };
  
  &:hover {
    box-shadow: ${props => props.isActive 
      ? theme.shadows.buttonHover 
      : theme.shadows.md
    };
    transform: translateY(-1px);
  }
`;

const CategoryIcon = styled.div`
  font-size: ${theme.fontSizes.base};
  width: 20px;
  text-align: center;
  flex-shrink: 0;
`;

const CategoryInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryName = styled.span`
  font-weight: ${theme.fontWeights.medium};
`;

const CategoryCount = styled.span`
  font-size: ${theme.fontSizes.xs};
  opacity: 0.7;
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
`;

const Sidebar: React.FC<SidebarProps> = ({ 
  restaurantInfo, 
  categories, 
  activeCategory 
}) => {
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 60;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SidebarContainer>
      <SidebarContent>
        <RestaurantSection
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RestaurantLogo>
            {restaurantInfo.logo ? (
              <LogoImage 
                src={restaurantInfo.logo} 
                alt={restaurantInfo.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div style="font-size: 1.25rem; color: white;">🍽️</div>';
                }}
              />
            ) : (
              <LogoFallback>🍽️</LogoFallback>
            )}
          </RestaurantLogo>
          
          <RestaurantName>{restaurantInfo.name}</RestaurantName>
          {restaurantInfo.tagline && (
            <RestaurantTagline>{restaurantInfo.tagline}</RestaurantTagline>
          )}
        </RestaurantSection>

        <ContactSection>
          {restaurantInfo.phone && (
            <ContactItem>
              <ContactIcon>
                <Phone size={12} />
              </ContactIcon>
              <ContactText>
                <a href={`tel:${restaurantInfo.phone.replace(/[^\d+]/g, '')}`}>
                  {restaurantInfo.phone}
                </a>
              </ContactText>
            </ContactItem>
          )}
          
          <ContactItem>
            <ContactIcon>
              <MapPin size={12} />
            </ContactIcon>
            <ContactText>
              <a 
                href="https://maps.app.goo.gl/vztXTynWqZ7C1nbx7"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Location
              </a>
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <ContactIcon>
              <Clock size={12} />
            </ContactIcon>
            <ContactText>
              <span>11:00 AM - 11:00 PM</span>
            </ContactText>
          </ContactItem>
        </ContactSection>

        <CategoriesSection>
          <SectionTitle>Categories</SectionTitle>
          <CategoriesList>
            {categories.map((category, index) => (
              <CategoryItem
                key={category.id}
                isActive={activeCategory === category.id}
                onClick={() => scrollToCategory(category.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CategoryIcon>
                  {category.icon || '🍽️'}
                </CategoryIcon>
                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryCount>{category.items.length}</CategoryCount>
                </CategoryInfo>
              </CategoryItem>
            ))}
          </CategoriesList>
        </CategoriesSection>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;