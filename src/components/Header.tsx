import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { theme } from '../styles/theme';

interface HeaderProps {
  restaurantInfo: {
    name: string;
    tagline?: string;
    logo?: string;
    phone?: string;
    address?: string;
  };
  categories: Array<{
    id: string;
    name: string;
    items: any[];
  }>;
  activeCategory: string;
}

const HeaderContainer = styled(motion.header)<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.sticky};
  background: ${props => props.isScrolled 
    ? 'rgba(255, 255, 255, 0.98)' 
    : 'rgba(255, 255, 255, 0.95)'
  };
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.normal};
  padding: ${theme.spacing.md} 0;
  box-shadow: ${props => props.isScrolled ? theme.shadows.sm : 'none'};
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.xl};
  min-height: 80px;

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing.lg};
    gap: ${theme.spacing.lg};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex-shrink: 0;
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
  }
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.lg};
  object-fit: cover;
  box-shadow: ${theme.shadows.sm};
  border: 2px solid ${theme.colors.primary};

  @media (min-width: ${theme.breakpoints.lg}) {
    width: 60px;
    height: 60px;
  }
`;

const LogoText = styled.div`
  h1 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.text};
    margin: 0;
    line-height: 1;

    @media (min-width: ${theme.breakpoints.lg}) {
      font-size: ${theme.fontSizes['3xl']};
    }
  }

  p {
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.textMuted};
    margin: 0;
    line-height: 1;
    margin-top: ${theme.spacing.xs};

    @media (min-width: ${theme.breakpoints.lg}) {
      font-size: ${theme.fontSizes.lg};
    }
  }
`;

const Navigation = styled.nav`
  display: none;

  @media (min-width: ${theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    background: ${theme.colors.backgroundAlt};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.sm};
    border: 1px solid ${theme.colors.border};
  }
`;

const NavLink = styled(motion.button)<{ isActive: boolean }>`
  background: ${props => props.isActive 
    ? theme.colors.primary 
    : 'transparent'
  };
  color: ${props => props.isActive 
    ? theme.colors.white 
    : theme.colors.text
  };
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  white-space: nowrap;
  position: relative;

  &:hover {
    background: ${props => props.isActive 
      ? theme.colors.primary 
      : theme.colors.surface
    };
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.sm};
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.backgroundAlt};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${theme.zIndex.modal};
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileMenuContent = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.xl};
  max-width: 280px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};

  h3 {
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.text};
    margin: 0;
    font-size: ${theme.fontSizes.lg};
  }
`;

const MobileNavLink = styled.button<{ isActive: boolean }>`
  width: 100%;
  background: ${props => props.isActive 
    ? theme.colors.primary 
    : 'transparent'
  };
  color: ${props => props.isActive 
    ? theme.colors.white 
    : theme.colors.text
  };
  border: none;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-align: left;
  margin-bottom: ${theme.spacing.sm};

  &:hover {
    background: ${props => props.isActive 
      ? theme.colors.primary 
      : theme.colors.backgroundAlt
    };
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${theme.colors.backgroundAlt};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.backgroundLight};
  }
`;

const Header: React.FC<HeaderProps> = ({ 
  restaurantInfo, 
  categories, 
  activeCategory 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer
        isScrolled={isScrolled}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderContent>
          <Logo>
            {restaurantInfo.logo && (
              <LogoImage 
                src={restaurantInfo.logo} 
                alt={restaurantInfo.name}
              />
            )}
            <LogoText>
              <h1>{restaurantInfo.name}</h1>
              {restaurantInfo.tagline && (
                <p>{restaurantInfo.tagline}</p>
              )}
            </LogoText>
          </Logo>

          <Navigation>
            {categories.map((category) => (
              <NavLink
                key={category.id}
                isActive={activeCategory === category.id}
                onClick={() => scrollToCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.name}
              </NavLink>
            ))}
          </Navigation>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={18} />
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MobileMenuContent
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MobileMenuHeader>
                <h3>Menu</h3>
                <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={16} />
                </CloseButton>
              </MobileMenuHeader>

              {categories.map((category) => (
                <MobileNavLink
                  key={category.id}
                  isActive={activeCategory === category.id}
                  onClick={() => scrollToCategory(category.id)}
                >
                  {category.name}
                </MobileNavLink>
              ))}
            </MobileMenuContent>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;