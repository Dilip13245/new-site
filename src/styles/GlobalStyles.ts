import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.normal};
    line-height: 1.6;
    color: ${theme.colors.text};
    background: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    font-weight: ${theme.fontWeights.extrabold};
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
    font-weight: ${theme.fontWeights.bold};
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
    font-weight: ${theme.fontWeights.bold};
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.semibold};
  }

  h5 {
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.semibold};
  }

  h6 {
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.semibold};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textLight};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primaryDark};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: ${theme.transitions.fast};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
    transition: ${theme.transitions.fast};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryDark};
  }

  /* Selection */
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.sm};

    @media (min-width: ${theme.breakpoints.sm}) {
      padding: 0 ${theme.spacing.md};
    }

    @media (min-width: ${theme.breakpoints.lg}) {
      padding: 0 ${theme.spacing.lg};
    }
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Animation keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeft {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideRight {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Common styled components
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.sm};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.md};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

export const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} 0;
  }
`;

export const Grid = styled.div<{
  columns?: number;
  gap?: string;
  minWidth?: string;
}>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '300px'}, 1fr));
  gap: ${props => props.gap || theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(${props => props.columns || 'auto-fit'}, 1fr);
  }
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: string;
  justify?: string;
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '0'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

export const Card = styled.div<{
  padding?: string;
  shadow?: boolean;
  hover?: boolean;
  glass?: boolean;
}>`
  background: ${props => props.glass ? theme.gradients.glass : theme.colors.surface};
  backdrop-filter: ${props => props.glass ? 'blur(20px)' : 'none'};
  border: ${props => props.glass ? `1px solid ${theme.colors.glass}` : 'none'};
  border-radius: ${theme.borderRadius.xl};
  padding: ${props => props.padding || theme.spacing.lg};
  box-shadow: ${props => props.shadow ? theme.shadows.card : 'none'};
  transition: ${theme.transitions.normal};

  ${props => props.hover && `
    &:hover {
      box-shadow: ${theme.shadows.cardHover};
      transform: translateY(-4px);
    }
  `}
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.fonts.accent};
  font-weight: ${theme.fontWeights.semibold};
  border-radius: ${theme.borderRadius.lg};
  transition: ${theme.transitions.fast};
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;
  
  ${props => props.fullWidth && 'width: 100%;'}

  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.base};
        `;
    }
  }}

  /* Color variants */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: ${theme.colors.accent};
          color: ${theme.colors.white};
          
          &:hover {
            background: ${theme.colors.accentLight};
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          
          &:hover {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
            transform: translateY(-1px);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text};
          
          &:hover {
            background: ${theme.colors.backgroundAlt};
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: ${theme.gradients.primary};
          color: ${theme.colors.white};
          
          &:hover {
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export const Badge = styled.span<{
  variant?: 'success' | 'warning' | 'error' | 'primary';
  size?: 'sm' | 'md';
}>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-family: ${theme.fonts.accent};
  font-weight: ${theme.fontWeights.medium};
  border-radius: ${theme.borderRadius.full};
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.fontSizes.xs};
        `;
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
        `;
    }
  }}

  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: ${theme.colors.success};
          color: ${theme.colors.white};
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning};
          color: ${theme.colors.white};
        `;
      case 'error':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.white};
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
    }
  }}
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  font-size: ${theme.fontSizes.base};
  border: 2px solid ${theme.colors.surfaceAlt};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  transition: ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;