import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, page = 1, limit = 20 } = req.query;
    
    let query: any = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, code, price, category, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    
    const existingProduct = await Product.findOne({ code });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product code already exists' });
    }
    
    const product = new Product({
      name,
      code,
      price: Number(price),
      category,
      description,
      image,
    });
    
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, code, price, category, description } = req.body;
    const updateData: any = { name, code, price: Number(price), category, description };
    
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories.filter(Boolean));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
