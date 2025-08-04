import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';

interface HeroSectionProps {
  restaurantInfo: {
    name: string;
    tagline?: string;
    tagline2?: string;
    heroImage?: string;
  };
}

const HeroContainer = styled.section`
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
  padding-top: 80px;
  padding-bottom: ${theme.spacing['2xl']};
`;

const HeroContent = styled(Container)`
  text-align: center;
  max-width: 800px;
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 3vw, 1.25rem);
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.5;
`;

const HeroSubtitle2 = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.spacing['2xl']};
`;

const ScrollIndicator = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  cursor: pointer;
  margin-top: ${theme.spacing.xl};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ScrollText = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;

const ScrollArrow = styled(motion.div)`
  width: 1px;
  height: 20px;
  background: ${theme.colors.primary};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 5px solid ${theme.colors.primary};
  }
`;

const HeroSection: React.FC<HeroSectionProps> = ({ restaurantInfo }) => {
  const scrollToMenu = () => {
    const menuSection = document.querySelector('.menu-container');
    if (menuSection) {
      const headerHeight = 80;
      const elementPosition = menuSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <HeroContainer id="hero">
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {restaurantInfo.name}
        </HeroTitle>

        {restaurantInfo.tagline && (
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {restaurantInfo.tagline}
          </HeroSubtitle>
        )}

        {restaurantInfo.tagline2 && (
          <HeroSubtitle2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {restaurantInfo.tagline2}
          </HeroSubtitle2>
        )}

        <ScrollIndicator
          onClick={scrollToMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <ScrollText>View Menu</ScrollText>
          <ScrollArrow
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </ScrollIndicator>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;