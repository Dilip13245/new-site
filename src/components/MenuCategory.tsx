import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import MenuItemCard from './MenuItemCard';

interface MenuCategoryProps {
  category: {
    id: string;
    name: string;
    icon?: string;
    image?: string;
    description?: string;
    items: Array<{
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
    }>;
  };
  animationDelay?: number;
}

const CategorySection = styled.section`
  margin-bottom: ${theme.spacing['4xl']};
`;

const CategoryHeader = styled(motion.div)`
  background: linear-gradient(135deg, ${theme.colors.surface} 0%, ${theme.colors.backgroundAlt} 100%);
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.border};
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${theme.gradients.primary};
  }
`;

const CategoryHeaderContent = styled(Container)`
  padding: ${theme.spacing['2xl']};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
    gap: ${theme.spacing.lg};
    flex-direction: column;
    text-align: center;
  }
`;

const CategoryIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 80px;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.xl};
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
    transition: ${theme.transitions.slow};
  }
  
  &:hover::before {
    animation: shimmer 1.5s ease-in-out;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
`;

const CategoryImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: ${theme.borderRadius.lg};
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const CategoryIcon = styled.span`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.white};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const CategoryInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const CategoryTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const CategoryDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textLight};
  margin: 0;
  line-height: 1.5;
`;

const CategoryStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.surface};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.textLight};
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.sm};
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  margin: ${theme.spacing.xl} 0;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.sm};
`;

const EmptyIcon = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.textLight};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const EmptyText = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, animationDelay = 0 }) => {
  const vegCount = category.items.filter(item => item.isVeg).length;
  const nonVegCount = category.items.filter(item => !item.isVeg).length;
  const popularCount = category.items.filter(item => item.isPopular).length;

  // Function to render category icon or image
  const renderCategoryIcon = () => {
    // Check if category has a valid image URL
    if (category.image && category.image.trim() !== '' && category.image !== 'undefined') {
      return (
        <CategoryImage 
          src={category.image} 
          alt={category.name}
          onError={(e) => {
            // If image fails to load, hide it and show emoji icon instead
            e.currentTarget.style.display = 'none';
            const iconElement = e.currentTarget.nextElementSibling as HTMLElement;
            if (iconElement) {
              iconElement.style.display = 'block';
            }
          }}
        />
      );
    }
    
    // Fallback to emoji icon
    return (
      <CategoryIcon>
        {category.icon || '🍽️'}
      </CategoryIcon>
    );
  };

  if (category.items.length === 0) {
    return (
      <CategorySection id={category.id} className="category-section">
        <Container>
          <CategoryHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: animationDelay }}
          >
            <CategoryHeaderContent>
              <CategoryIconContainer>
                {renderCategoryIcon()}
              </CategoryIconContainer>
              <CategoryInfo>
                <CategoryTitle>{category.name}</CategoryTitle>
                {category.description && (
                  <CategoryDescription>{category.description}</CategoryDescription>
                )}
                <CategoryStats>
                  <StatBadge>
                    <span>📋</span>
                    <span>0 items</span>
                  </StatBadge>
                </CategoryStats>
              </CategoryInfo>
            </CategoryHeaderContent>
          </CategoryHeader>

          <EmptyState
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
          >
            <EmptyIcon>🍽️</EmptyIcon>
            <EmptyTitle>Coming Soon</EmptyTitle>
            <EmptyText>No items available in this category yet</EmptyText>
          </EmptyState>
        </Container>
      </CategorySection>
    );
  }

  return (
    <CategorySection id={category.id} className="category-section">
      <Container>
        <CategoryHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: animationDelay }}
        >
          <CategoryHeaderContent>
            <CategoryIconContainer>
              {renderCategoryIcon()}
              {/* Hidden emoji icon as fallback */}
              {category.image && category.image.trim() !== '' && category.image !== 'undefined' && (
                <CategoryIcon style={{ display: 'none' }}>
                  {category.icon || '🍽️'}
                </CategoryIcon>
              )}
            </CategoryIconContainer>
            <CategoryInfo>
              <CategoryTitle>{category.name}</CategoryTitle>
              {category.description && (
                <CategoryDescription>{category.description}</CategoryDescription>
              )}
              <CategoryStats>
                <StatBadge>
                  <span>📋</span>
                  <span>{category.items.length} items</span>
                </StatBadge>
                
                {vegCount > 0 && (
                  <StatBadge>
                    <span>🥬</span>
                    <span>{vegCount} veg</span>
                  </StatBadge>
                )}
                
                {nonVegCount > 0 && (
                  <StatBadge>
                    <span>🍖</span>
                    <span>{nonVegCount} non-veg</span>
                  </StatBadge>
                )}
                
                {popularCount > 0 && (
                  <StatBadge>
                    <span>⭐</span>
                    <span>{popularCount} popular</span>
                  </StatBadge>
                )}
              </CategoryStats>
            </CategoryInfo>
          </CategoryHeaderContent>
        </CategoryHeader>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: animationDelay + 0.3 }}
        >
          <ItemsGrid>
            {category.items.map((item, index) => (
              <MenuItemCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </ItemsGrid>
        </motion.div>
      </Container>
    </CategorySection>
  );
};

export default MenuCategory;