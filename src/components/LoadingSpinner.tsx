import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

interface LoadingSpinnerProps {
  restaurantName?: string;
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.background};
  background-image: ${theme.gradients.mesh};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.max};
  overflow: hidden;
  padding: ${theme.spacing.lg};
  min-height: 100vh;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
    animation: ${keyframes`
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    `} 30s linear infinite;
  }
`;

const LoadingContent = styled.div`
  text-align: center;
  color: ${theme.colors.text};
  position: relative;
  z-index: 2;
  max-width: 90vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: ${theme.spacing['3xl']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerRing = styled.div<{ delay?: number; size?: number }>`
  position: absolute;
  width: ${props => props.size || 100}px;
  height: ${props => props.size || 100}px;
  border: 3px solid transparent;
  border-top: 3px solid ${theme.colors.primary};
  border-right: 3px solid ${theme.colors.secondary};
  border-radius: 50%;
  animation: ${spin} ${props => 2 + (props.delay || 0) * 0.5}s linear infinite;
  animation-delay: ${props => props.delay || 0}s;
  opacity: ${props => 1 - (props.delay || 0) * 0.3};
`;

const SpinnerCore = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: ${theme.shadows.glow};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.lg};
`;

const LoadingTitle = styled(motion.h1)`
  font-family: ${theme.fonts.display};
  font-size: clamp(${theme.fontSizes['3xl']}, 8vw, ${theme.fontSizes['5xl']});
  font-weight: ${theme.fontWeights.black};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${theme.spacing.md} 0;
  text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
  letter-spacing: -0.02em;
  text-align: center;
  line-height: 1.1;
  animation: ${float} 6s ease-in-out infinite;
`;

const LoadingSubtitle = styled(motion.p)`
  font-family: ${theme.fonts.accent};
  font-size: clamp(${theme.fontSizes.base}, 4vw, ${theme.fontSizes.xl});
  color: ${theme.colors.textLight};
  margin: 0 0 ${theme.spacing['2xl']} 0;
  font-weight: ${theme.fontWeights.medium};
  text-align: center;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ProgressContainer = styled.div`
  width: 300px;
  max-width: 80vw;
  margin: ${theme.spacing.xl} 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.full};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${keyframes`
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    `} 2s ease-in-out infinite;
  }
`;

const ProgressText = styled.div`
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  text-align: center;
  margin-top: ${theme.spacing.sm};
  font-weight: ${theme.fontWeights.medium};
`;

const LoadingDots = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
`;

const Dot = styled(motion.div)<{ delay: number }>`
  width: 12px;
  height: 12px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  box-shadow: ${theme.shadows.glow};
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
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

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ restaurantName = 'Restaurant' }) => {
  const floatingElements = [
    { size: 60, top: '10%', left: '10%', delay: 0 },
    { size: 40, top: '20%', left: '80%', delay: 1 },
    { size: 80, top: '70%', left: '15%', delay: 2 },
    { size: 50, top: '80%', left: '85%', delay: 3 },
    { size: 30, top: '40%', left: '70%', delay: 4 },
  ];

  return (
    <LoadingContainer>
      <FloatingElements>
        {floatingElements.map((element, index) => (
          <FloatingElement
            key={index}
            size={element.size}
            top={element.top}
            left={element.left}
            delay={element.delay}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: element.delay,
            }}
          />
        ))}
      </FloatingElements>

      <LoadingContent>
        <SpinnerContainer>
          <SpinnerRing size={120} />
          <SpinnerRing delay={0.3} size={90} />
          <SpinnerRing delay={0.6} size={60} />
          <SpinnerCore>⚡</SpinnerCore>
        </SpinnerContainer>

        <LoadingTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {restaurantName}
        </LoadingTitle>

        <LoadingSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Initializing Future Experience...
        </LoadingSubtitle>

        <ProgressContainer>
          <ProgressBar>
            <ProgressFill
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
            />
          </ProgressBar>
          <ProgressText>Loading menu data...</ProgressText>
        </ProgressContainer>

        <LoadingDots>
          {[0, 1, 2].map((index) => (
            <Dot
              key={index}
              delay={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </LoadingDots>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingSpinner;