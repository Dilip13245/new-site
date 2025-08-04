import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Star, Clock, Heart, Plus } from 'lucide-react';

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

const ItemCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.normal};
  position: relative;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary};
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: ${theme.colors.backgroundLight};
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
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.textMuted};
  position: relative;
  transition: ${theme.transitions.normal};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
  }
  
  ${ItemCard}:hover & {
    transform: scale(1.05);
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

const Badge = styled.div<{ variant: 'veg' | 'popular' | 'nonveg' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(10px);
  
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
      case 'nonveg':
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
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.textLight};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    transform: scale(1.1);
  }
`;

const ItemContent = styled.div`
  padding: ${theme.spacing.lg};
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
  font-weight: ${theme.fontWeights.semibold};
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
  font-weight: ${theme.fontWeights.medium};
`;

const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;

const PriceGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const ItemPrice = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
`;

const ItemOriginalPrice = styled.span`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textMuted};
  text-decoration: line-through;
  font-weight: ${theme.fontWeights.normal};
`;

const AddButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    background: ${theme.colors.primaryDark};
    transform: scale(1.05);
  }
`;

const MenuItemCard: React.FC<MenuItemProps> = ({ item, index }) => {
  return (
    <ItemCard
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
              🥬 Veg
            </Badge>
          ) : (
            <Badge variant="nonveg">
              🍖 Non-Veg
            </Badge>
          )}
          {item.isPopular && (
            <Badge variant="popular">
              ⭐ Popular
            </Badge>
          )}
        </ItemBadges>
        
        <ItemActions>
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} />
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

        <ItemFooter>
          <PriceGroup>
            <ItemPrice>{item.price}</ItemPrice>
            {item.originalPrice && (
              <ItemOriginalPrice>{item.originalPrice}</ItemOriginalPrice>
            )}
          </PriceGroup>
          
          <AddButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            Add
          </AddButton>
        </ItemFooter>
      </ItemContent>
    </ItemCard>
  );
};

export default MenuItemCard;