"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import { productApi } from "@/lib/api";
import { Product } from "@/types/product";
import { FiArrowLeft, FiShoppingCart, FiHeart } from "react-icons/fi";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #667eea;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #764ba2;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Category = styled.span`
  display: inline-block;
  background: #edf2f7;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  width: fit-content;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
  margin: 0;
`;

const Code = styled.p`
  font-size: 1rem;
  color: #718096;
  margin: 0;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #e53e3e;
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$primary
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#edf2f7"};
  color: ${(props) => (props.$primary ? "white" : "#2d3748")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: #718096;
`;

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await productApi.getById(params.id as string);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
      router.push("/products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading product...</LoadingMessage>;
  }

  if (!product) {
    return <LoadingMessage>Product not found</LoadingMessage>;
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${product.image}`;

  return (
    <Container>
      <BackButton onClick={() => router.back()}>
        <FiArrowLeft size={20} />
        Back to Products
      </BackButton>

      <ProductContainer>
        <ImageSection>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </ImageSection>

        <InfoSection>
          {product.category && <Category>{product.category}</Category>}
          <Title>{product.name}</Title>
          <Code>Product Code: {product.code}</Code>
          <Price>฿{product.price.toLocaleString()}</Price>

          {product.description && (
            <>
              <h3 style={{ margin: 0, color: "#2d3748" }}>Description</h3>
              <Description>{product.description}</Description>
            </>
          )}

          <Actions>
            <ActionButton $primary>
              <FiShoppingCart size={20} />
              Add to Cart
            </ActionButton>
            <ActionButton>
              <FiHeart size={20} />
              Wishlist
            </ActionButton>
          </Actions>
        </InfoSection>
      </ProductContainer>
    </Container>
  );
}
