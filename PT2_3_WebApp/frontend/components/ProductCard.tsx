"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Product } from "@/types/product";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useCartStore, useWishlistStore, useUIStore } from "@/store";

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background: #f5f5f5;
  overflow: hidden;
`;

const Badge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e53e3e;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: bold;
`;

const IconButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#2d3748'};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2d3748;
`;

const ProductCode = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin: 0 0 0.5rem 0;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e53e3e;
  margin: 0.5rem 0;
`;

const Category = styled.span`
  display: inline-block;
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product._id));
  const addNotification = useUIStore(state => state.addNotification);
  
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${product.image}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product._id,
      name: product.name,
      code: product.code,
      price: product.price,
      image: product.image,
    });
    addNotification({
      type: 'success',
      message: `${product.name} added to cart`,
      duration: 3000,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product._id);
    addNotification({
      type: 'info',
      message: isInWishlist 
        ? `${product.name} removed from wishlist` 
        : `${product.name} added to wishlist`,
      duration: 3000,
    });
  };

  return (
    <Link href={`/products/${product._id}`} style={{ textDecoration: "none" }}>
      <Card>
        <ImageContainer>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <IconButtons>
            <IconButton onClick={handleToggleWishlist} $active={isInWishlist}>
              <FiHeart size={18} />
            </IconButton>
            <IconButton onClick={handleAddToCart}>
              <FiShoppingCart size={18} />
            </IconButton>
          </IconButtons>
        </ImageContainer>
        <Content>
          <ProductName>{product.name}</ProductName>
          <ProductCode>Code: {product.code}</ProductCode>
          <Price>฿{product.price.toLocaleString()}</Price>
          {product.category && <Category>{product.category}</Category>}
        </Content>
      </Card>
    </Link>
  );
}
