import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import Hero3D from './Hero3D';
import ProductCard from './ProductCard';
import Navbar from '../../components/Navbar';
import { productAPI } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productAPI.getAll(category || undefined);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    (product.category || '').toLowerCase().includes(search.toLowerCase())
  );

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <Hero3D />
      </section>

      {/* Products Section */}
      <section id="products" className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text text-white">Browse Products</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-xl">
              Explore our collection of 3D-ready products, filter by category, and find exactly what you need.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 px-4 py-2 bg-slate-900/70 border border-slate-700 rounded-lg focus:outline-none focus:border-emerald-400 text-sm text-slate-100"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-44 px-4 py-2 bg-slate-900/70 border border-slate-700 rounded-lg focus:outline-none focus:border-emerald-400 text-sm text-slate-100"
            >
              <option value="">All categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text text-white">Why Choose Virtual Shop</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience shopping like never before with our cutting-edge 3D and VR technology, flexible payments, and tracked delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎮',
                title: 'Immersive 3D & VR',
                description: 'View products from every angle with photorealistic 3D rendering.',
              },
              {
                icon: '💳',
                title: 'Secure Checkout',
                description: 'Add items to cart and complete payment in a smooth, guided flow.',
              },
              {
                icon: '🚚',
                title: 'Tracked Delivery',
                description: 'Admins manage delivery status so you always know where your order is.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;