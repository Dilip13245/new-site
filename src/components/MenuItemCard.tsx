import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Star, Clock, Leaf, Flame, ShoppingCart, Heart } from 'lucide-react';

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
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  transition: ${theme.transitions.normal};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.gradients.primary};
    opacity: 0;
    transition: ${theme.transitions.normal};
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.cardHover};
    border-color: ${theme.colors.primary};
    
    &::before {
      opacity: 0.05;
    }
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  margin-bottom: ${theme.spacing.lg};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(10px);
`;

const ItemImage = styled.div<{ backgroundImage?: string }>`
  width: 100%;
  height: 100%;
  background: ${props => props.backgroundImage 
    ? `url(${props.backgroundImage})` 
    : theme.gradients.primary};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.white};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, transparent 50%);
  }
`;

const ItemBadges = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  display: flex;
  gap: ${theme.spacing.sm};
  z-index: 2;
`;

const Badge = styled.div<{ variant: 'veg' | 'popular' | 'spicy' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(20px);
  
  ${props => {
    switch (props.variant) {
      case 'veg':
        return `
          background: rgba(34, 197, 94, 0.9);
          color: ${theme.colors.white};
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
      case 'popular':
        return `
          background: rgba(245, 158, 11, 0.9);
          color: ${theme.colors.white};
          border: 1px solid rgba(245, 158, 11, 0.3);
        `;
      case 'spicy':
        return `
          background: rgba(239, 68, 68, 0.9);
          color: ${theme.colors.white};
          border: 1px solid rgba(239, 68, 68, 0.3);
        `;
      default:
        return '';
    }
  }}
`;

const ItemActions = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  display: flex;
  gap: ${theme.spacing.sm};
  z-index: 2;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.textLight};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.gradients.primary};
    color: ${theme.colors.white};
    transform: scale(1.1);
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ItemName = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.2;
`;

const ItemDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`;

const MetaGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  font-family: ${theme.fonts.accent};
  font-weight: ${theme.fontWeights.medium};
`;

const ItemPricing = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.glass};
`;

const PriceGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ItemPrice = styled.span`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.black};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ItemOriginalPrice = styled.span`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textMuted};
  text-decoration: line-through;
  font-weight: ${theme.fontWeights.medium};
`;

const AddToCartButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.xl};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.bold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.glow};
  }
`;

const MenuItemCard: React.FC<MenuItemProps> = ({ item, index }) => {
  return (
    <ItemContainer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ scale: 1.02 }}
    >
      <ItemImageContainer>
        <ItemImage backgroundImage={item.image}>
          {!item.image && '🍽️'}
        </ItemImage>
        
        <ItemBadges>
          {item.isVeg ? (
            <Badge variant="veg">
              <Leaf size={12} />
              Veg
            </Badge>
          ) : (
            <Badge variant="spicy">
              <Flame size={12} />
              Non-Veg
            </Badge>
          )}
          {item.isPopular && (
            <Badge variant="popular">
              <Star size={12} />
              Popular
            </Badge>
          )}
        </ItemBadges>
        
        <ItemActions>
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={18} />
          </ActionButton>
        </ItemActions>
      </ItemImageContainer>

      <ItemContent>
        <ItemHeader>
          <ItemName>{item.name}</ItemName>
          {item.description && (
            <ItemDescription>{item.description}</ItemDescription>
          )}
        </ItemHeader>

        <ItemMeta>
          <MetaGroup>
            {item.rating && (
              <MetaItem>
                <Star size={16} fill="currentColor" />
                <span>{item.rating}</span>
              </MetaItem>
            )}
            {item.prepTime && (
              <MetaItem>
                <Clock size={16} />
                <span>{item.prepTime}</span>
              </MetaItem>
            )}
          </MetaGroup>
        </ItemMeta>

        <ItemPricing>
          <PriceGroup>
            <ItemPrice>{item.price}</ItemPrice>
            {item.originalPrice && (
              <ItemOriginalPrice>{item.originalPrice}</ItemOriginalPrice>
            )}
          </PriceGroup>
          
          <AddToCartButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={16} />
            Add
          </AddToCartButton>
        </ItemPricing>
      </ItemContent>
    </ItemContainer>
  );
};

export default MenuItemCard;