import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Star, Clock } from 'lucide-react';

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
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  transition: ${theme.transitions.fast};
  box-shadow: ${theme.shadows.card};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.cardHover};
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  background: ${theme.colors.backgroundLight};
  box-shadow: ${theme.shadows.sm};
`;

const ItemImage = styled.div<{ backgroundImage?: string }>`
  width: 100%;
  height: 100%;
  background: ${props => props.backgroundImage 
    ? `url(${props.backgroundImage})` 
    : theme.colors.backgroundLight};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textMuted};
`;

const VegBadge = styled.div<{ isVeg: boolean }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.isVeg ? theme.colors.success : theme.colors.error};
  background: ${theme.colors.white};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.sm};
  
  &::after {
    content: '';
    width: 6px;
    height: 6px;
    background: ${props => props.isVeg ? theme.colors.success : theme.colors.error};
    border-radius: 50%;
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${theme.colors.warning};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xs};
  padding: 2px 4px;
  border-radius: ${theme.borderRadius.sm};
  font-weight: ${theme.fontWeights.bold};
  box-shadow: ${theme.shadows.sm};
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;
`;

const ItemHeader = styled.div`
  margin-bottom: ${theme.spacing.xs};
`;

const ItemName = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.xs} 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemDescription = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.xs} 0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  background: ${theme.colors.backgroundAlt};
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  box-shadow: ${theme.shadows.sm};
  
  svg {
    color: ${theme.colors.primary};
  }
`;

const ItemFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  background: ${theme.colors.backgroundAlt};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

const ItemPrice = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
`;

const ItemOriginalPrice = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  text-decoration: line-through;
`;

const MenuItemCard: React.FC<MenuItemProps> = ({ item, index }) => {
  return (
    <ItemContainer
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: 'easeOut'
      }}
    >
      <ItemImageContainer>
        <ItemImage backgroundImage={item.image}>
          {!item.image && '🍽️'}
        </ItemImage>
        
        <VegBadge isVeg={item.isVeg} />
        {item.isPopular && <PopularBadge>★</PopularBadge>}
      </ItemImageContainer>

      <ItemContent>
        <ItemHeader>
          <ItemName>{item.name}</ItemName>
          {item.description && (
            <ItemDescription>{item.description}</ItemDescription>
          )}
        </ItemHeader>

        {(item.rating || item.prepTime) && (
          <ItemMeta>
            {item.rating && (
              <MetaItem>
                <Star size={12} fill="currentColor" />
                <span>{item.rating}</span>
              </MetaItem>
            )}
            {item.prepTime && (
              <MetaItem>
                <Clock size={12} />
                <span>{item.prepTime}</span>
              </MetaItem>
            )}
          </ItemMeta>
        )}

        <ItemFooter>
          <PriceSection>
            <ItemPrice>{item.price}</ItemPrice>
            {item.originalPrice && (
              <ItemOriginalPrice>{item.originalPrice}</ItemOriginalPrice>
            )}
          </PriceSection>
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
};

export default MenuItemCard;