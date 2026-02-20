import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const FloatingCube = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <MeshDistortMaterial
        color="#4f46e5"
        emissive="#312e81"
        roughness={0.2}
        metalness={0.8}
        distort={0.3}
        speed={2}
      />
    </mesh>
  );
};

const FloatingSphere = ({ position, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

const Hero3D = () => {
  return (
    <div className="h-screen w-full relative">
      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        
        <Environment preset="city" />
        
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
          <FloatingCube />
        </Float>
        
        <FloatingSphere position={[3, 1, -2]} color="#8b5cf6" />
        <FloatingSphere position={[-3, -1, -2]} color="#3b82f6" />
        <FloatingSphere position={[2, -2, -1]} color="#ec4899" />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">VISIONAIRE</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Experience products in stunning 3D and immersive VR
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold text-lg transition-all hover-glow">
              Explore in 3D
            </button>
            <button className="px-8 py-4 glass-effect hover:bg-white/20 rounded-lg font-semibold text-lg transition-all">
              Enter VR Mode
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center gap-8 mt-16"
          >
            <div>
              <div className="text-3xl font-bold gradient-text">1000+</div>
              <div className="text-gray-400">3D Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">50K+</div>
              <div className="text-gray-400">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-gray-400">VR Support</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default Hero3D;