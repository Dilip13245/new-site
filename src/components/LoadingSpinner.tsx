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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.max};
  overflow: hidden;
  padding: ${theme.spacing.lg};
  min-height: 100vh;
`;

const LoadingContent = styled.div`
  text-align: center;
  color: ${theme.colors.text};
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

const SpinnerContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid ${theme.colors.border};
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SpinnerCore = styled.div`
  width: 24px;
  height: 24px;
  background: ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.sm};
`;

const LoadingTitle = styled(motion.h1)`
  font-family: ${theme.fonts.heading};
  font-size: clamp(${theme.fontSizes['2xl']}, 6vw, ${theme.fontSizes['3xl']});
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.md} 0;
  text-align: center;
  line-height: 1.1;
`;

const LoadingSubtitle = styled(motion.p)`
  font-size: clamp(${theme.fontSizes.base}, 4vw, ${theme.fontSizes.lg});
  color: ${theme.colors.textLight};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-weight: ${theme.fontWeights.normal};
  text-align: center;
  line-height: 1.4;
`;

const ProgressBar = styled.div`
  width: 200px;
  max-width: 80vw;
  height: 3px;
  background: ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ restaurantName = 'Restaurant' }) => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <SpinnerContainer>
          <SpinnerRing />
          <SpinnerCore>🍽️</SpinnerCore>
        </SpinnerContainer>

        <LoadingTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {restaurantName}
        </LoadingTitle>

        <LoadingSubtitle
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Loading menu...
        </LoadingSubtitle>

        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
          />
        </ProgressBar>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingSpinner;