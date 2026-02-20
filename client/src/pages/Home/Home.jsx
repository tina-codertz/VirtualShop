import React from 'react';

import { motion } from 'framer-motion';
import Hero3D from './Hero3D';
import ProductCard from './ProductCard';
import Navbar from '../../components/Navbar';



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
            <span className="gradient-text text-white">Featured Products</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our collection of 3D-ready products. Each item can be viewed in immersive VR mode.
          </p>
        </motion.div>

        
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
              <span className="gradient-text text-white">Why Choose Virtual shop</span>
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

 
    </div>
  );
};

export default Home;