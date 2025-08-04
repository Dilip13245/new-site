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
  margin-bottom: ${theme.spacing['2xl']};
  scroll-margin-top: 80px;
`;

const CategoryHeader = styled(motion.div)`
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};
  position: sticky;
  top: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 10;
`;

const CategoryTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const CategoryIcon = styled.span`
  font-size: ${theme.fontSizes.lg};
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  background: ${theme.colors.backgroundAlt};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`;

const EmptyIcon = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.md};
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, animationDelay = 0 }) => {
  if (category.items.length === 0) {
    return (
      <CategorySection id={category.id} className="category-section">
        <CategoryHeader
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: animationDelay }}
        >
          <CategoryTitle>
            <CategoryIcon>{category.icon || '🍽️'}</CategoryIcon>
            {category.name}
          </CategoryTitle>
        </CategoryHeader>

        <EmptyState
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: animationDelay + 0.1 }}
        >
          <EmptyIcon>🍽️</EmptyIcon>
          <EmptyText>No items available</EmptyText>
        </EmptyState>
      </CategorySection>
    );
  }

  return (
    <CategorySection id={category.id} className="category-section">
      <CategoryHeader
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: animationDelay }}
      >
        <CategoryTitle>
          <CategoryIcon>{category.icon || '🍽️'}</CategoryIcon>
          {category.name}
        </CategoryTitle>
      </CategoryHeader>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: animationDelay + 0.1 }}
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