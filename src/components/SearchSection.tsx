import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import { Search, X, Filter, Sparkles } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchContainer = styled.section`
  background: ${theme.colors.backgroundAlt};
  padding: ${theme.spacing['3xl']} 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.gradients.primary};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const SearchContent = styled(Container)`
  position: relative;
  z-index: 2;
`;

const SearchHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const SearchTitle = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
`;

const SearchSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textLight};
  max-width: 500px;
  margin: 0 auto;
`;

const SearchBox = styled(motion.div)`
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius['3xl']};
  padding: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.card};
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.xl};
  color: ${theme.colors.white};
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.lg} 0;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.lg};
  border: none;
  background: transparent;
  color: ${theme.colors.text};
  outline: none;
  
  &::placeholder {
    color: ${theme.colors.textMuted};
    font-style: italic;
  }
`;

const SearchActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;
`;

const ActionButton = styled(motion.button)<{ variant?: 'clear' | 'filter' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${theme.borderRadius.xl};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  ${props => props.variant === 'clear' ? `
    background: ${theme.colors.error};
    color: ${theme.colors.white};
    
    &:hover {
      background: ${theme.colors.error};
      transform: scale(1.1);
    }
  ` : `
    background: ${theme.gradients.glass};
    backdrop-filter: blur(20px);
    border: 1px solid ${theme.colors.glass};
    color: ${theme.colors.textLight};
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: ${theme.gradients.secondary};
      transition: ${theme.transitions.normal};
      z-index: -1;
    }
    
    &:hover {
      color: ${theme.colors.white};
      transform: scale(1.1);
      
      &:before {
        left: 0;
      }
    }
  `}
`;

const SearchSuggestions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
`;

const SuggestionChip = styled(motion.button)`
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.textLight};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${theme.gradients.primary};
    transition: ${theme.transitions.normal};
    z-index: -1;
  }

  &:hover {
    color: ${theme.colors.white};
    transform: translateY(-2px);
    
    &:before {
      left: 0;
    }
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled(motion.div)<{
  size: number;
  top: string;
  left: string;
  delay: number;
}>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  opacity: 0.3;
`;

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  searchQuery
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isTyping, setIsTyping] = useState(false);

  // Debounce search
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      onSearch(localQuery);
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, onSearch]);

  const handleClearSearch = () => {
    setLocalQuery('');
    onSearch('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalQuery(suggestion);
    onSearch(suggestion);
  };

  const suggestions = [
    'Pizza', 'Burger', 'Pasta', 'Salad', 'Dessert', 'Drinks'
  ];

  const particles = [
    { size: 4, top: '20%', left: '10%', delay: 0 },
    { size: 6, top: '30%', left: '80%', delay: 1 },
    { size: 3, top: '60%', left: '15%', delay: 2 },
    { size: 5, top: '70%', left: '85%', delay: 3 },
    { size: 4, top: '40%', left: '70%', delay: 4 },
  ];

  return (
    <SearchContainer>
      <FloatingParticles>
        {particles.map((particle, index) => (
          <Particle
            key={index}
            size={particle.size}
            top={particle.top}
            left={particle.left}
            delay={particle.delay}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </FloatingParticles>

      <SearchContent>
        <SearchHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SearchTitle>Find Your Favorite</SearchTitle>
          <SearchSubtitle>
            Search through our delicious menu and discover amazing dishes
          </SearchSubtitle>
        </SearchHeader>

        <SearchBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <SearchInputWrapper>
            <SearchIconWrapper>
              <Search size={24} />
            </SearchIconWrapper>
            
            <SearchInput
              type="text"
              placeholder="Search for dishes, ingredients, or categories..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
            
            <SearchActions>
              {localQuery.length > 0 && (
                <ActionButton
                  variant="clear"
                  onClick={handleClearSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <X size={18} />
                </ActionButton>
              )}
              
              <ActionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Filter size={18} />
              </ActionButton>
            </SearchActions>
          </SearchInputWrapper>
        </SearchBox>

        {!searchQuery && (
          <SearchSuggestions
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {suggestions.map((suggestion, index) => (
              <SuggestionChip
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={14} />
                {suggestion}
              </SuggestionChip>
            ))}
          </SearchSuggestions>
        )}
      </SearchContent>
    </SearchContainer>
  );
};

export default SearchSection;