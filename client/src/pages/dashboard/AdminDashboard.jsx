import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api, { productAPI, orderAPI } from '../../api/api';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // States
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', stock: '', category: '', image_url: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'users') {
        const res = await api.get('/users');
        setUsers(res.data);
      } else if (activeTab === 'orders') {
        const res = await orderAPI.getAll();
        setOrders(res.data);
      } else if (activeTab === 'products') {
        const res = await productAPI.getAll();
        setProducts(res.data);
      }
    } catch (err) {
      console.error(`Failed to fetch ${activeTab}`, err);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productAPI.create(productForm);
      toast.success('Product added successfully!');
      setProductForm({ name: '', description: '', price: '', stock: '', category: '', image_url: '' });
      fetchData(); // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDeliveryStatus = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, status);
      toast.success("Order status updated!");
      fetchData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-8">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto pt-32 px-6"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {['users', 'products', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Username</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                        <td className="py-3 px-4">{u.id}</td>
                        <td className="py-3 px-4">{u.username}</td>
                        <td className="py-3 px-4 text-gray-400">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 min-h-[100px]"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Category"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
                  >
                    {loading ? 'Adding...' : 'Add Product'}
                  </button>
                </form>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Current Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <h3 className="font-bold">{p.name}</h3>
                      <p className="text-gray-400 text-sm truncate">{p.description}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-blue-400 font-bold">${p.price}</span>
                        <span className="text-gray-400 text-xs text-right">Stock: {p.stock}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">View All Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Delivery</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors text-sm">
                        <td className="py-3 px-4">#{o.id}</td>
                        <td className="py-3 px-4">{o.username}<br /><span className="text-xs text-gray-500">{o.email}</span></td>
                        <td className="py-3 px-4">${o.total_amount}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">{o.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${o.delivery_status === 'shipped' ? 'bg-blue-500/20 text-blue-400' : o.delivery_status === 'delivered' ? 'bg-purple-500/20 text-purple-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                            {o.delivery_status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            className="bg-gray-700 border border-gray-600 rounded text-xs px-2 py-1 focus:outline-none"
                            value={o.delivery_status}
                            onChange={(e) => handleUpdateDeliveryStatus(o.id, e.target.value)}
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;