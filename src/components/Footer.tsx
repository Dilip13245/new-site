import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import { MapPin, Phone, Clock, Star, Navigation, Heart, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  restaurantInfo: {
    name: string;
    phone?: string;
    address?: string;
    logo?: string;
  };
}

const FooterContainer = styled.footer`
  background: ${theme.colors.backgroundAlt};
  background-image: ${theme.gradients.mesh};
  color: ${theme.colors.text};
  padding: ${theme.spacing['5xl']} 0 ${theme.spacing.xl} 0;
  margin-top: ${theme.spacing['5xl']};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${theme.gradients.primary};
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
  }
`;

const FooterPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  z-index: 1;
`;

const FooterContent = styled(Container)`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['3xl']};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
    gap: ${theme.spacing['4xl']};
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLogoContainer = styled.div`
  width: 100px;
  height: 100px;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 2px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.glow};
  position: relative;
  transition: ${theme.transitions.normal};
  overflow: hidden;
  
  &::before {
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
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.glowHover};
    
    &::before {
      left: 100%;
    }
  }
`;

const FooterLogoImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.xl};
  object-fit: cover;
  border: 2px solid ${theme.colors.glass};
  transition: ${theme.transitions.normal};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const FooterBrandInfo = styled.div`
  flex: 1;
`;

const FooterLogoText = styled.h3`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.black};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${theme.spacing.sm} 0;
  line-height: 1.1;
`;

const FooterTagline = styled.p`
  font-family: ${theme.fonts.accent};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.secondary};
  margin: 0;
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const FooterDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const FooterSectionTitle = styled.h4`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${theme.gradients.primary};
    border-radius: 2px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.xl};
  transition: ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.cardHover};
    border-color: ${theme.colors.primary};
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.xl};
  flex-shrink: 0;
  box-shadow: ${theme.shadows.glow};
  color: ${theme.colors.white};
`;

const ContactText = styled.div`
  flex: 1;
  padding-top: ${theme.spacing.sm};
`;

const ContactLink = styled.a`
  color: ${theme.colors.textLight};
  text-decoration: none;
  transition: ${theme.transitions.fast};
  font-weight: ${theme.fontWeights.medium};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  color: ${theme.colors.textLight};
  text-decoration: none;
  border-radius: ${theme.borderRadius.xl};
  transition: ${theme.transitions.normal};
  font-family: ${theme.fonts.accent};
  font-weight: ${theme.fontWeights.semibold};
  position: relative;
  overflow: hidden;
  
  &::before {
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
  
  &:hover {
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow};
    
    &::before {
      left: 0;
      opacity: 0.9;
    }
  }
`;

const ActionIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  color: ${theme.colors.textLight};
  text-decoration: none;
  border-radius: ${theme.borderRadius.xl};
  transition: ${theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  &::before {
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
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow};
    
    &::before {
      left: 0;
    }
  }
`;

const NewsletterSection = styled.div`
  background: ${theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
`;

const NewsletterTitle = styled.h5`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glass};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const NewsletterButton = styled(motion.button)`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fonts.accent};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.glow};
  }
`;

const FooterBottom = styled.div`
  margin-top: ${theme.spacing['4xl']};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.glass};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const FooterCopyright = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const FooterBranding = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
`;

const BrandLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.fontWeights.semibold};
  transition: ${theme.transitions.fast};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  
  &:hover {
    background: ${theme.gradients.glass};
    transform: translateY(-2px);
  }
`;

const Footer: React.FC<FooterProps> = ({ restaurantInfo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterPattern />
      
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FooterBrand>
            <FooterLogoContainer>
              {restaurantInfo.logo ? (
                <FooterLogoImage 
                  src={restaurantInfo.logo} 
                  alt={restaurantInfo.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span style="font-size: 3rem;">🍽️</span>';
                  }}
                />
              ) : (
                <span style={{ fontSize: '3rem' }}>🍽️</span>
              )}
            </FooterLogoContainer>
            <FooterBrandInfo>
              <FooterLogoText>{restaurantInfo.name}</FooterLogoText>
              <FooterTagline>Future of Dining</FooterTagline>
            </FooterBrandInfo>
          </FooterBrand>
          
          <FooterDescription>
            Experience the future of dining with cutting-edge flavors and innovative culinary techniques. 
            We blend tradition with technology to create unforgettable dining experiences.
          </FooterDescription>

          <NewsletterSection>
            <NewsletterTitle>Stay Updated</NewsletterTitle>
            <NewsletterForm onSubmit={(e) => e.preventDefault()}>
              <NewsletterInput
                type="email"
                placeholder="Enter your email"
                required
              />
              <NewsletterButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </NewsletterButton>
            </NewsletterForm>
          </NewsletterSection>

          <SocialLinks>
            <SocialLink
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook size={24} />
            </SocialLink>
            
            <SocialLink
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={24} />
            </SocialLink>
            
            <SocialLink
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter size={24} />
            </SocialLink>
            
            <SocialLink
              href="mailto:info@restaurant.com"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FooterSectionTitle>Contact</FooterSectionTitle>
          
          {restaurantInfo.address && (
            <ContactItem>
              <ContactIcon>
                <MapPin size={20} />
              </ContactIcon>
              <ContactText>
                <ContactLink
                  href="https://maps.app.goo.gl/vztXTynWqZ7C1nbx7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {restaurantInfo.address}
                </ContactLink>
              </ContactText>
            </ContactItem>
          )}
          
          {restaurantInfo.phone && (
            <ContactItem>
              <ContactIcon>
                <Phone size={20} />
              </ContactIcon>
              <ContactText>
                <ContactLink href={`tel:${restaurantInfo.phone.replace(/[^\d+]/g, '')}`}>
                  {restaurantInfo.phone}
                </ContactLink>
              </ContactText>
            </ContactItem>
          )}
          
          <ContactItem>
            <ContactIcon>
              <Clock size={20} />
            </ContactIcon>
            <ContactText>
              <div style={{ color: theme.colors.textLight, fontWeight: 500 }}>
                Open 24/7<br />
                <small style={{ color: theme.colors.textMuted }}>Always here for you</small>
              </div>
            </ContactText>
          </ContactItem>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FooterSectionTitle>Quick Links</FooterSectionTitle>
          
          <ActionButtons>
            <ActionButton
              href="https://maps.app.goo.gl/vztXTynWqZ7C1nbx7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ActionIcon>
                <Navigation size={20} />
              </ActionIcon>
              <span>Get Directions</span>
            </ActionButton>
            
            <ActionButton
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ActionIcon>
                <Star size={20} />
              </ActionIcon>
              <span>Write Review</span>
            </ActionButton>
            
            <ActionButton
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ActionIcon>
                <Heart size={20} />
              </ActionIcon>
              <span>Back to Top</span>
            </ActionButton>
          </ActionButtons>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterCopyright>
          &copy; {currentYear} {restaurantInfo.name}. All rights reserved.
        </FooterCopyright>
        
        <FooterBranding>
          <span>Powered by</span>
          <BrandLink
            href="https://quickmenus.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>⚡ Quick Menus</span>
          </BrandLink>
        </FooterBranding>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;