"use client";

import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #2d3748;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.8;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Copyright>
          &copy; 2026 XSURFACE. XSF FullStack Developer Test
        </Copyright>
        <Links>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </Links>
      </Container>
    </FooterContainer>
  );
}
