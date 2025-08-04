import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Zap, Star } from 'lucide-react';
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
    ? theme.gradients.glass
    : 'transparent'
  };
  backdrop-filter: ${props => props.isScrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${props => props.isScrolled 
    ? `1px solid ${theme.colors.glass}` 
    : 'none'
  };
  transition: ${theme.transitions.normal};
  padding: ${theme.spacing.md} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing.xl};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.xl};
  object-fit: cover;
  box-shadow: ${theme.shadows.glow};
  border: 2px solid ${theme.colors.primary};

  @media (min-width: ${theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
  }
`;

const LogoText = styled.div`
  h1 {
    font-family: ${theme.fonts.display};
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.black};
    background: ${theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    line-height: 1;
    text-shadow: ${theme.shadows.neon};

    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['2xl']};
    }
  }

  p {
    font-family: ${theme.fonts.accent};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.secondary};
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: none;

  @media (min-width: ${theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    background: ${theme.gradients.glass};
    backdrop-filter: blur(20px);
    border: 1px solid ${theme.colors.glass};
    border-radius: ${theme.borderRadius['2xl']};
    padding: ${theme.spacing.sm};
  }
`;

const NavLink = styled(motion.button)<{ isActive: boolean }>`
  background: ${props => props.isActive 
    ? theme.gradients.primary 
    : 'transparent'
  };
  color: ${props => props.isActive 
    ? theme.colors.white 
    : theme.colors.textLight
  };
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  white-space: nowrap;
  position: relative;
  overflow: hidden;

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
    box-shadow: ${theme.shadows.glow};
    
    &:before {
      left: 0;
    }
  }
`;

const ContactInfo = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.xl}) {
    display: flex;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts.accent};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  transition: ${theme.transitions.fast};

  svg {
    color: ${theme.colors.secondary};
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.xl};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  position: relative;
  overflow: hidden;

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
    box-shadow: ${theme.shadows.glow};
    
    &:before {
      left: 0;
    }
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
  background: ${theme.colors.overlay};
  backdrop-filter: blur(20px);
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
  background: ${theme.gradients.glass};
  backdrop-filter: blur(30px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.cardHover};
  max-width: 320px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.glass};

  h3 {
    font-family: ${theme.fonts.display};
    background: ${theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }
`;

const MobileNavLink = styled.button<{ isActive: boolean }>`
  width: 100%;
  background: ${props => props.isActive 
    ? theme.gradients.primary 
    : theme.gradients.glass
  };
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.isActive 
    ? 'transparent' 
    : theme.colors.glass
  };
  color: ${props => props.isActive 
    ? theme.colors.white 
    : theme.colors.textLight
  };
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-align: left;
  margin-bottom: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;

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
    transform: translateX(4px);
    
    &:before {
      left: 0;
    }
  }
`;

const MobileContactInfo = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.glass};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.xl};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${theme.colors.error};
    transition: ${theme.transitions.normal};
    z-index: -1;
  }

  &:hover {
    color: ${theme.colors.white};
    
    &:before {
      left: 0;
    }
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.success};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${theme.colors.success};
    border-radius: 50%;
    animation: ${theme.animations.pulse};
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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 120;
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
        transition={{ duration: 0.6, type: 'spring', damping: 25 }}
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

          <Navigation isOpen={false}>
            {categories.map((category, index) => (
              <NavLink
                key={category.id}
                isActive={activeCategory === category.id}
                onClick={() => scrollToCategory(category.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </NavLink>
            ))}
          </Navigation>

          <ContactInfo>
            <StatusIndicator>
              <Zap size={12} />
              Online
            </StatusIndicator>
            {restaurantInfo.phone && (
              <ContactItem>
                <Phone size={16} />
                <span>{restaurantInfo.phone}</span>
              </ContactItem>
            )}
            {restaurantInfo.address && (
              <ContactItem>
                <MapPin size={16} />
                <span>{restaurantInfo.address}</span>
              </ContactItem>
            )}
          </ContactInfo>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} />
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
              initial={{ x: 300, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 300, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MobileMenuHeader>
                <h3>Navigation</h3>
                <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={18} />
                </CloseButton>
              </MobileMenuHeader>

              {categories.map((category, index) => (
                <MobileNavLink
                  key={category.id}
                  isActive={activeCategory === category.id}
                  onClick={() => scrollToCategory(category.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category.name}
                </MobileNavLink>
              ))}

              <MobileContactInfo>
                <StatusIndicator>
                  <Star size={12} />
                  Available Now
                </StatusIndicator>
                {restaurantInfo.phone && (
                  <ContactItem>
                    <Phone size={16} />
                    <span>{restaurantInfo.phone}</span>
                  </ContactItem>
                )}
                {restaurantInfo.address && (
                  <ContactItem>
                    <MapPin size={16} />
                    <span>{restaurantInfo.address}</span>
                  </ContactItem>
                )}
              </MobileContactInfo>
            </MobileMenuContent>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;