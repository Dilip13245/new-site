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
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.primary};
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
  
  svg {
    color: ${theme.colors.primary};
  }
`;

const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const QuantityButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${theme.colors.backgroundAlt};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
  }
`;

const QuantityDisplay = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  min-width: 20px;
  text-align: center;
`;

const AddButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primaryDark};
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
          
          {quantity === 0 ? (
            <AddButton
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={12} />
              Add
            </AddButton>
          ) : (
            <QuantityControls>
              <QuantityButton
                onClick={handleDecrement}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus size={12} />
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton
                onClick={handleIncrement}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus size={12} />
              </QuantityButton>
            </QuantityControls>
          )}
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
};

export default MenuItemCard;