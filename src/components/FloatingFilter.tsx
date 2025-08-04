import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

interface FloatingFilterProps {
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
  }>;
  activeFilter: 'all' | 'veg' | string;
  onFilterChange: (filter: 'all' | 'veg' | string) => void;
}

const FloatingContainer = styled(motion.div)`
  position: fixed;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.md};
  z-index: ${theme.zIndex.fixed};
  
  @media (min-width: ${theme.breakpoints.md}) {
    right: ${theme.spacing.lg};
  }
`;

const FilterButton = styled(motion.button)<{ isActive?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.full};
  border: none;
  background: ${props => props.isActive ? theme.gradients.primary : theme.colors.surface};
  color: ${props => props.isActive ? theme.colors.white : theme.colors.text};
  box-shadow: ${theme.shadows.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.lg};
  transition: ${theme.transitions.fast};
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.isActive ? 'transparent' : 'rgba(229, 57, 53, 0.1)'};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.xl};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const FilterMenu = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  right: 0;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing.md};
  min-width: 200px;
  max-width: 280px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(229, 57, 53, 0.1);
`;

const FilterTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

const FilterSection = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterSectionTitle = styled.h4`
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const FilterOption = styled(motion.button)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.isActive ? 'rgba(229, 57, 53, 0.1)' : 'transparent'};
  color: ${props => props.isActive ? theme.colors.primary : theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-align: left;
  width: 100%;
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  
  &:hover {
    background: ${props => props.isActive ? 'rgba(229, 57, 53, 0.15)' : 'rgba(229, 57, 53, 0.05)'};
  }
`;

const FilterIcon = styled.span`
  font-size: ${theme.fontSizes.base};
  min-width: 20px;
  text-align: center;
`;

const FilterText = styled.span`
  flex: 1;
`;

const CategoryList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundAlt};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const CategoryOption = styled(motion.button)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.isActive ? 'rgba(229, 57, 53, 0.1)' : 'transparent'};
  color: ${props => props.isActive ? theme.colors.primary : theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-align: left;
  width: 100%;
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  
  &:hover {
    background: ${props => props.isActive ? 'rgba(229, 57, 53, 0.15)' : 'rgba(229, 57, 53, 0.05)'};
  }
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: ${theme.spacing.lg};
  left: ${theme.spacing.md};
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.full};
  border: none;
  background: ${theme.colors.accent};
  color: ${theme.colors.white};
  box-shadow: ${theme.shadows.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.fixed};
  transition: ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.xl};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    left: ${theme.spacing.lg};
  }
`;

const FloatingFilter: React.FC<FloatingFilterProps> = ({ 
  categories, 
  activeFilter, 
  onFilterChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const getFilterIcon = () => {
    if (activeFilter === 'veg') return '🥬';
    if (activeFilter === 'all') return '🍽️';
    const category = categories.find(cat => cat.id === activeFilter);
    return category?.icon || '🍽️';
  };

  return (
    <>
      <FloatingContainer>
        <AnimatePresence>
          {isMenuOpen && (
            <FilterMenu
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <FilterTitle>Filter & Navigate</FilterTitle>
              
              <FilterSection>
                <FilterSectionTitle>Diet</FilterSectionTitle>
                <FilterOptions>
                  <FilterOption
                    isActive={activeFilter === 'all'}
                    onClick={() => {
                      onFilterChange('all');
                      setIsMenuOpen(false);
                    }}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FilterIcon>🍽️</FilterIcon>
                    <FilterText>All Items</FilterText>
                  </FilterOption>
                  
                  <FilterOption
                    isActive={activeFilter === 'veg'}
                    onClick={() => {
                      onFilterChange('veg');
                      setIsMenuOpen(false);
                    }}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FilterIcon>🥬</FilterIcon>
                    <FilterText>Veg Only</FilterText>
                  </FilterOption>
                </FilterOptions>
              </FilterSection>

              <FilterSection>
                <FilterSectionTitle>Categories</FilterSectionTitle>
                <CategoryList>
                  {categories.map((category) => (
                    <CategoryOption
                      key={category.id}
                      isActive={activeFilter === category.id}
                      onClick={() => scrollToCategory(category.id)}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FilterIcon>{category.icon || '🍽️'}</FilterIcon>
                      <FilterText>{category.name}</FilterText>
                    </CategoryOption>
                  ))}
                </CategoryList>
              </FilterSection>
            </FilterMenu>
          )}
        </AnimatePresence>

        <FilterButton
          isActive={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isMenuOpen ? 45 : 0 }}
        >
          {isMenuOpen ? '✕' : getFilterIcon()}
        </FilterButton>
      </FloatingContainer>

      <AnimatePresence>
        {showScrollTop && (
          <ScrollToTopButton
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingFilter;