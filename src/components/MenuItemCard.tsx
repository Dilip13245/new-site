import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Star, Clock, Plus, Minus } from 'lucide-react';

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
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${theme.colors.primary};
    transform: scaleY(0);
    transition: ${theme.transitions.normal};
    transform-origin: bottom;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary};
    
    &::before {
      transform: scaleY(1);
    }
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  border-radius: ${theme.borderRadius.xl};
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
  font-size: ${theme.fontSizes['2xl']};
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
    background: linear-gradient(135deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
  }
  
  ${ItemContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ItemBadges = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  left: ${theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  z-index: 2;
`;

const Badge = styled.div<{ variant: 'veg' | 'popular' | 'nonveg' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.bold};
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  ${props => {
    switch (props.variant) {
      case 'veg':
        return `
          background: rgba(34, 197, 94, 0.9);
          color: ${theme.colors.white};
        `;
      case 'popular':
        return `
          background: rgba(245, 158, 11, 0.9);
          color: ${theme.colors.white};
        `;
      case 'nonveg':
        return `
          background: rgba(239, 68, 68, 0.9);
          color: ${theme.colors.white};
        `;
      default:
        return '';
    }
  }}
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.sm} 0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  font-weight: ${theme.fontWeights.medium};
  
  svg {
    color: ${theme.colors.primary};
  }
`;

const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.lg};
`;

const PriceSection = styled.div`
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

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const QuantityButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${theme.colors.backgroundAlt};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  min-width: 24px;
  text-align: center;
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
  const [quantity, setQuantity] = React.useState(0);

  const handleAddToCart = () => {
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  return (
    <ItemContainer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
    >
      <ItemImageContainer>
        <ItemImage backgroundImage={item.image}>
          {!item.image && '🍽️'}
        </ItemImage>
        
        <ItemBadges>
          {item.isVeg ? (
            <Badge variant="veg" title="Vegetarian">
              🥬
            </Badge>
          ) : (
            <Badge variant="nonveg" title="Non-Vegetarian">
              🍖
            </Badge>
          )}
          {item.isPopular && (
            <Badge variant="popular" title="Popular">
              ⭐
            </Badge>
          )}
        </ItemBadges>
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
          </ItemMeta>
        )}

        <ItemFooter>
          <PriceSection>
            <ItemPrice>{item.price}</ItemPrice>
            {item.originalPrice && (
              <ItemOriginalPrice>{item.originalPrice}</ItemOriginalPrice>
            )}
          </PriceSection>
          
          {quantity === 0 ? (
            <AddButton
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} />
              Add
            </AddButton>
          ) : (
            <QuantityControls>
              <QuantityButton
                onClick={handleDecrement}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus size={16} />
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton
                onClick={handleIncrement}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus size={16} />
              </QuantityButton>
            </QuantityControls>
          )}
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
};

export default MenuItemCard;