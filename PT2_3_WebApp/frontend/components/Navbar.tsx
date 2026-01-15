"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import {
  FiSearch,
  FiUpload,
  FiHome,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";
import { useCartStore, useWishlistStore } from "@/store";

const Nav = styled.nav`
  background: linear-gradient(135deg, #d4dcff, #764ba2, white);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.2)" : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    span {
      display: none;
    }
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);

  return (
    <Nav>
      <Container>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo>XSURFACE</Logo>
        </Link>
        <NavLinks>
          <NavLink href="/" $active={pathname === "/"}>
            <FiHome size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink href="/products" $active={pathname === "/products"}>
            <FiSearch size={20} />
            <span>Products</span>
          </NavLink>
          <NavLink href="/upload" $active={pathname === "/upload"}>
            <FiUpload size={20} />
            <span>Upload</span>
          </NavLink>
          <NavLink href="#" $active={false}>
            <FiHeart size={20} />
            <span>Wishlist</span>
            {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
          </NavLink>
          <NavLink href="#" $active={false}>
            <FiShoppingCart size={20} />
            <span>Cart</span>
            {totalItems > 0 && <Badge>{totalItems}</Badge>}
          </NavLink>
        </NavLinks>
      </Container>
    </Nav>
  );
}
