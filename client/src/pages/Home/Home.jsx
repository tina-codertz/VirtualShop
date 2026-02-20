import React from 'react';

import { motion } from 'framer-motion';
import Hero3D from './Hero3D';
import ProductCard from './ProductCard';
import Navbar from '../../components/Navbar';

const sampleProducts = [
  {
    id: 1,
    name: 'Cyberpunk Headphones',
    description: 'Immersive 3D audio with holographic design',
    price: 299.99,
  },
  {
    id: 2,
    name: 'Holographic Watch',
    description: '3D time display with VR synchronization',
    price: 499.99,
  },
  {
    id: 3,
    name: 'Neural VR Headset',
    description: 'Next-gen VR experience with 8K per eye',
    price: 899.99,
  },
  {
    id: 4,
    name: 'Haptic Gaming Gloves',
    description: 'Feel the virtual world with precise haptics',
    price: 399.99,
  },
  {
    id: 5,
    name: '3D Scanner Pro',
    description: 'Scan objects and view them in VR instantly',
    price: 1299.99,
  },
  {
    id: 6,
    name: 'Holographic Display',
    description: 'View 3D models without glasses',
    price: 1999.99,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Products</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our collection of 3D-ready products. Each item can be viewed in immersive VR mode.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
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
              <span className="gradient-text">Why Choose VISIONAIRE</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience shopping like never before with our cutting-edge 3D and VR technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎮',
                title: 'Immersive 3D',
                description: 'View products from every angle with photorealistic 3D rendering',
              },
              {
                icon: '🥽',
                title: 'VR Ready',
                description: 'Step into virtual showrooms with full VR headset support',
              },
              {
                icon: '⚡',
                title: 'Real-time Interaction',
                description: 'Interact with products in real-time, rotate, zoom, and customize',
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

      {/* Footer */}
      <footer className="bg-gray-950 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold">VR</span>
              </div>
              <span className="text-2xl font-bold gradient-text">VISIONAIRE</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 VISIONAIRE. All rights reserved. Experience the future of shopping.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;