import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

interface MenuItemProps {
  item: {
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
  };
  index: number;
}

const ItemContainer = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  transition: ${theme.transitions.normal};
  position: relative;
  border-bottom: 1px solid ${theme.colors.border};
  
  &:hover {
    background: ${theme.colors.backgroundAlt};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.sm};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div<{ backgroundImage?: string }>`
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.backgroundImage 
    ? `url(${props.backgroundImage})` 
    : theme.colors.backgroundLight};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.textMuted};
  border: 1px solid ${theme.colors.border};
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xs};
`;

const ItemName = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.3;
  flex: 1;
`;

const ItemBadges = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  flex-shrink: 0;
`;

const VegBadge = styled.div<{ isVeg: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.isVeg ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 2px;
  background: ${theme.colors.surface};
  
  &::after {
    content: '';
    width: 6px;
    height: 6px;
    background: ${props => props.isVeg ? theme.colors.success : theme.colors.error};
    border-radius: 50%;
  }
`;

const PopularBadge = styled.span`
  background: ${theme.colors.warning};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xs};
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ItemDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  line-height: 1.5;
  margin: 0 0 ${theme.spacing.sm} 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
`;

const ItemRating = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  background: rgba(255, 193, 7, 0.1);
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid rgba(255, 193, 7, 0.2);
`;

const ItemPrepTime = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  background: rgba(56, 161, 105, 0.1);
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid rgba(56, 161, 105, 0.2);
`;

const ItemPricing = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-direction: column;
  align-items: flex-end;
`;

const ItemPrice = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary};
`;

const ItemOriginalPrice = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  text-decoration: line-through;
  font-weight: ${theme.fontWeights.normal};
`;

const MenuItemCard: React.FC<MenuItemProps> = ({ item, index }) => {
  return (
    <ItemContainer
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: 'easeOut'
      }}
    >
      <ItemImage backgroundImage={item.image}>
        {!item.image && '🍽️'}
      </ItemImage>

      <ItemContent>
        <div>
          <ItemHeader>
            <ItemName>{item.name}</ItemName>
            <ItemBadges>
              <VegBadge isVeg={item.isVeg} />
              {item.isPopular && <PopularBadge>★</PopularBadge>}
            </ItemBadges>
          </ItemHeader>

          {item.description && (
            <ItemDescription>{item.description}</ItemDescription>
          )}
        </div>

        <ItemFooter>
          <ItemMeta>
            {item.rating && (
              <ItemRating>
                <span>⭐</span>
                <span>{item.rating}</span>
              </ItemRating>
            )}
            {item.prepTime && (
              <ItemPrepTime>
                <span>🕐</span>
                <span>{item.prepTime}</span>
              </ItemPrepTime>
            )}
          </ItemMeta>

          <ItemPricing>
            <ItemPrice>{item.price}</ItemPrice>
            {item.originalPrice && (
              <ItemOriginalPrice>{item.originalPrice}</ItemOriginalPrice>
            )}
          </ItemPricing>
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
};

export default MenuItemCard;