/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { productApi } from "@/lib/api";
import { ProductFormData } from "@/types/product";
import { FiUpload, FiX } from "react-icons/fi";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #2d3748;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const UploadArea = styled.div<{ $hasImage: boolean }>`
  border: 2px dashed ${(props) => (props.$hasImage ? "#667eea" : "#e2e8f0")};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.$hasImage ? "#f7fafc" : "white")};

  &:hover {
    border-color: #667eea;
    background: #f7fafc;
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 1rem;
  color: #667eea;
`;

const UploadText = styled.p`
  color: #4a5568;
  margin: 0.5rem 0;
`;

const UploadSubtext = styled.p`
  color: #a0aec0;
  font-size: 0.875rem;
  margin: 0;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin: 1rem auto 0;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #2f855a;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export default function UploadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    code: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError("File size must be less than 50MB");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.code ||
      !formData.price ||
      !formData.image
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await productApi.create(formData);
      setSuccess("Product uploaded successfully!");
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/products");
  };

  return (
    <Container>
      <Title>Upload Product</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Upload image</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <UploadArea $hasImage={!!imagePreview}>
              <UploadIcon>
                <FiUpload size={48} />
              </UploadIcon>
              <UploadText>
                Drag & Drop or{" "}
                <span style={{ color: "#667eea", textDecoration: "underline" }}>
                  Choose file
                </span>{" "}
                to upload
              </UploadText>
              <UploadSubtext>
                .JPG, or PNG. Maximum file size 50MB.
              </UploadSubtext>
            </UploadArea>
          </label>
          {imagePreview && (
            <ImagePreview>
              <img src={imagePreview} alt="Preview" />
              <RemoveImageButton type="button" onClick={removeImage}>
                <FiX size={18} />
              </RemoveImageButton>
            </ImagePreview>
          )}
          <p
            style={{
              fontSize: "0.875rem",
              color: "#a0aec0",
              marginTop: "0.5rem",
            }}
          >
            Image upload {formData.image ? "(1/1)" : "(0/1)"}
          </p>
        </FormGroup>

        <FormGroup>
          <Label>Product name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Code</Label>
          <Input
            type="text"
            name="code"
            placeholder="Code"
            value={formData.code}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            placeholder="฿1,000"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
        </FormGroup>

        <FormGroup>
          <Label>Category (Optional)</Label>
          <Input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Description (Optional)</Label>
          <TextArea
            name="description"
            placeholder="Product description..."
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button type="submit" $primary disabled={loading}>
            {loading ? "Uploading..." : "ยืนยัน"}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}
