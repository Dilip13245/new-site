import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import { MapPin, Phone, Clock } from 'lucide-react';

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
  color: ${theme.colors.text};
  padding: ${theme.spacing['2xl']} 0 ${theme.spacing.lg} 0;
  margin-top: ${theme.spacing['3xl']};
  border-top: 1px solid ${theme.colors.border};
`;

const FooterContent = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.xl};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing['2xl']};
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const FooterLogoContainer = styled.div`
  width: 50px;
  height: 50px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.sm};
  object-fit: cover;
`;

const FooterBrandInfo = styled.div`
  flex: 1;
`;

const FooterLogoText = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const FooterTagline = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ContactIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  flex-shrink: 0;
  color: ${theme.colors.white};
`;

const ContactText = styled.div`
  flex: 1;
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

const FooterBottom = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  align-items: center;
  text-align: center;
  
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
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  transition: ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

const Footer: React.FC<FooterProps> = ({ restaurantInfo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FooterBrand>
            <FooterLogoContainer>
              {restaurantInfo.logo ? (
                <FooterLogoImage 
                  src={restaurantInfo.logo} 
                  alt={restaurantInfo.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span style="font-size: 1.25rem;">🍽️</span>';
                  }}
                />
              ) : (
                <span style={{ fontSize: '1.25rem' }}>🍽️</span>
              )}
            </FooterLogoContainer>
            <FooterBrandInfo>
              <FooterLogoText>{restaurantInfo.name}</FooterLogoText>
              <FooterTagline>Delicious Food, Great Service</FooterTagline>
            </FooterBrandInfo>
          </FooterBrand>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {restaurantInfo.address && (
            <ContactItem>
              <ContactIcon>
                <MapPin size={16} />
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
                <Phone size={16} />
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
              <Clock size={16} />
            </ContactIcon>
            <ContactText>
              <div style={{ color: theme.colors.textLight, fontWeight: 500 }}>
                Open Daily: 11:00 AM - 11:00 PM
              </div>
            </ContactText>
          </ContactItem>
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
            Quick Menus
          </BrandLink>
        </FooterBranding>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;