import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Phone, MapPin, Clock, Star } from 'lucide-react';

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
  top: 80px;
  left: 0;
  width: 350px;
  height: calc(100vh - 80px);
  background: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.border};
  overflow-y: auto;
  z-index: ${theme.zIndex.sticky - 1};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

const HeroSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const RestaurantLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin: 0 auto ${theme.spacing.lg};
  border-radius: ${theme.borderRadius['2xl']};
  background: ${theme.gradients.primary};
  box-shadow: ${theme.shadows.lg};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${theme.borderRadius.xl};
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const LogoFallback = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.white};
`;

const RestaurantName = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text};
  text-align: center;
  margin: 0;
  line-height: 1.2;
`;

const RestaurantTagline = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textLight};
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.backgroundAlt};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateX(4px);
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  flex-shrink: 0;
`;

const ContactText = styled.div`
  flex: 1;
  
  a {
    color: ${theme.colors.textLight};
    text-decoration: none;
    font-weight: ${theme.fontWeights.medium};
    transition: ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const CategoriesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0;
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.primary};
`;

const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const CategoryItem = styled(motion.button)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${props => props.isActive 
    ? theme.colors.primary 
    : theme.colors.backgroundAlt
  };
  color: ${props => props.isActive 
    ? theme.colors.white 
    : theme.colors.text
  };
  border: 1px solid ${props => props.isActive 
    ? theme.colors.primary 
    : theme.colors.border
  };
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-align: left;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${props => props.isActive ? '0' : '-100%'};
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: ${theme.transitions.normal};
  }
  
  &:hover {
    transform: translateX(4px);
    box-shadow: ${theme.shadows.md};
    
    &::before {
      left: 100%;
    }
  }
`;

const CategoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.xl};
  flex-shrink: 0;
`;

const CategoryInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CategoryName = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  line-height: 1.2;
`;

const CategoryCount = styled.span`
  font-size: ${theme.fontSizes.sm};
  opacity: 0.8;
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.gradients.subtle};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.border};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`;

const StatLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  font-weight: ${theme.fontWeights.medium};
`;

const StatValue = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
`;

const Sidebar: React.FC<SidebarProps> = ({ 
  restaurantInfo, 
  categories, 
  activeCategory 
}) => {
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <SidebarContainer>
      <SidebarContent>
        <HeroSection
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <RestaurantLogo>
            {restaurantInfo.logo ? (
              <LogoImage 
                src={restaurantInfo.logo} 
                alt={restaurantInfo.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div style="font-size: 3rem; color: white;">🍽️</div>';
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
        </HeroSection>

        <ContactSection>
          {restaurantInfo.phone && (
            <ContactItem>
              <ContactIcon>
                <Phone size={18} />
              </ContactIcon>
              <ContactText>
                <a href={`tel:${restaurantInfo.phone.replace(/[^\d+]/g, '')}`}>
                  {restaurantInfo.phone}
                </a>
              </ContactText>
            </ContactItem>
          )}
          
          {restaurantInfo.address && (
            <ContactItem>
              <ContactIcon>
                <MapPin size={18} />
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
          )}
          
          <ContactItem>
            <ContactIcon>
              <Clock size={18} />
            </ContactIcon>
            <ContactText>
              <span>Open Daily: 11:00 AM - 11:00 PM</span>
            </ContactText>
          </ContactItem>
        </ContactSection>

        <StatsSection>
          <StatItem>
            <StatLabel>
              <Star size={16} />
              Total Items
            </StatLabel>
            <StatValue>{totalItems}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>
              📋 Categories
            </StatLabel>
            <StatValue>{categories.length}</StatValue>
          </StatItem>
        </StatsSection>

        <CategoriesSection>
          <SectionTitle>Menu Categories</SectionTitle>
          <CategoriesList>
            {categories.map((category, index) => (
              <CategoryItem
                key={category.id}
                isActive={activeCategory === category.id}
                onClick={() => scrollToCategory(category.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CategoryIcon>
                  {category.icon || '🍽️'}
                </CategoryIcon>
                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryCount>{category.items.length} items</CategoryCount>
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