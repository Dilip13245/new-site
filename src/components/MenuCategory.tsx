import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import MenuItemCard from './MenuItemCard';
import { Utensils, Leaf, Flame, Star, TrendingUp } from 'lucide-react';

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
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius['2xl']};
  margin-bottom: ${theme.spacing['2xl']};
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.gradients.primary};
  }
`;

const CategoryHeaderContent = styled(Container)`
  padding: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.md};
  }
`;

const CategoryIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.xl};
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: ${theme.transitions.slow};
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
`;

const CategoryIcon = styled.span`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.white};
`;

const CategoryInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const CategoryTitle = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.black};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.1;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const CategoryDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textLight};
  margin: 0;
  line-height: 1.5;
`;

const CategoryStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.textLight};
  transition: ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }
`;

const StatIcon = styled.div<{ color: string }>`
  color: ${props => props.color};
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius['2xl']};
  margin: ${theme.spacing.xl} 0;
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
            // If image fails to load, show emoji icon instead
            const target = e.currentTarget;
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span style="font-size: ${theme.fontSizes['2xl']}; color: ${theme.colors.white};">${category.icon || '🍽️'}</span>`;
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
                  <StatCard>
                    <StatIcon color={theme.colors.textMuted}>
                      <Utensils size={16} />
                    </StatIcon>
                    <span>0 items</span>
                  </StatCard>
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
            </CategoryIconContainer>
            <CategoryInfo>
              <CategoryTitle>{category.name}</CategoryTitle>
              {category.description && (
                <CategoryDescription>{category.description}</CategoryDescription>
              )}
              <CategoryStats>
                <StatCard>
                  <StatIcon color={theme.colors.primary}>
                    <Utensils size={16} />
                  </StatIcon>
                  <span>{category.items.length} items</span>
                </StatCard>
                
                {vegCount > 0 && (
                  <StatCard>
                    <StatIcon color={theme.colors.success}>
                      <Leaf size={16} />
                    </StatIcon>
                    <span>{vegCount} veg</span>
                  </StatCard>
                )}
                
                {nonVegCount > 0 && (
                  <StatCard>
                    <StatIcon color={theme.colors.error}>
                      <Flame size={16} />
                    </StatIcon>
                    <span>{nonVegCount} non-veg</span>
                  </StatCard>
                )}
                
                {popularCount > 0 && (
                  <StatCard>
                    <StatIcon color={theme.colors.secondary}>
                      <TrendingUp size={16} />
                    </StatIcon>
                    <span>{popularCount} popular</span>
                  </StatCard>
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