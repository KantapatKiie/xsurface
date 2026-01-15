"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { productApi } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { FiSearch } from "react-icons/fi";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchBox = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #a0aec0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: #718096;
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: #718096;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${(props) => (props.$active ? "#667eea" : "#e2e8f0")};
  background: ${(props) => (props.$active ? "#667eea" : "white")};
  color: ${(props) => (props.$active ? "white" : "#2d3748")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    loadProducts();
  }, [searchTerm, currentPage]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAll({
        search: searchTerm || undefined,
        page: currentPage,
        limit,
      });
      setProducts(response.products);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadProducts();
  };

  return (
    <Container>
      <Header>
        <Title>Product list</Title>
        <SearchContainer>
          <SearchBox>
            <SearchIcon>
              <FiSearch size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Name, Catalogue, Code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </SearchBox>
        </SearchContainer>
      </Header>

      {loading ? (
        <LoadingMessage>Loading products...</LoadingMessage>
      ) : products.length === 0 ? (
        <NoProducts>No products found</NoProducts>
      ) : (
        <>
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductGrid>

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PageButton
                    key={page}
                    $active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PageButton>
                )
              )}
              <PageButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
}
