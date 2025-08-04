import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import { ArrowRight, Phone, Star, Zap, Sparkles } from 'lucide-react';

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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${theme.colors.background};
  background-image: ${theme.gradients.mesh};
`;

const HeroPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
  z-index: 1;
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 3;
  text-align: center;
  padding-top: 140px;
  padding-bottom: ${theme.spacing['4xl']};
`;

const HeroWelcome = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
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
    opacity: 0.1;
    transition: ${theme.transitions.slow};
  }

  &:hover:before {
    left: 100%;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${theme.fonts.display};
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: ${theme.fontWeights.black};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.lg};
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    z-index: -1;
    animation: ${theme.animations.pulse};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: ${theme.fonts.body};
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: ${theme.fontWeights.normal};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
`;

const HeroSubtitle2 = styled(motion.p)`
  font-family: ${theme.fonts.accent};
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing['3xl']};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const HeroActions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  align-items: center;
  margin-bottom: ${theme.spacing['4xl']};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
    gap: ${theme.spacing.xl};
  }
`;

const HeroButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  position: relative;
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  border: none;
  border-radius: ${theme.borderRadius['2xl']};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.md};
  min-width: 200px;
  justify-content: center;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${props => props.variant === 'secondary' ? `
    background: ${theme.gradients.glass};
    color: ${theme.colors.text};
    border: 2px solid ${theme.colors.glass};
    backdrop-filter: blur(20px);
    
    &::before {
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
      border-color: ${theme.colors.secondary};
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.glowHover};
      
      &::before {
        left: 0;
      }
    }
  ` : `
    background: ${theme.gradients.primary};
    color: ${theme.colors.white};
    box-shadow: ${theme.shadows.glow};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: ${theme.transitions.normal};
    }
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.glowHover};
      
      &::before {
        left: 100%;
      }
    }
  `}
  
  &:active {
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  text-align: center;
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
    opacity: 0.1;
    transition: ${theme.transitions.normal};
  }

  &:hover:before {
    left: 0;
  }
`;

const StatNumber = styled.div`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.black};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  cursor: pointer;
  z-index: 3;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ScrollText = styled.span`
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const ScrollArrow = styled(motion.div)`
  width: 2px;
  height: 30px;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.full};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid ${theme.colors.primary};
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
`;

const FloatingElement = styled(motion.div)<{
  size: number;
  top: string;
  left: string;
  delay: number;
}>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glass};
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
`;

const HeroSection: React.FC<HeroSectionProps> = ({ restaurantInfo }) => {
  const scrollToMenu = () => {
    const menuSection = document.querySelector('.menu-container');
    if (menuSection) {
      const headerHeight = 120;
      const elementPosition = menuSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const floatingElements = [
    { size: 100, top: '10%', left: '5%', delay: 0 },
    { size: 80, top: '20%', left: '90%', delay: 1 },
    { size: 120, top: '70%', left: '8%', delay: 2 },
    { size: 90, top: '80%', left: '85%', delay: 3 },
    { size: 60, top: '30%', left: '80%', delay: 4 },
    { size: 70, top: '60%', left: '15%', delay: 5 },
  ];

  return (
    <HeroContainer id="hero">
      <HeroPattern />

      <FloatingElements>
        {floatingElements.map((element, index) => (
          <FloatingElement
            key={index}
            size={element.size}
            top={element.top}
            left={element.left}
            delay={element.delay}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: element.delay,
            }}
          />
        ))}
      </FloatingElements>

      <HeroContent>
        <HeroWelcome
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Sparkles size={16} />
          <span>Welcome to the Future</span>
        </HeroWelcome>

        <HeroTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {restaurantInfo.name}
        </HeroTitle>

        {restaurantInfo.tagline && (
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {restaurantInfo.tagline}
          </HeroSubtitle>
        )}

        {restaurantInfo.tagline2 && (
          <HeroSubtitle2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {restaurantInfo.tagline2}
          </HeroSubtitle2>
        )}

        <HeroActions
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <HeroButton
            onClick={scrollToMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={20} />
            <span>Explore Menu</span>
            <ArrowRight size={20} />
          </HeroButton>

          <HeroButton
            variant="secondary"
            as="a"
            href="tel:+916376535219"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={20} />
            <span>Order Now</span>
          </HeroButton>
        </HeroActions>

        <StatsContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <StatCard
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <StatNumber>500+</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </StatCard>
          
          <StatCard
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <StatNumber>4.9</StatNumber>
            <StatLabel>Rating</StatLabel>
          </StatCard>
          
          <StatCard
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <StatNumber>24/7</StatNumber>
            <StatLabel>Available</StatLabel>
          </StatCard>
        </StatsContainer>
      </HeroContent>

      <ScrollIndicator
        onClick={scrollToMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        whileHover={{ scale: 1.1 }}
      >
        <ScrollText>Discover Menu</ScrollText>
        <ScrollArrow
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;