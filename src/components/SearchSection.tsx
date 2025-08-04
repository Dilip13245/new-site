import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import { Search, X } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchContainer = styled.section`
  background: ${theme.colors.backgroundAlt};
  padding: ${theme.spacing.xl} 0;
  border-top: 1px solid ${theme.colors.border};
  border-bottom: 1px solid ${theme.colors.border};
`;

const SearchContent = styled(Container)`
  max-width: 600px;
`;

const SearchBox = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.fast};

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: ${theme.colors.textMuted};
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md} 0;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.base};
  border: none;
  background: transparent;
  color: ${theme.colors.text};
  outline: none;
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const ClearButton = styled(motion.button)<{ show: boolean }>`
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: ${theme.spacing.sm};
  border: none;
  background: ${theme.colors.backgroundLight};
  color: ${theme.colors.textMuted};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  searchQuery
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, onSearch]);

  const handleClearSearch = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <SearchContainer>
      <SearchContent>
        <SearchBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          
          <SearchInput
            type="text"
            placeholder="Search for dishes..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />
          
          <ClearButton
            show={localQuery.length > 0}
            onClick={handleClearSearch}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={14} />
          </ClearButton>
        </SearchBox>
      </SearchContent>
    </SearchContainer>
  );
};

export default SearchSection;