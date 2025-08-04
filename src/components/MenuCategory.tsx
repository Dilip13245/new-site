import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
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
  margin-bottom: ${theme.spacing['3xl']};
  scroll-margin-top: 100px;
`;

const CategoryHeader = styled(motion.div)`
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} 0;
  border-bottom: 1px solid ${theme.colors.border};
  position: sticky;
  top: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 10;
`;

const CategoryTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.1;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const CategoryDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textLight};
  margin: ${theme.spacing.md} 0 0 0;
  line-height: 1.5;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.border};
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
  if (category.items.length === 0) {
    return (
      <CategorySection id={category.id} className="category-section">
        <CategoryHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: animationDelay }}
        >
          <CategoryTitle>{category.name}</CategoryTitle>
          {category.description && (
            <CategoryDescription>{category.description}</CategoryDescription>
          )}
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
      </CategorySection>
    );
  }

  return (
    <CategorySection id={category.id} className="category-section">
      <CategoryHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: animationDelay }}
      >
        <CategoryTitle>{category.name}</CategoryTitle>
        {category.description && (
          <CategoryDescription>{category.description}</CategoryDescription>
        )}
      </CategoryHeader>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: animationDelay + 0.2 }}
      >
        <ItemsList>
          {category.items.map((item, index) => (
            <MenuItemCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </ItemsList>
      </motion.div>
    </CategorySection>
  );
};

export default MenuCategory;