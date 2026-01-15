/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { productApi } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroSection = styled.section`
  background: #d3d3d3;
  padding: 0;
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const BannerContent = styled.div`
  text-align: center;
`;

const BannerTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 300;
  color: white;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerSize = styled.p`
  font-size: 1.5rem;
  color: #e53e3e;
  font-weight: 400;
`;

const CategorySection = styled.section`
  padding: 3rem 2rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 640px) {
    padding: 0 0.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

const ViewAllLink = styled.a`
  color: #e53e3e;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryScroll = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryItem = styled.div`
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CategoryIconBox = styled.div`
  width: 100px;
  height: 100px;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const CategoryName = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
`;

const ProductSection = styled.section<{ background?: string }>`
  padding: 2rem 2rem 3rem;
  background: ${(props) => props.background || "white"};
`;

const ProductCarousel = styled.div`
  position: relative;
  margin-top: 1.5rem;
`;

const ProductScrollContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductCardWrapper = styled.div`
  min-width: 280px;
  flex-shrink: 0;
`;

const CarouselButton = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: 1px solid #e2e8f0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  color: #1f2937;

  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    background: #f7fafc;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #000000;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  ${(props) => (props.direction === "left" ? "left: -20px;" : "right: -20px;")}
`;

const ExclusiveDealSection = styled(ProductSection)`
  background: #2d3748;
  color: white;

  ${SectionTitle} {
    color: white;
  }

  ${ViewAllLink} {
    color: #e53e3e;
  }
`;

const CollectionSection = styled.section`
  padding: 3rem 2rem;
  background: #f8f4ef;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

const CollectionImageBox = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CollectionSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WallpaperSection = styled.section`
  padding: 0;
  margin: 3rem 2rem;
  background: url("/images/image_wallplast.png") center/cover;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  min-height: 450px;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const WallpaperContent = styled.div`
  padding: 3rem;
  max-width: 500px;
  color: white;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const WallpaperTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const WallpaperText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const WallpaperButton = styled.button`
  background: white;
  color: #2d3748;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f7fafc;
    transform: translateY(-2px);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: #718096;
`;

export default function Home() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const recentScrollRef = useRef<HTMLDivElement>(null);
  const newScrollRef = useRef<HTMLDivElement>(null);
  const dealScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const [recent, newItems, deals] = await Promise.all([
        productApi.getAll({ page: 1, limit: 8 }),
        productApi.getAll({ page: 2, limit: 8 }),
        productApi.getAll({ page: 3, limit: 8 }),
      ]);
      setRecentProducts(recent.products);
      setNewProducts(newItems.products);
      setDealProducts(deals.products);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    { name: "บทความ", icon: "📄" },
    { name: "Tile", icon: "🔲" },
    { name: "Stone", icon: "🪨" },
    { name: "Wood", icon: "🌳" },
    { name: "Mirror", icon: "🪞" },
    { name: "WTC", icon: "🏗️" },
    { name: "Metrial", icon: "⚙️" },
    { name: "All Product", icon: "📦" },
  ];

  const renderProductCarousel = (
    products: Product[],
    scrollRef: React.RefObject<HTMLDivElement | null>
  ) => (
    <ProductCarousel>
      <CarouselButton
        direction="left"
        onClick={() => scroll(scrollRef, "left")}
      >
        <FiChevronLeft size={20} />
      </CarouselButton>
      <ProductScrollContainer ref={scrollRef}>
        {products.map((product) => (
          <ProductCardWrapper key={product._id}>
            <ProductCard product={product} />
          </ProductCardWrapper>
        ))}
      </ProductScrollContainer>
      <CarouselButton
        direction="right"
        onClick={() => scroll(scrollRef, "right")}
      >
        <FiChevronRight size={20} />
      </CarouselButton>
    </ProductCarousel>
  );

  if (loading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  return (
    <>
      <HeroSection>
        <BannerContent>
          <BannerTitle>BANNER XSURFACE</BannerTitle>
          <BannerSize>1440x472 px</BannerSize>
        </BannerContent>
      </HeroSection>

      <CategorySection>
        <Container>
          <SectionHeader>
            <SectionTitle>หมวดหมู่</SectionTitle>
          </SectionHeader>
          <CategoryScroll>
            {categories.map((category) => (
              <CategoryItem key={category.name}>
                <CategoryIconBox>{category.icon}</CategoryIconBox>
                <CategoryName>{category.name}</CategoryName>
              </CategoryItem>
            ))}
          </CategoryScroll>
        </Container>
      </CategorySection>

      <ProductSection>
        <Container>
          <SectionHeader>
            <SectionTitle>ดูล่าสุด</SectionTitle>
            <ViewAllLink>
              ดูทั้งหมด <FiChevronRight />
            </ViewAllLink>
          </SectionHeader>
          {renderProductCarousel(recentProducts, recentScrollRef)}
        </Container>
      </ProductSection>

      <ProductSection background="#f7fafc">
        <Container>
          <SectionHeader>
            <SectionTitle>สินค้ามาใหม่ / แนะนำ</SectionTitle>
            <ViewAllLink>
              ดูทั้งหมด <FiChevronRight />
            </ViewAllLink>
          </SectionHeader>
          {renderProductCarousel(newProducts, newScrollRef)}
        </Container>
      </ProductSection>

      <ExclusiveDealSection>
        <Container>
          <SectionHeader>
            <SectionTitle>Exclusive Deal</SectionTitle>
            <ViewAllLink>
              ดูทั้งหมด <FiChevronRight />
            </ViewAllLink>
          </SectionHeader>
          {renderProductCarousel(dealProducts, dealScrollRef)}
        </Container>
      </ExclusiveDealSection>

      <CollectionSection>
        <Container>
          <SectionHeader>
            <SectionTitle>Collections</SectionTitle>
            <ViewAllLink>
              คอลเล็กชันทั้งหมด <FiChevronRight />
            </ViewAllLink>
          </SectionHeader>
          <CollectionGrid>
            <CollectionImageBox>
              <img src="/images/image_collection.png" alt="Collection" />
            </CollectionImageBox>
            <CollectionSidebar>
              {recentProducts.slice(0, 2).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </CollectionSidebar>
          </CollectionGrid>
        </Container>
      </CollectionSection>

      <Container>
        <WallpaperSection>
          <WallpaperContent>
            <WallpaperTitle>Wallpaper</WallpaperTitle>
            <WallpaperText>
              ปรับแต่งผนังบ้านของคุณด้วยวอลล์เปเปอร์คุณภาพสูง
              หลากหลายลวดลายและสไตล์ให้เลือก เพื่อบ้านที่สวยงามและทันสมัย
            </WallpaperText>
            <WallpaperButton>View Packs</WallpaperButton>
          </WallpaperContent>
        </WallpaperSection>
      </Container>
    </>
  );
}
