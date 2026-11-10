import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ShoppingCart, Store, MapPin, Search, CheckCircle2, Navigation, Send, LogOut, ShieldAlert, Plus, Trash2, Edit, Save, X, Truck, Image as ImageIcon, Map, Zap, User, Clock, CreditCard, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';
import { load } from '@cashfreepayments/cashfree-js';

// --- CONFIGURATION ---
const STORE_PHONE = "917858967429"; 
const STORE_LAT = 26.085583; 
const STORE_LON = 87.113833;
const ADMIN_PIN = "Admin@Aman2026"; 
const BACKEND_URL = "https://in-minutes-backend.onrender.com/api";

// --- EXTENSIVE PRODUCT DATABASE ---
const initialProducts = [
  // --- GROCERY ---
  { id: 1, category: 'Grocery', name: 'Aalu (Potato)', price: 13, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/1YjD4mCJBuzZxZggWeIE/image.png', available: true, isWeighable: true },
  { id: 2, category: 'Grocery', name: 'Pyaj (Onion)', price: 50, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/0c6nDnfw5cdi4YLUKUbm/image.png', available: true, isWeighable: true },
  { id: 3, category: 'Grocery', name: 'Chini (Sugar)', price: 60, image: 'https://images.unsplash.com/photo-1673791031093-eb8eefa60083?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', available: true, isWeighable: true },
  { id: 4, category: 'Grocery', name: 'Tata Namak (1kg Packet)', price: 28, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/765MUNcIXIZWRciExUSa/image.png', available: true, isWeighable: false },
  { id: 5, category: 'Grocery', name: 'Ahilaya Bhog Atta (5kg)', price: 180, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/Sol5VVRWEpKjTNUjryK5/image.png', available: true, isWeighable: false },
  { id: 6, category: 'Grocery', name: 'Chana Dal', price: 90, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/N1Ems3uDqZLCtBl7VR58/image.png', available: true, isWeighable: true },
  { id: 7, category: 'Grocery', name: 'Arhar Dal', price: 180, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/GxWPL53DskJGZ0o5Uvxh/image.png', available: true, isWeighable: true },
  { id: 8, category: 'Grocery', name: 'Ruchi Refined Oil (1L)', price: 130, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/k3RHjllaiQ4jdeHfFnGl/image.png', available: true, isWeighable: false },
  { id: 9, category: 'Grocery', name: 'Haldi Powder (50g)', price: 15, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/2IN87f0JywBEhkPvXQcD/image.png', available: true, isWeighable: false },
  { id: 10, category: 'Grocery', name: 'Jeera (50g)', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/kjxzevCZCf44QUfeSCSS/image.png', available: true, isWeighable: false },
  { id: 11, category: 'Grocery', name: 'Chai Patti (250g)', price: 130, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/SU43reTfHhnBtZVVvN0U/image.png', available: true, isWeighable: false },
  { id: 12, category: 'Grocery', name: 'Makhana (250g)', price: 300, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/Fm7EPFKHmBXdLhexs262/image.png', available: true, isWeighable: false },
  { id: 13, category: 'Grocery', name: 'Khada Garam Masala', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/QbcmeQcxr9FrMrmfEJNn/image.png', available: true, isWeighable: false },
  { id: 14, category: 'Grocery', name: 'Garlic Paste / Lahsun', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/QYjFQ4HG7Wn4Zzgs4NGC/image.png', available: true, isWeighable: false },
  { id: 55, category: 'Grocery', name: 'Cashew (Kaju) 250g', price: 225, image: '', available: true, isWeighable: false },
  { id: 56, category: 'Grocery', name: 'Cashew (Kaju) 100g', price: 90, image: '', available: true, isWeighable: false },
  { id: 57, category: 'Grocery', name: 'Kishmish 250g', price: 150, image: '', available: true, isWeighable: false },
  { id: 58, category: 'Grocery', name: 'Kishmish 100g', price: 60, image: '', available: true, isWeighable: false },
  { id: 59, category: 'Grocery', name: 'Almond 250g', price: 300, image: '', available: true, isWeighable: false },
  { id: 60, category: 'Grocery', name: 'Chuara 100g', price: 12, image: '', available: true, isWeighable: false },
  { id: 61, category: 'Grocery', name: 'Chuara 1kg', price: 120, image: '', available: true, isWeighable: false },
  { id: 62, category: 'Grocery', name: 'Kalyan Oil 500ml', price: 105, image: '', available: true, isWeighable: false },
  { id: 63, category: 'Grocery', name: 'Kalyan Oil 1 Ltr', price: 210, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/aWMSOvMhRumQFhDvJVZA/image.png', available: true, isWeighable: false },
  { id: 64, category: 'Grocery', name: 'Kalyan Oil 2 Ltr', price: 420, image: '', available: true, isWeighable: false },
  { id: 65, category: 'Grocery', name: 'Dhara Oil 500ml', price: 105, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/WbmjnBDn4Qoz5bxoyB5w/image.png', available: true, isWeighable: false },
  { id: 66, category: 'Grocery', name: 'Dhara Oil 1 Ltr', price: 210, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/kpNl1J422DAGpXzoJcwC/image.png', available: true, isWeighable: false },
  { id: 67, category: 'Grocery', name: 'Dhara Oil 2 Ltr', price: 420, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/LFFPvbfjHdlX7gCMWiS6/image.png', available: true, isWeighable: false },
  { id: 68, category: 'Grocery', name: 'Dhara Pouch 1 Ltr', price: 200, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/vSslVKIvLczGARSAQMZ6/image.png', available: true, isWeighable: false },
  { id: 69, category: 'Grocery', name: 'Best Choice Refine 500ml', price: 85, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/xoaz4iBg0oZ229dj2GOx/image.png', available: true, isWeighable: false },
  { id: 70, category: 'Grocery', name: 'Best Choice Refine 1 Ltr', price: 165, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/9wGm89DuIeK6Jk1QcPDS/image.png', available: true, isWeighable: false },
  { id: 79, category: 'Grocery', name: 'Kala Chana 1kg', price: 90, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Knquak6SPnK2ZGehECdV/image.png', available: true, isWeighable: false },
  { id: 80, category: 'Grocery', name: 'Massorie Dal 1kg', price: 90, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/8HQhk5N5hNP6pgOk5NXn/image.png', available: true, isWeighable: false },
  { id: 81, category: 'Grocery', name: 'Massorie Dal 4 Tukri 1kg', price: 80, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/6fHx2bO92zLa7xkcsW1y/image.png', available: true, isWeighable: false },
  { id: 82, category: 'Grocery', name: 'Maida 500g', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/JUYcvm0xiplg7ZEwI5Fj/image.png', available: true, isWeighable: false },
  { id: 83, category: 'Grocery', name: 'Maida Loose 1kg', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/JUYcvm0xiplg7ZEwI5Fj/image.png', available: true, isWeighable: false },
  { id: 84, category: 'Grocery', name: 'Atta Loose 1kg', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/CbwWpGJWQbgXe1xQdFhC/image.png', available: true, isWeighable: false },
  { id: 85, category: 'Grocery', name: 'Sooji 150g', price: 10, image: '', available: true, isWeighable: false },
  { id: 86, category: 'Grocery', name: 'Sooji 500g', price: 25, image: '', available: true, isWeighable: false },
  { id: 87, category: 'Grocery', name: 'Sewai Patla 1pc', price: 10, image: '', available: true, isWeighable: false },
  { id: 88, category: 'Grocery', name: 'Sewai Mota 1pc', price: 10, image: '', available: true, isWeighable: false },
  { id: 89, category: 'Grocery', name: 'CRM Rice 26kg', price: 1000, image: '', available: true, isWeighable: false },
  { id: 90, category: 'Grocery', name: 'Arun Rice 25kg', price: 920, image: '', available: true, isWeighable: false },
  { id: 91, category: 'Grocery', name: 'Green Plough Rice 26kg', price: 950, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/L94hxMrF6qe07iStPbzw/image.png', available: true, isWeighable: false },
  { id: 92, category: 'Grocery', name: 'Wheat/Gehu 1kg', price: 30, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/iD08TF2j90ACRzGAGBjQ/image.png', available: true, isWeighable: false },
  { id: 93, category: 'Grocery', name: 'Rice 1kg', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/TyAilaHP5J3Irg89qnfU/image.png', available: true, isWeighable: false },
  { id: 94, category: 'Grocery', name: 'Pasta 1kg', price: 60, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/9MMIRtFmX6nuLne2GeFD/image.png', available: true, isWeighable: false },
  { id: 95, category: 'Grocery', name: 'Pasta 500g', price: 30, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/9MMIRtFmX6nuLne2GeFD/image.png', available: true, isWeighable: false },
  { id: 96, category: 'Grocery', name: 'Pasta 250g', price: 15, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/9MMIRtFmX6nuLne2GeFD/image.png', available: true, isWeighable: false },
  { id: 97, category: 'Grocery', name: 'Mishri 1 Packet', price: 10, image: '', available: true, isWeighable: false },
  { id: 98, category: 'Grocery', name: 'Ram dana 1 Packet', price: 10, image: '', available: true, isWeighable: false },
  { id: 99, category: 'Grocery', name: 'Besan 200g', price: 30, image: '', available: true, isWeighable: false },
  { id: 100, category: 'Grocery', name: 'Besan 500g', price: 65, image: '', available: true, isWeighable: false },
  { id: 162, category: 'Grocery', name: 'Mudhi 2kg', price: 200, image: '', available: true, isWeighable: false },
  { id: 163, category: 'Grocery', name: 'Mudhi 1kg', price: 150, image: '', available: true, isWeighable: false },
  { id: 164, category: 'Grocery', name: 'Mudhi 500g', price: 90, image: '', available: true, isWeighable: false },
  { id: 165, category: 'Grocery', name: 'Mudhi (Rs 15 Pack)', price: 15, image: '', available: true, isWeighable: false },
  { id: 167, category: 'Grocery', name: 'Ankur Salt (Rs 13)', price: 13, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/vbxCjcHgivmZSu6rdKT2/image.png', available: true, isWeighable: false },
  { id: 168, category: 'Grocery', name: 'Ankur Salt (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/EBfjsFCJKHHYn3c77MDq/image.png', available: true, isWeighable: false },
  { id: 186, category: 'Grocery', name: 'Mirch Powder 50g', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/zITtvNV5WKp8OLHGlLGV/image.png', available: true, isWeighable: false },
  { id: 187, category: 'Grocery', name: 'Mirch Powder 250g', price: 80, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/70aeUCoKWbSd6zScVh36/image.png', available: true, isWeighable: false },
  { id: 188, category: 'Grocery', name: 'Dhaniya Powder 50g', price: 15, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Ga0ztsyhbqiLz6O8YpL0/image.png', available: true, isWeighable: false },
  { id: 189, category: 'Grocery', name: 'Dhaniya Powder 250g', price: 55, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Ga0ztsyhbqiLz6O8YpL0/image.png', available: true, isWeighable: false },
  { id: 190, category: 'Grocery', name: 'Haldi Powder 50g', price: 15, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/mtjRtm6QSjnanQDFaVFQ/image.png', available: true, isWeighable: false },
  { id: 191, category: 'Grocery', name: 'Haldi Powder 250g', price: 75, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/mtjRtm6QSjnanQDFaVFQ/image.png', available: true, isWeighable: false },
  { id: 192, category: 'Grocery', name: 'Mix Masala 50g', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/6cPVVLFT3ZyBfSEakFcC/image.png', available: true, isWeighable: false },
  { id: 193, category: 'Grocery', name: 'Mix Masala 250g', price: 75, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/6cPVVLFT3ZyBfSEakFcC/image.png', available: true, isWeighable: false },
  { id: 194, category: 'Grocery', name: 'Meat Masala 100g', price: 100, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/b1YZwtRXKtDQIAN0QN3b/image.png', available: true, isWeighable: false },
  { id: 195, category: 'Grocery', name: 'Meat Masala (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Bv8eWbrFZ98ka0cmU7ae/image.png', available: true, isWeighable: false },
  { id: 196, category: 'Grocery', name: 'Meat Masala (Rs 5)', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/dbmjb1qgwCKMGx4luvQX/image.png', available: true, isWeighable: false },
  { id: 197, category: 'Grocery', name: 'Garam Masala (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/iwsCifQt0N6VxI66nDNV/image.png', available: true, isWeighable: false },
  { id: 198, category: 'Grocery', name: 'Garam Masala (Rs 5)', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/iwjRb3Ku88jWeAI3uIyS/image.png', available: true, isWeighable: false },
  { id: 199, category: 'Grocery', name: 'Kashmiri Mirch 100g', price: 125, image: '', available: true, isWeighable: false },
  { id: 200, category: 'Grocery', name: 'Kitchen King 100g', price: 100, image: '', available: true, isWeighable: false },
  { id: 201, category: 'Grocery', name: 'Sabji Masala 100g', price: 82, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/ubIzxe3Uvfg7hkRk43el/image.png', available: true, isWeighable: false },
  { id: 202, category: 'Grocery', name: 'Kheer Masala', price: 10, image: '', available: true, isWeighable: false },
  { id: 203, category: 'Grocery', name: 'Jeera Powder (Rs 5)', price: 5, image: '', available: true, isWeighable: false },
  { id: 204, category: 'Grocery', name: 'Jeera 100g', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/ErY7ZaSQDgcWv4YLLr5M/image.png', available: true, isWeighable: false },
  { id: 205, category: 'Grocery', name: 'Jeera 250g', price: 100, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/ptIubuqjpwVj9QhJVuAx/image.png', available: true, isWeighable: false },
  { id: 206, category: 'Grocery', name: 'Methi', price: 10, image: '', available: true, isWeighable: false },
  { id: 207, category: 'Grocery', name: 'Saunf', price: 10, image: '', available: true, isWeighable: false },
  { id: 208, category: 'Grocery', name: 'Elaichi', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/EIbMRAuaJS4uViTq96Oj/image.png', available: true, isWeighable: false },
  { id: 209, category: 'Grocery', name: 'Jamain', price: 10, image: '', available: true, isWeighable: false },
  { id: 210, category: 'Grocery', name: 'Laung/Clove', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/8sYFFY9k7EX5xBIdQNvc/image.png', available: true, isWeighable: false },
  { id: 211, category: 'Grocery', name: 'Kala Marich', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/PElfcl0SAjKgQ9Vrgmhf/image.png', available: true, isWeighable: false },
  { id: 212, category: 'Grocery', name: 'Hing', price: 45, image: '', available: true, isWeighable: false },
  { id: 213, category: 'Grocery', name: 'Panch Phoran', price: 10, image: '', available: true, isWeighable: false },
  { id: 214, category: 'Grocery', name: 'Jeera Powder 500g', price: 390, image: '', available: true, isWeighable: false },
  { id: 215, category: 'Grocery', name: 'Fortune Soyabean', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/LvBMAR7MfYu3rIlatHxW/image.png', available: true, isWeighable: false },
  { id: 216, category: 'Grocery', name: 'Sattu 200g', price: 30, image: '', available: true, isWeighable: false },
  { id: 217, category: 'Grocery', name: 'Sattu 500g', price: 70, image: '', available: true, isWeighable: false },
  { id: 218, category: 'Grocery', name: 'Suraj Papad Packet', price: 110, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/EzLtuRyvhBpbnd0AbhqP/image.png', available: true, isWeighable: false },
  { id: 219, category: 'Grocery', name: 'Lijjat Papad Packet', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/5FvAYZP5JRGPisjJld58/image.png', available: true, isWeighable: false },
  { id: 234, category: 'Grocery', name: 'Chai Patti 100g', price: 50, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/vSDKY6bsIGVuKAlII6od/image.png', available: true, isWeighable: false },
  { id: 235, category: 'Grocery', name: 'Chai Patti 50g', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/vSDKY6bsIGVuKAlII6od/image.png', available: true, isWeighable: false },
  { id: 236, category: 'Grocery', name: 'Chai Patti (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/vSDKY6bsIGVuKAlII6od/image.png', available: true, isWeighable: false },
  { id: 237, category: 'Grocery', name: 'Mahavira Chai Patti 200g', price: 60, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/nkq4SZ4VIgwMvHCJRMCz/image.png', available: true, isWeighable: false },
  { id: 238, category: 'Grocery', name: 'Mahavira Chai Patti 100g', price: 32, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/nkq4SZ4VIgwMvHCJRMCz/image.png', available: true, isWeighable: false },
  { id: 269, category: 'Grocery', name: 'Sukha Mirch 250g', price: 70, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Sw3CDxytti0VajoW2SFG/image.png', available: true, isWeighable: false },
  { id: 270, category: 'Grocery', name: 'Sukha Mirch 500g', price: 140, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Sw3CDxytti0VajoW2SFG/image.png', available: true, isWeighable: false },
  { id: 271, category: 'Grocery', name: 'Garlic / Lehsun 1kg', price: 160, image: '', available: true, isWeighable: false },
  { id: 272, category: 'Grocery', name: 'Supari 50g', price: 30, image: '', available: true, isWeighable: false },
  { id: 273, category: 'Grocery', name: 'Supari 100g', price: 60, image: '', available: true, isWeighable: false },

  // --- GREEN VEGETABLES ---
  { id: 308, category: 'Green Vegetables', name: 'Ful Ghobhi 1kg', price: 50, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/k3KcoIiGjrUJyB9wnvAq/image.png', available: true, isWeighable: true },
  { id: 309, category: 'Green Vegetables', name: 'Patta Ghobhi 1kg', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Mru8fGSmjSaEDPqLNQZy/image.png', available: true, isWeighable: true },
  { id: 310, category: 'Green Vegetables', name: 'Baingan 1kg', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/dYRkXg468UriaCiP3eZk/image.png', available: true, isWeighable: true },
  { id: 311, category: 'Green Vegetables', name: 'Bhindi 1kg', price: 30, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/r8VZh0JGkqCaoPD61qbt/image.png', available: true, isWeighable: true },
  { id: 312, category: 'Green Vegetables', name: 'Loki 1pc', price: 15, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/YHnVNmE6P1HNo8TLgG8w/image.png', available: true, isWeighable: false },

  // --- SNACKS ---
  { id: 15, category: 'Snacks', name: 'Bikaji Soan Papdi (400g)', price: 120, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/dyMJy7Lv2V7RlzK3ZjUu/image.png', available: true, isWeighable: false },
  { id: 16, category: 'Snacks', name: 'Bikaji Rasogulla (1kg)', price: 250, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/U1cfHSP44Pdci6qo6O0H/image.png', available: true, isWeighable: false },
  { id: 17, category: 'Snacks', name: 'Parle G Biscuit', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/9a8iHGtfDlrNZgpYdZ7W/image.png', available: true, isWeighable: false },
  { id: 18, category: 'Snacks', name: 'Good Day Biscuit', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/Hir6UrpcE9AcKPkKnKVq/image.png', available: true, isWeighable: false },
  { id: 19, category: 'Snacks', name: 'Bingo Tedhe Medhe', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/c2vncmhgTbuCFDWnkbiN/image.png', available: true, isWeighable: false },
  { id: 20, category: 'Snacks', name: 'Kurkure', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/9ZroJV3K017BqbZPfNWn/image.png', available: true, isWeighable: false },
  { id: 101, category: 'Snacks', name: 'Maggie 1pc', price: 7, image: '', available: true, isWeighable: false },
  { id: 102, category: 'Snacks', name: 'Sobisco Yum Yum Green 1pc', price: 5, image: '', available: true, isWeighable: false },
  { id: 103, category: 'Snacks', name: 'Sobisco Yum Yum Yellow 1pc', price: 5, image: '', available: true, isWeighable: false },
  { id: 104, category: 'Snacks', name: 'Marie Gold (Rs 40 Pack)', price: 40, image: '', available: true, isWeighable: false },
  { id: 105, category: 'Snacks', name: 'Marie Gold (Rs 10 Pack)', price: 10, image: '', available: true, isWeighable: false },
  { id: 106, category: 'Snacks', name: 'Marie Gold (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 107, category: 'Snacks', name: 'Hamara Marie', price: 30, image: '', available: true, isWeighable: false },
  { id: 108, category: 'Snacks', name: 'Dream Lite (Rs 15 Pack)', price: 15, image: '', available: true, isWeighable: false },
  { id: 109, category: 'Snacks', name: 'Dream Lite (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 110, category: 'Snacks', name: 'Patanjali Doodh (Rs 40 Pack)', price: 40, image: '', available: true, isWeighable: false },
  { id: 111, category: 'Snacks', name: 'Patanjali Doodh (Rs 10 Pack)', price: 10, image: '', available: true, isWeighable: false },
  { id: 112, category: 'Snacks', name: 'Patanjali Doodh (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 113, category: 'Snacks', name: 'Anmol Milk', price: 5, image: '', available: true, isWeighable: false },
  { id: 114, category: 'Snacks', name: 'Top Gold', price: 10, image: '', available: true, isWeighable: false },
  { id: 115, category: 'Snacks', name: 'Top Jeera', price: 10, image: '', available: true, isWeighable: false },
  { id: 116, category: 'Snacks', name: 'Parle Top', price: 25, image: '', available: true, isWeighable: false },
  { id: 117, category: 'Snacks', name: 'Honey Bunny Rusk (Rs 10 Pack)', price: 10, image: '', available: true, isWeighable: false },
  { id: 118, category: 'Snacks', name: 'Honey Bunny Rusk (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 119, category: 'Snacks', name: 'Butter Bake', price: 20, image: '', available: true, isWeighable: false },
  { id: 120, category: 'Snacks', name: 'Independence Glucose', price: 5, image: '', available: true, isWeighable: false },
  { id: 121, category: 'Snacks', name: 'Independence Cookies', price: 5, image: '', available: true, isWeighable: false },
  { id: 122, category: 'Snacks', name: 'Patanjali Kaju', price: 35, image: '', available: true, isWeighable: false },
  { id: 123, category: 'Snacks', name: 'Kaju Bake', price: 20, image: '', available: true, isWeighable: false },
  { id: 124, category: 'Snacks', name: 'Happy Happy', price: 5, image: '', available: true, isWeighable: false },
  { id: 125, category: 'Snacks', name: 'Tiger Cream', price: 5, image: '', available: true, isWeighable: false },
  { id: 126, category: 'Snacks', name: 'Good Day (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 127, category: 'Snacks', name: 'Anmol Coconut Premium', price: 35, image: '', available: true, isWeighable: false },
  { id: 128, category: 'Snacks', name: 'Parle G (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 129, category: 'Snacks', name: 'Baker Bisk', price: 5, image: '', available: true, isWeighable: false },
  { id: 130, category: 'Snacks', name: 'Sweet Khasta Biscuit', price: 20, image: '', available: true, isWeighable: false },
  { id: 131, category: 'Snacks', name: 'Namkeen Khasta Biscuit', price: 20, image: '', available: true, isWeighable: false },
  { id: 132, category: 'Snacks', name: 'Bread', price: 10, image: '', available: true, isWeighable: false },
  { id: 133, category: 'Snacks', name: 'Cake', price: 5, image: '', available: true, isWeighable: false },
  { id: 134, category: 'Snacks', name: 'Bikaji Bhujiya 200g', price: 60, image: '', available: true, isWeighable: false },
  { id: 135, category: 'Snacks', name: 'Bikaji Bhujiya 400g', price: 110, image: '', available: true, isWeighable: false },
  { id: 136, category: 'Snacks', name: 'Bikaji Bhujiya (Rs 10 Pack)', price: 10, image: '', available: true, isWeighable: false },
  { id: 137, category: 'Snacks', name: 'Bikaji Bhujiya (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 138, category: 'Snacks', name: 'Kuch-Kuch Bhujiya 400g', price: 110, image: '', available: true, isWeighable: false },
  { id: 139, category: 'Snacks', name: 'Kuch-Kuch Bhujiya 200g', price: 60, image: '', available: true, isWeighable: false },
  { id: 140, category: 'Snacks', name: 'Kuch-Kuch Bhujiya (Rs 10 Pack)', price: 10, image: '', available: true, isWeighable: false },
  { id: 141, category: 'Snacks', name: 'Kuch-Kuch Bhujiya (Rs 5 Pack)', price: 5, image: '', available: true, isWeighable: false },
  { id: 142, category: 'Snacks', name: 'Pradhan Nimbu Bhujiya', price: 5, image: '', available: true, isWeighable: false },
  { id: 143, category: 'Snacks', name: 'Fun-Fine', price: 5, image: '', available: true, isWeighable: false },
  { id: 144, category: 'Snacks', name: 'Fun-Fine Navratna Mixture', price: 5, image: '', available: true, isWeighable: false },
  { id: 145, category: 'Snacks', name: 'Fun-Fine Chilli Jhatka', price: 5, image: '', available: true, isWeighable: false },
  { id: 146, category: 'Snacks', name: 'Toretto Hara Matar', price: 5, image: '', available: true, isWeighable: false },
  { id: 147, category: 'Snacks', name: 'Greedoo', price: 5, image: '', available: true, isWeighable: false },
  { id: 148, category: 'Snacks', name: 'Toretto Finger', price: 5, image: '', available: true, isWeighable: false },
  { id: 149, category: 'Snacks', name: 'Toretto Desi Pasta', price: 5, image: '', available: true, isWeighable: false },
  { id: 150, category: 'Snacks', name: 'Toretto Rings', price: 5, image: '', available: true, isWeighable: false },
  { id: 151, category: 'Snacks', name: 'Moong Dal', price: 5, image: '', available: true, isWeighable: false },
  { id: 152, category: 'Snacks', name: 'Kat-Kati', price: 5, image: '', available: true, isWeighable: false },
  { id: 153, category: 'Snacks', name: 'Namkeen', price: 5, image: '', available: true, isWeighable: false },
  { id: 154, category: 'Snacks', name: 'Bholenath Bhujiya', price: 10, image: '', available: true, isWeighable: false },
  { id: 155, category: 'Snacks', name: 'Dairy Milk', price: 10, image: '', available: true, isWeighable: false },
  { id: 156, category: 'Snacks', name: 'Dairy Milk Chupa Chups', price: 5, image: '', available: true, isWeighable: false },
  { id: 157, category: 'Snacks', name: 'Chupa Chups (Rs 5)', price: 5, image: '', available: true, isWeighable: false },
  { id: 158, category: 'Snacks', name: 'Chupa Chups (Rs 10)', price: 10, image: '', available: true, isWeighable: false },
  { id: 159, category: 'Snacks', name: 'Celebration Pack (Large)', price: 110, image: '', available: true, isWeighable: false },
  { id: 160, category: 'Snacks', name: 'Celebration Pack (Small)', price: 60, image: '', available: true, isWeighable: false },
  { id: 161, category: 'Snacks', name: 'Pass-Pass', price: 5, image: '', available: true, isWeighable: false },
  { id: 169, category: 'Snacks', name: 'Bikaji Soan Papdi 200g', price: 65, image: '', available: true, isWeighable: false },

  // --- DRINKS ---
  { id: 21, category: 'Drinks', name: 'Sting Energy Drink', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/7DBCwlBNuKkTnXvwPrBb/image.png', available: true, isWeighable: false },
  { id: 22, category: 'Drinks', name: 'Sprite (750ml)', price: 45, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/zz5RhZsSyoWAQIBBSEr5/image.png', available: true, isWeighable: false },
  { id: 23, category: 'Drinks', name: 'Thums Up (750ml)', price: 45, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/b1ruEezVBfpFO7jAVZ0p/image.png', available: true, isWeighable: false },
  { id: 24, category: 'Drinks', name: 'Maaza (600ml)', price: 45, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/3RyxlsOZAFkEey8zdCwb/image.png', available: true, isWeighable: false },
  { id: 25, category: 'Drinks', name: 'Kinley Water Bottle (1L)', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/Ppzgc1BJgw92KSbwPfoD/image.png', available: true, isWeighable: false },
  { id: 277, category: 'Drinks', name: 'Limca (Rs 25)', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/lztFLqJz6pao2twt05mc/image.png', available: true, isWeighable: false },
  { id: 278, category: 'Drinks', name: 'Sprite (Rs 25)', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/uECm6A8IDIY96aUTBEZ6/image.png', available: true, isWeighable: false },
  { id: 279, category: 'Drinks', name: 'Sprite (Rs 100)', price: 100, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/4TYZFodX3FJBbOqmDbxp/image.png', available: true, isWeighable: false },
  { id: 280, category: 'Drinks', name: 'Thums Up (Rs 25)', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/WYreLOqpRIoJDi0TSu4S/image.png', available: true, isWeighable: false },
  { id: 281, category: 'Drinks', name: 'Mazza (Rs 25)', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/hQe3RMacEXtl87BUN5EP/image.png', available: true, isWeighable: false },
  { id: 282, category: 'Drinks', name: 'Mazza (Rs 110)', price: 110, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/31wsEX4CEa9RfwSbfl5C/image.png', available: true, isWeighable: false },
  { id: 283, category: 'Drinks', name: 'Mazza (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/21A2F59jT8XH8V8KCmEi/image.png', available: true, isWeighable: false },
  { id: 284, category: 'Drinks', name: 'Amul Cool', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/vVxHFJgdQb2CJT2bw9a7/image.png', available: true, isWeighable: false },
  { id: 285, category: 'Drinks', name: 'Lahori Jeera', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/uxkFh7HOPOIwbFaGEHRM/image.png', available: true, isWeighable: false },
  { id: 286, category: 'Drinks', name: 'Rim-Zim Jeera', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/jBfrj5AMUA8M7EBAo2uq/image.png', available: true, isWeighable: false },
  { id: 287, category: 'Drinks', name: 'Kinley Water Bottle (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/jBfrj5AMUA8M7EBAo2uq/image.png', available: true, isWeighable: false },
  { id: 288, category: 'Drinks', name: 'Coca-Cola (Rs 25)', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/9S7W22sUOri2d2d76heb/image.png', available: true, isWeighable: false },
  { id: 289, category: 'Drinks', name: 'Coca-Cola (Rs 45)', price: 45, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Jo6BX5GyTvNFJfyrzPfP/image.png', available: true, isWeighable: false },

  // --- PERSONAL CARE ---
  { id: 26, category: 'Personal Care', name: 'Pears Soap', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/9G59HcT2dEJ2e7ar40Jm/image.png', available: true, isWeighable: false },
  { id: 27, category: 'Personal Care', name: 'Dove Soap', price: 25, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/2jtClbkFd7VXKHVbWuYH/image.png', available: true, isWeighable: false },
  { id: 28, category: 'Personal Care', name: 'Margo Soap', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/3xzFyIjmYKUxc2pgc2Y5/image.png', available: true, isWeighable: false },
  { id: 29, category: 'Personal Care', name: 'Patanjali Paste', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/BvsfVAz2dkq8hxff6eir/image.png', available: true, isWeighable: false },
  { id: 30, category: 'Personal Care', name: 'Colgate', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/y9QDJA1Gf2yFszQx7J3H/image.png', available: true, isWeighable: false },
  { id: 31, category: 'Personal Care', name: 'Navratna Cool Oil', price: 90, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/s5s2TKET9HBFOdtjDZ66/image.png', available: true, isWeighable: false },
  { id: 32, category: 'Personal Care', name: 'Vaseline', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/1hzI6DYjAbEnt3e8i2Iy/image.png', available: true, isWeighable: false },
  { id: 33, category: 'Personal Care', name: 'Sanitary Pad Packet', price: 35, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/c4ziiUyTmj7IqSIGJHZp/image.png', available: true, isWeighable: false },
  { id: 34, category: 'Personal Care', name: 'Huggies (1pc)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/3QQn1RzsrxD8QDdYe3xn/image.png', available: true, isWeighable: false },
  { id: 71, category: 'Personal Care', name: 'Nihar Hair Oil 50g', price: 48, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/DnF1rtq8x4VUMNwnHiAy/image.png', available: true, isWeighable: false },
  { id: 72, category: 'Personal Care', name: 'Nihar Hair Oil 100g', price: 88, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/tPipEDZ8gQrI3Dsk0Fmo/image.png', available: true, isWeighable: false },
  { id: 73, category: 'Personal Care', name: 'Nihar Shanti 25ml', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/1jkxmU1HRsNURfN3jR3u/image.png', available: true, isWeighable: false },
  { id: 74, category: 'Personal Care', name: 'Nihar Shanti 175ml', price: 50, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/mFqIvrK7jl4oIx3LXCOy/image.png', available: true, isWeighable: false },
  { id: 75, category: 'Personal Care', name: 'Aamla Hair Oil 62ml', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/IU43f3R6mAn4uLXrQOid/image.png', available: true, isWeighable: false },
  { id: 76, category: 'Personal Care', name: 'Dabur Amla 160ml', price: 75, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/RRM8MKpZ8pYjwIBt1sJ8/image.png', available: true, isWeighable: false },
  { id: 77, category: 'Personal Care', name: 'Nihar TIN 160ml', price: 85, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/LmUrrL5H1Hwq6elF4HIF/image.png', available: true, isWeighable: false },
  { id: 78, category: 'Personal Care', name: 'Navratna Cool (1 pc)', price: 1, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/dot8GJ7rrOjBhRoe36J3/image.png', available: true, isWeighable: false },
  { id: 173, category: 'Personal Care', name: 'Gillete Guard', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/0kQX1THFNzKpQMgRcKEC/image.png', available: true, isWeighable: false },
  { id: 174, category: 'Personal Care', name: 'Master Blade', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/N6snFzEZNQWzirTmVZIV/image.png', available: true, isWeighable: false },
  { id: 220, category: 'Personal Care', name: 'Lifebuoy (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/tOxuqKpCvDzOs8svJxcj/image.png', available: true, isWeighable: false },
  { id: 221, category: 'Personal Care', name: 'Lifebuoy (Rs 35)', price: 35, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/LN7RMMnshnqjcl6modLP/image.png', available: true, isWeighable: false },
  { id: 222, category: 'Personal Care', name: 'Lux (Rs 20)', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/7yLcW3g5RHsv78Y7cCHQ/image.png', available: true, isWeighable: false },
  { id: 223, category: 'Personal Care', name: 'Lux (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/9jVHXmX0NtzrAXWEn50M/image.png', available: true, isWeighable: false },
  { id: 224, category: 'Personal Care', name: 'Lux International', price: 43, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/IN1TRQNicdyqr2poKa2r/image.png', available: true, isWeighable: false },
  { id: 225, category: 'Personal Care', name: 'Dettol (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/nLW5laGD4yi94h3lCK30/image.png', available: true, isWeighable: false },
  { id: 226, category: 'Personal Care', name: 'Dettol (Rs 45)', price: 45, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/dqViPsP1I90SZAUMSVUv/image.png', available: true, isWeighable: false },
  { id: 227, category: 'Personal Care', name: 'Dettol (Pack of 5)', price: 182, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/6VncEVYPNem9dVWzkcg0/image.png', available: true, isWeighable: false },
  { id: 228, category: 'Personal Care', name: 'Margo (Rs 40)', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/HazqV7Pzaw0zepKPfcp1/image.png', available: true, isWeighable: false },
  { id: 239, category: 'Personal Care', name: 'Patanjali Paste (Rs 60)', price: 60, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/tFn8ZRybHHrs4KSjA1TY/image.png', available: true, isWeighable: false },
  { id: 240, category: 'Personal Care', name: 'Patanjali Paste (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/xrbKQfccIlqBIGNvD3ZU/image.png', available: true, isWeighable: false },
  { id: 241, category: 'Personal Care', name: 'Dabur Lal Manjan (Rs 10)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/dUxUxA0UZh42rB9xU5W8/image.png', available: true, isWeighable: false },
  { id: 242, category: 'Personal Care', name: 'Dabur Lal Manjan (Rs 20)', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/MEKwM3YeAuevnd8RRuvA/image.png', available: true, isWeighable: false },
  { id: 243, category: 'Personal Care', name: 'Dabur Lal Manjan 50g', price: 37, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/h9K3eMBvU0poIvu0d4Qk/image.png', available: true, isWeighable: false },
  { id: 254, category: 'Personal Care', name: 'Vasmol', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/pnhkanu8ijK8nvsgvPgS/image.png', available: true, isWeighable: false },
  { id: 255, category: 'Personal Care', name: 'Godrej Expert', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/ZJbm6xcWQkI2epF3yI46/image.png', available: true, isWeighable: false },
  { id: 261, category: 'Personal Care', name: 'Tooth Brush (Rs 30)', price: 30, image: '', available: true, isWeighable: false },
  { id: 262, category: 'Personal Care', name: 'Tooth Brush (Rs 10)', price: 10, image: '', available: true, isWeighable: false },
  { id: 263, category: 'Personal Care', name: 'Tooth Brush (Rs 40)', price: 40, image: '', available: true, isWeighable: false },
  { id: 264, category: 'Personal Care', name: 'Tooth Brush (Rs 18)', price: 18, image: '', available: true, isWeighable: false },
  { id: 267, category: 'Personal Care', name: 'Tongue Cleaner', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/4Dd8gqYrEiWvB4UjJPpn/image.png', available: true, isWeighable: false },
  { id: 268, category: 'Personal Care', name: 'Kaveri Mehndi', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/R50DKIS9g7hQ2HtjmXSq/image.png', available: true, isWeighable: false },

  // --- HOUSEHOLD ---
  { id: 35, category: 'Household', name: 'Surf Excel (1kg)', price: 130, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/KsmblDXL70nbZe6aGocM/image.png', available: true, isWeighable: false },
  { id: 36, category: 'Household', name: 'Active Wheel (1kg)', price: 90, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/hOvMXUwhi0fded6GgJsv/image.png', available: true, isWeighable: false },
  { id: 37, category: 'Household', name: 'Vim Bar', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/iqfVfTqVuN31rDcOrE4D/image.png', available: true, isWeighable: false },
  { id: 38, category: 'Household', name: 'Phool Jhadu (Broom)', price: 70, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/91Ak7Su1MiS6eBQ0xdMv/image.png', available: true, isWeighable: false },
  { id: 39, category: 'Household', name: 'Laxman Rekha', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/9Q0Ks0JKdU0i6GyXBmb9/image.png', available: true, isWeighable: false },
  { id: 40, category: 'Household', name: 'Maxo All Out', price: 100, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/pgKemeeua4UdL5oDhSAM/image.png', available: true, isWeighable: false },
  { id: 41, category: 'Household', name: 'Matchstick Pack', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/bIAtN1E9HZ2izMfk7TFL/image.png', available: true, isWeighable: false },
  { id: 42, category: 'Household', name: 'Mombatti (Candles)', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/oLQWV3SKFzQbsP0vXgVj/image.png', available: true, isWeighable: false },
  { id: 43, category: 'Household', name: 'Agarbatti (Z-Black)', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/GRUrezyQuMLWZXQXdx0M/image.png', available: true, isWeighable: false },
  { id: 44, category: 'Household', name: 'Baby Feeding Bottle', price: 51, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/dxe332V13OaCw83rqXW9/image.png', available: true, isWeighable: false },
  { id: 166, category: 'Household', name: 'Baby Feeding Bottle', price: 47, image: '', available: true, isWeighable: false },
  { id: 172, category: 'Household', name: 'Scrub', price: 10, image: '', available: true, isWeighable: false },
  { id: 175, category: 'Household', name: 'Shakti Battery', price: 10, image: '', available: true, isWeighable: false },
  { id: 176, category: 'Household', name: 'Nippo Battery', price: 8, image: '', available: true, isWeighable: false },
  { id: 177, category: 'Household', name: 'Plate', price: 30, image: '', available: true, isWeighable: false },
  { id: 178, category: 'Household', name: 'Disposal Glass', price: 30, image: '', available: true, isWeighable: false },
  { id: 179, category: 'Household', name: 'Petrol 1 Ltr', price: 130, image: '', available: true, isWeighable: false },
  { id: 180, category: 'Household', name: 'Petrol 500ml', price: 65, image: '', available: true, isWeighable: false },
  { id: 181, category: 'Household', name: 'Diesel 1 Ltr', price: 105, image: '', available: true, isWeighable: false },
  { id: 182, category: 'Household', name: 'Diesel 500ml', price: 55, image: '', available: true, isWeighable: false },
  { id: 183, category: 'Household', name: 'Gulal Lal', price: 10, image: '', available: true, isWeighable: false },
  { id: 184, category: 'Household', name: 'Gulal Peela', price: 10, image: '', available: true, isWeighable: false },
  { id: 185, category: 'Household', name: 'Gulal Hara', price: 10, image: '', available: true, isWeighable: false },
  { id: 229, category: 'Household', name: 'Surf Excel (Rs 10)', price: 10, image: '', available: true, isWeighable: false },
  { id: 230, category: 'Household', name: 'Vim Bar (Rs 5)', price: 5, image: '', available: true, isWeighable: false },
  { id: 231, category: 'Household', name: 'Active Wheel 800g', price: 80, image: '', available: true, isWeighable: false },
  { id: 232, category: 'Household', name: 'Active Wheel 500g', price: 45, image: '', available: true, isWeighable: false },
  { id: 233, category: 'Household', name: 'Active Wheel 400g', price: 40, image: '', available: true, isWeighable: false },
  { id: 244, category: 'Household', name: 'Maxo', price: 30, image: '', available: true, isWeighable: false },
  { id: 245, category: 'Household', name: 'Run-Out', price: 10, image: '', available: true, isWeighable: false },
  { id: 246, category: 'Household', name: 'Run-Out Pack', price: 90, image: '', available: true, isWeighable: false },
  { id: 247, category: 'Household', name: 'Bharat Darshan', price: 10, image: '', available: true, isWeighable: false },
  { id: 248, category: 'Household', name: 'Bharat Vashi', price: 10, image: '', available: true, isWeighable: false },
  { id: 249, category: 'Household', name: 'Anushree', price: 10, image: '', available: true, isWeighable: false },
  { id: 250, category: 'Household', name: 'Sonakshi', price: 30, image: '', available: true, isWeighable: false },
  { id: 251, category: 'Household', name: 'Rudraksha', price: 30, image: '', available: true, isWeighable: false },
  { id: 252, category: 'Household', name: 'Black Stone', price: 10, image: '', available: true, isWeighable: false },
  { id: 253, category: 'Household', name: 'Kaccha Dhoop', price: 35, image: '', available: true, isWeighable: false },
  { id: 260, category: 'Household', name: 'Jhadu', price: 40, image: '', available: true, isWeighable: false },
  { id: 265, category: 'Household', name: 'Cleaning Brush', price: 50, image: '', available: true, isWeighable: false },
  { id: 266, category: 'Household', name: 'Rubber / Feeta', price: 40, image: '', available: true, isWeighable: false },
  { id: 290, category: 'Household', name: 'Rajni-Gandha with Tulsi', price: 25, image: '', available: true, isWeighable: false },
  { id: 291, category: 'Household', name: 'Signature', price: 15, image: '', available: true, isWeighable: false },
  { id: 292, category: 'Household', name: 'Madhu', price: 5, image: '', available: true, isWeighable: false },
  { id: 293, category: 'Household', name: 'Raj Niwas', price: 5, image: '', available: true, isWeighable: false },
  { id: 294, category: 'Household', name: 'Mastaba', price: 5, image: '', available: true, isWeighable: false },
  { id: 295, category: 'Household', name: 'Director', price: 10, image: '', available: true, isWeighable: false },
  { id: 296, category: 'Household', name: 'Gold Flake Super Star 1 Packet', price: 90, image: '', available: true, isWeighable: false },
  { id: 297, category: 'Household', name: 'Gold Flake Premium 1 Packet', price: 135, image: '', available: true, isWeighable: false },
  { id: 298, category: 'Household', name: 'Capstan 1 Packet', price: 90, image: '', available: true, isWeighable: false },
  { id: 299, category: 'Household', name: 'Total 1 Packet', price: 90, image: '', available: true, isWeighable: false },
  { id: 300, category: 'Household', name: 'Edition 1 Packet', price: 135, image: '', available: true, isWeighable: false },
  { id: 301, category: 'Household', name: 'Charms 1 Packet', price: 65, image: '', available: true, isWeighable: false },
  { id: 302, category: 'Household', name: 'Dulhan Gul (Rs 2)', price: 2, image: '', available: true, isWeighable: false },
  { id: 303, category: 'Household', name: 'Dulhan Gul (Rs 5)', price: 5, image: '', available: true, isWeighable: false },
  { id: 304, category: 'Household', name: 'Dulhan Gul (Rs 10)', price: 10, image: '', available: true, isWeighable: false },
  { id: 305, category: 'Household', name: 'Rani Khaini', price: 5, image: '', available: true, isWeighable: false },
  { id: 306, category: 'Household', name: 'Payal Khaini', price: 5, image: '', available: true, isWeighable: false },
  { id: 307, category: 'Household', name: 'Bidi 1 Pack', price: 15, image: '', available: true, isWeighable: false },

  // --- STATIONERY ---
  { id: 45, category: 'Stationery', name: 'English Notebook', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/GenQw8u3aTRjrlMM4asS/image.png', available: true, isWeighable: false },
  { id: 46, category: 'Stationery', name: 'Linc Smart Pen', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/j7QxHaVBkOJmABEZgC2t/image.png', available: true, isWeighable: false },
  { id: 47, category: 'Stationery', name: 'Doms Pencil', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/awL2YxtkEC7wvs7W6djd/image.png', available: true, isWeighable: false },
  { id: 48, category: 'Stationery', name: 'English Notebook', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/dqB0JOcP1FmvYgg5r8da/image.png', available: true, isWeighable: false },
  { id: 49, category: 'Stationery', name: 'Hindi Notebook', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/egZMEPjAdTUiGfwOjDQ4/image.png', available: true, isWeighable: false },
  { id: 50, category: 'Stationery', name: 'Hindi Notebook', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/gFvCiv6N8WKKcEnVlZlP/image.png', available: true, isWeighable: false },
  { id: 51, category: 'Stationery', name: 'Math Notebook', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/b9nbbzI6AjdvbiiKB775/image.png', available: true, isWeighable: false },
  { id: 52, category: 'Stationery', name: 'Math Notebook', price: 20, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/8MhSWyHc5l0rMFzTFpFM/image.png', available: true, isWeighable: false },
  { id: 53, category: 'Stationery', name: 'Doms Eraser', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/y1q3lktTpBphkJhin8jl/image.png', available: true, isWeighable: false },
  { id: 54, category: 'Stationery', name: 'Doms Sharpner', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202610/31/xasa1vWH9WydUGwsg2Yu/image.png', available: true, isWeighable: false },
  { id: 170, category: 'Stationery', name: 'Fevi-Kwik', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/TbT5ONm5w68iArr0uJUs/image.png', available: true, isWeighable: false },
  { id: 171, category: 'Stationery', name: 'Fevi-Gum', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/TQqwzraTMvW4sCiQcrjQ/image.png', available: true, isWeighable: false },
  { id: 256, category: 'Stationery', name: 'Table Notebook', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/O4fg6z5jtryRG0IzUwM1/image.png', available: true, isWeighable: false },
  { id: 257, category: 'Stationery', name: 'Linc Glacier Pen', price: 10, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/Ru9FcolCBWsMLjByI0UW/image.png', available: true, isWeighable: false },
  { id: 258, category: 'Stationery', name: 'Doms Pen', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/JJ9aoDejrQVh0F5fDehQ/image.png', available: true, isWeighable: false },
  { id: 259, category: 'Stationery', name: 'Natraj Pencil', price: 5, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/CfViAjQFPKlcEnyKGXuJ/image.png', available: true, isWeighable: false },
  { id: 274, category: 'Stationery', name: 'Slate for Kids', price: 30, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/FEOYDEIaFSHlkYGpQj58/image.png', available: true, isWeighable: false },
  { id: 275, category: 'Stationery', name: 'Good English (Book)', price: 40, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/oddhUvxgeC5e4yjq2W6a/image.png', available: true, isWeighable: false },
  { id: 276, category: 'Stationery', name: 'Komal Bal Pothi', price: 30, image: 'https://plain-apac-prod-public.komododecks.com/202611/01/B8Aw9LX7s7Otu5MDi61X/image.png', available: true, isWeighable: false }
];

const CATEGORIES = ['All', 'Grocery', 'Green Vegetables', 'Fresh Fruits', 'Snacks', 'Drinks', 'Personal Care', 'Household', 'Stationery'];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null); 
  const [loginInput, setLoginInput] = useState('');
  const [loginType, setLoginType] = useState('phone'); 
  
  // --- CLOUD DATABASE STATE ---
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [cart, setCart] = useState([]);
  const [view, setView] = useState('store');
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Grocery', image: '', isWeighable: false });
  const [editingProduct, setEditingProduct] = useState(null);
  const [deliverySettings, setDeliverySettings] = useState({ fee: 20, freeThreshold: 201, handlingFee: 5 });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  
  const [locationStatus, setLocationStatus] = useState('idle');
  const [userDistance, setUserDistance] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartSubtotal > 0 && cartSubtotal < deliverySettings.freeThreshold ? deliverySettings.fee : 0;
  const handlingFee = cartSubtotal > 0 ? deliverySettings.handlingFee : 0;
  const cartTotal = cartSubtotal + deliveryFee + handlingFee;

  // --- FETCH PRODUCTS FROM MONGODB ---
  useEffect(() => {
    fetch(`${BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoadingProducts(false);
      })
      .catch(err => {
        console.error("Failed to load products from cloud", err);
        setIsLoadingProducts(false);
      });
  }, []);

  // --- AUTO CAPTURE CASHFREE SUCCESS ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    if (orderId) {
      // Clean up the URL so it doesn't trigger again on refresh
      window.history.replaceState(null, '', window.location.pathname);
      
      // Auto-finalize the order with paid status
      finalizeOrder('PAID ONLINE (Cashfree)');
      
      // Send the WhatsApp message immediately
      const message = `✅ *NEW PAID ORDER!*\n\n*Order ID:* ${orderId}\n*Payment:* PAID ONLINE via Cashfree\n\nHello in_minutes, I just paid for my order!`;
      const phone = STORE_PHONE;
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp automatically
      window.location.href = whatsappUrl;
    }
  }, []); // Run once on load

  // --- ADMIN ROUTE PROTECTION ---
  useEffect(() => {
    if (location.pathname === '/Admin' && !isAdmin) {
      const pin = prompt("Enter Admin Password:");
      if (pin === ADMIN_PIN) {
        setIsAdmin(true);
      } else {
        alert("Incorrect Password!");
        navigate('/');
      }
    }
  }, [location.pathname, isAdmin, navigate]);

  // --- AUTO LOGIN ---
  useEffect(() => {
    const savedProfile = localStorage.getItem('inMinutes_userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setCurrentUser({ identifier: parsed.phone, type: 'phone' });
      setCustomerDetails({ name: parsed.name || '', phone: parsed.phone || '', address: parsed.address || '' });
    }
    const savedHistory = localStorage.getItem('inMinutes_orderHistory');
    if (savedHistory) setOrderHistory(JSON.parse(savedHistory));
  }, []);

  // --- LOCATION VERIFICATION ---
  const verifyLocation = () => {
    setLocationStatus('loading');
    if (!navigator.geolocation) return setLocationStatus('error');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = calculateDistance(STORE_LAT, STORE_LON, position.coords.latitude, position.coords.longitude);
        setUserDistance(dist.toFixed(1));
        setLocationStatus(dist <= 5 ? 'success' : 'out_of_range');
      },
      () => setLocationStatus('error'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => { if (view === 'checkout') verifyLocation(); }, [view]);

  // --- ADMIN: CLOUD SYNC & DATABASE FUNCTIONS ---
  const handleSeedDatabase = async () => {
    if(!window.confirm(`This will upload ${initialProducts.length} items to the cloud. Continue?`)) return;
    
    try {
      console.log(`🚀 Starting upload of ${initialProducts.length} products...`);
      let count = 0;
      for(const item of initialProducts) {
        await fetch(`${BACKEND_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        count++;
      }
      alert("✅ Upload complete! Refreshing database...");
      window.location.reload();
    } catch (err) {
      alert("Upload failed! Check your browser console for details.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    try {
      const res = await fetch(`${BACKEND_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...newProduct, 
          price: parseFloat(newProduct.price), 
          image: newProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200' 
        })
      });
      const added = await res.json();
      setProducts([added, ...products]);
      setNewProduct({ name: '', price: '', category: 'Grocery', image: '', isWeighable: false });
    } catch (err) { alert("Failed to add to database."); }
  };

  const saveEditedProduct = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });
      const updated = await res.json();
      setProducts(products.map(p => p.id === updated.id ? updated : p));
      setEditingProduct(null);
    } catch (err) { alert("Failed to save changes."); }
  };

  const deleteProduct = async (id) => {
    if(!window.confirm("Delete permanently from database?")) return;
    try {
      await fetch(`${BACKEND_URL}/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) { alert("Failed to delete."); }
  };

  const toggleAvailability = async (product) => {
    try {
      const res = await fetch(`${BACKEND_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !product.available })
      });
      const updated = await res.json();
      setProducts(products.map(p => p.id === product.id ? updated : p));
    } catch (err) { alert("Failed to update status."); }
  };

  // --- CART & ORDER FUNCTIONS ---
  const handleAddToCart = (product, variant) => {
    const cartId = product.isWeighable ? `${product.id}-${variant}` : `${product.id}-default`;
    let finalPrice = product.price;
    let finalName = product.name;
    
    if (product.isWeighable) {
      if (variant === '500g') finalPrice = Math.ceil(product.price / 2);
      if (variant === '250g') finalPrice = Math.ceil(product.price / 4);
      finalName = `${product.name} (${variant})`;
    }

    setCart(prev => {
      const exists = prev.find(item => item.cartId === cartId);
      if (exists) return prev.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { cartId, productId: product.id, name: finalName, price: finalPrice, quantity: 1, image: product.image }];
    });
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) return { ...item, quantity: item.quantity + delta };
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCashfreePayment = async () => {
    try {
      // 1. Fetch the session ID from your backend
      const response = await fetch(`${BACKEND_URL}/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal, customerPhone: customerDetails.phone, customerName: customerDetails.name })
      });
      
      const data = await response.json();
      
      // 2. Initialize Cashfree in PRODUCTION mode
      if (data.payment_session_id) {
        // 🔥 CHANGED TO PRODUCTION:
        const cashfreeInstance = await load({ mode: "production" }); 
        
        cashfreeInstance.checkout({ 
          paymentSessionId: data.payment_session_id, 
          redirectTarget: "_self", // Changed from _modal so the redirect flows perfectly to the success useEffect
          // 🔥 PRIORITIZE UPI APPS ON MOBILE:
          components: ["order-details", "upi", "card", "netbanking", "wallet"] 
        }).then((result) => {
          if (result.error) alert("Payment failed or cancelled.");
          if (result.redirect || result.paymentDetails) finalizeOrder("Paid via Cashfree Online");
        });
      } else {
        alert("Payment Error: " + (data.message || data.error || "Failed to generate session"));
      }
    } catch (error) { 
      console.error("Frontend Error:", error);
      alert("Browser Error: Check your browser's inspect console."); 
    }
  };

  const finalizeOrder = (paymentStatus) => {
    localStorage.setItem('inMinutes_userProfile', JSON.stringify(customerDetails));
    setIsEditingProfile(false);

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
      items: cart,
      total: cartTotal,
      status: 'Sent to WhatsApp'
    };
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('inMinutes_orderHistory', JSON.stringify(updatedHistory));

    let orderText = `*New Order: in_minutes Fast Delivery* %0A---------------------%0A`;
    cart.forEach(item => { orderText += `${item.quantity}x ${item.name} ₹${item.price * item.quantity}%0A`; });
    orderText += `---------------------%0ASubtotal: ₹${cartSubtotal}%0ADelivery Fee: ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}%0A`;
    if (handlingFee > 0) orderText += `Convenience Charge: ₹${handlingFee}%0A`;
    orderText += `*Total: ₹${cartTotal}*%0A%0A*Customer Details:*%0AName: ${customerDetails.name}%0APhone: ${customerDetails.phone}%0AAddress: ${customerDetails.address}%0APayment: ${paymentStatus}`;

    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setView('success');
    window.open(`https://wa.me/${STORE_PHONE}?text=${orderText}`, '_blank');
    setCart([]);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (locationStatus !== 'success') return alert("Cannot place order: Max 5km radius.");
    if (paymentMethod === 'Cashfree') return handleCashfreePayment();
    finalizeOrder(paymentMethod);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginInput.trim()) return;
    setCurrentUser({ identifier: loginInput, type: loginType });
    setCustomerDetails(prev => {
      const updated = { ...prev, phone: loginType === 'phone' ? loginInput : prev.phone };
      localStorage.setItem('inMinutes_userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogout = () => {
    if (window.confirm("Log out?")) {
      localStorage.removeItem('inMinutes_userProfile');
      localStorage.removeItem('inMinutes_orderHistory');
      setOrderHistory([]); setCurrentUser(null); setCustomerDetails({ name: '', phone: '', address: '' }); setCart([]); setView('store'); setIsAdmin(false); navigate('/');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="flex justify-center items-center gap-2 mb-2"><div className="bg-green-600 p-2.5 rounded-xl shadow-md"><Zap className="text-white fill-white" size={32}/></div><h1 className="text-4xl font-extrabold text-green-700 tracking-tight italic">in_minutes</h1></div>
            <p className="text-sm font-bold text-gray-500">Groceries delivered in 10 minutes (Under 5km)</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button onClick={() => { setLoginType('phone'); setLoginInput(''); }} className={`w-1/2 py-2.5 rounded-lg text-sm font-bold ${loginType === 'phone' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}>Mobile Number</button>
            <button onClick={() => { setLoginType('email'); setLoginInput(''); }} className={`w-1/2 py-2.5 rounded-lg text-sm font-bold ${loginType === 'email' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}>Email Address</button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{loginType === 'phone' ? 'Enter 10-Digit Mobile Number' : 'Enter Email Address'}</label>
              {loginType === 'phone' ? (
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-green-500 bg-gray-50"><span className="bg-gray-200 px-3 py-3 text-sm font-bold text-gray-600 border-r">+91</span><input required type="tel" maxLength="10" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} className="w-full p-3 bg-transparent outline-none font-medium" /></div>
              ) : (
                <input required type="email" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none font-medium" />
              )}
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-green-700 active:scale-[0.98] transition-all">Continue to Store 🚀</button>
          </form>
        </div>
      </div>
    );
  }

  const displayedProducts = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  // Render the header globally across all routes
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <header className="bg-green-600 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div onClick={() => { setView('store'); navigate('/'); }} className="cursor-pointer">
            <div className="flex items-center gap-2"><div className="bg-white p-1 rounded-lg shadow-sm"><Zap size={20} className="text-green-600 fill-green-600" /></div><h1 className="text-xl font-extrabold italic tracking-tight leading-tight">in_minutes</h1></div>
            <p className="text-[10px] text-green-100 font-medium mt-1 tracking-wide">Support: 7858967429</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setView('orders'); navigate('/'); }} className={`p-2 rounded-full transition-colors ${view === 'orders' && location.pathname === '/' ? 'bg-white text-green-700' : 'bg-green-700 text-white hover:bg-green-800'}`}><Clock size={20} /></button>
            <button onClick={() => navigate('/Admin')} className={`p-2 rounded-full transition-colors ${location.pathname === '/Admin' ? 'bg-amber-500 text-white' : 'bg-green-700 text-white'}`}><ShieldAlert size={20} /></button>
            <button onClick={handleLogout} className="p-2 bg-green-700 rounded-full hover:bg-green-800"><LogOut size={18} /></button>
            <button onClick={() => { setView('cart'); navigate('/'); }} className={`relative p-2 rounded-full transition-colors ${view === 'cart' || view === 'checkout' ? 'bg-white text-green-700' : 'bg-green-700 text-white hover:bg-green-800'}`}>
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-green-600">{cart.reduce((s,i)=>s+i.quantity,0)}</span>}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          {/* ADMIN DASHBOARD ROUTE */}
          <Route path="/Admin" element={
            isAdmin ? (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <div><h2 className="text-xl font-extrabold text-gray-900">in_minutes Admin Dashboard</h2></div>
                  <button onClick={() => navigate('/')} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold">Back to Store</button>
                </div>

                {products.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 flex justify-between items-center">
                    <div><h3 className="font-bold text-blue-900 text-sm">Cloud Database is Empty</h3><p className="text-xs text-blue-700 mt-1">Upload your 300+ local products to MongoDB.</p></div>
                    <button onClick={handleSeedDatabase} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm hover:bg-blue-700">
                      <Upload size={16}/> Sync to Cloud
                    </button>
                  </div>
                )}

                <div className="bg-orange-50 p-5 rounded-xl mb-6 border border-orange-100">
                  <h3 className="font-bold text-sm text-orange-800 mb-3 flex items-center gap-2">⚙️ Delivery & Handling Charges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div><label className="text-xs font-bold text-gray-700 uppercase mb-1 block">Delivery Fee (₹)</label><input type="number" value={deliverySettings.fee} onChange={e => setDeliverySettings({...deliverySettings, fee: parseFloat(e.target.value) || 0})} className="w-full p-2.5 border rounded-lg bg-white text-sm font-semibold"/></div>
                    <div><label className="text-xs font-bold text-gray-700 uppercase mb-1 block">Free Delivery Threshold (₹)</label><input type="number" value={deliverySettings.freeThreshold} onChange={e => setDeliverySettings({...deliverySettings, freeThreshold: parseFloat(e.target.value) || 0})} className="w-full p-2.5 border rounded-lg bg-white text-sm font-semibold"/></div>
                    <div><label className="text-xs font-bold text-gray-700 uppercase mb-1 block">Handling Charge (₹)</label><input type="number" value={deliverySettings.handlingFee} onChange={e => setDeliverySettings({...deliverySettings, handlingFee: parseFloat(e.target.value) || 0})} className="w-full p-2.5 border rounded-lg bg-white text-sm font-semibold"/></div>
                  </div>
                </div>

                <form onSubmit={handleAddProduct} className="bg-green-50 p-5 rounded-xl mb-8 border border-green-100">
                  <h3 className="font-bold text-sm text-green-800 mb-3 flex items-center gap-2"><Plus size={18}/> Add New Product</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <input required type="text" placeholder="Product Name" value={newProduct.name} onChange={e=>setNewProduct({...newProduct, name: e.target.value})} className="p-3 border rounded-xl bg-white text-sm shadow-sm" />
                    <input required type="number" placeholder="Price (₹)" value={newProduct.price} onChange={e=>setNewProduct({...newProduct, price: e.target.value})} className="p-3 border rounded-xl bg-white text-sm shadow-sm" />
                    <select value={newProduct.category} onChange={e=>setNewProduct({...newProduct, category: e.target.value})} className="p-3 border rounded-xl bg-white text-sm shadow-sm">{CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}</select>
                    <input type="text" placeholder="Image URL (Link)" value={newProduct.image} onChange={e=>setNewProduct({...newProduct, image: e.target.value})} className="p-3 border rounded-xl bg-white text-sm shadow-sm"/>
                    <button type="submit" className="bg-green-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 text-sm shadow-md"><Plus size={18}/> Add</button>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700 mt-3 cursor-pointer w-max"><input type="checkbox" checked={newProduct.isWeighable} onChange={e=>setNewProduct({...newProduct, isWeighable: e.target.checked})} className="w-4 h-4 rounded text-green-600 focus:ring-green-500" /> Has Weight Options?</label>
                </form>

                <h3 className="font-bold text-gray-800 mb-4">Inventory List ({products.length} items)</h3>
                <div className="divide-y border rounded-xl overflow-hidden bg-gray-50">
                  {products.map(product => (
                    <div key={product.id} className="p-4 bg-white hover:bg-gray-50 transition-colors">
                      {editingProduct?.id === product.id ? (
                        <div className="flex flex-col gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div><label className="text-xs font-bold text-gray-600 uppercase">Product Name</label><input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-2.5 border rounded-lg bg-white text-sm font-semibold"/></div>
                            <div><label className="text-xs font-bold text-gray-600 uppercase">Base Price (1kg/pc)</label><input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="w-full p-2.5 border rounded-lg bg-white text-sm font-semibold"/></div>
                            <div><label className="text-xs font-bold text-gray-600 uppercase">Category</label><select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full p-2.5 border rounded-lg bg-white text-sm font-semibold">{CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                            <div><label className="text-xs font-bold text-gray-600 uppercase">Image URL (Link)</label><input type="text" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full p-2.5 border rounded-lg bg-white text-sm font-semibold"/></div>
                          </div>
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-700 mt-1 cursor-pointer w-max"><input type="checkbox" checked={editingProduct.isWeighable} onChange={e=>setEditingProduct({...editingProduct, isWeighable: e.target.checked})} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" /> Has Weight Options?</label>
                          <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => setEditingProduct(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-gray-300"><X size={16}/> Cancel</button>
                            <button onClick={saveEditedProduct} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm hover:bg-blue-700"><Save size={16}/> Save to Cloud</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} className="w-12 h-12 rounded-lg object-cover border" alt="" />
                            <div><p className="font-bold text-sm text-gray-900">{product.name} {product.isWeighable && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-1">Weighable</span>}</p><p className="text-xs text-gray-500 font-medium">₹{product.price} • {product.category}</p></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => toggleAvailability(product)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${product.available ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{product.available ? 'Available' : 'Out of Stock'}</button>
                            <button onClick={() => setEditingProduct(product)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Edit size={18}/></button>
                            <button onClick={() => deleteProduct(product.id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg"><Trash2 size={18}/></button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : <Navigate to="/" />
          } />

          {/* MAIN STORE ROUTE */}
          <Route path="/" element={
            view === 'orders' ? (
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-extrabold text-gray-900">My Order History</h2><button onClick={() => setView('store')} className="text-sm font-bold text-green-600 hover:underline">Continue Shopping</button></div>
                {orderHistory.length === 0 ? (
                  <div className="text-center py-12"><Clock size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500 font-medium mb-4">You haven't placed any orders yet.</p><button onClick={() => setView('store')} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700">Start Shopping</button></div>
                ) : (
                  <div className="space-y-4">
                    {orderHistory.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-2xl p-4 bg-gray-50 shadow-sm">
                        <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-200">
                          <div><p className="text-xs font-bold text-gray-500 tracking-wide uppercase">Order ID: #{order.id.toString().slice(-6)}</p><p className="text-sm font-bold text-gray-800 mt-1">{order.date}</p></div>
                          <span className="bg-green-100 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">{order.status}</span>
                        </div>
                        <div className="space-y-2 mb-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm"><span className="text-gray-700 font-medium">{item.quantity}x {item.name}</span><span className="font-bold text-gray-900">₹{item.price * item.quantity}</span></div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200"><span className="text-sm font-bold text-gray-600">Total Amount</span><span className="text-lg font-extrabold text-green-700">₹{order.total}</span></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : view === 'store' ? (
              <>
                <div className="mb-4 relative"><Search className="absolute left-3.5 top-3.5 text-gray-400" size={20} /><input type="text" placeholder="Search items..." className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white font-medium text-sm" onChange={(e) => setSearch(e.target.value)} /></div>
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">{CATEGORIES.map(cat => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}>{cat}</button>))}</div>
                
                {isLoadingProducts ? (
                   <div className="text-center py-10"><p className="text-green-600 font-bold animate-pulse">Loading products from Cloud Database...</p></div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {displayedProducts.map((product) => {
                      const variant = selectedVariant[product.id] || '1kg';
                      const cartId = product.isWeighable ? `${product.id}-${variant}` : `${product.id}-default`;
                      const cartItem = cart.find(c => c.cartId === cartId);
                      return (
                        <div key={product.id} className={`bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex flex-col transition-all ${!product.available ? 'opacity-50 grayscale' : 'hover:shadow-md'}`}>
                          <img src={product.image} alt={product.name} className="w-full h-28 object-cover rounded-xl mb-3 bg-gray-50" />
                          <span className="text-[10px] text-green-700 font-extrabold uppercase tracking-wider">{product.category}</span>
                          <h3 className="font-bold text-gray-800 text-sm flex-grow leading-tight mt-1">{product.name}</h3>
                          <div className="flex justify-between items-end mt-3 pt-2 border-t border-gray-50">
                            <div className="flex flex-col">
                              {product.isWeighable ? (<select value={variant} onChange={(e) => setSelectedVariant({...selectedVariant, [product.id]: e.target.value})} className="text-[11px] border border-gray-300 rounded bg-gray-50 px-1 py-0.5 font-medium outline-none focus:border-green-500 mb-1 w-max"><option value="1kg">1kg</option><option value="500g">500g</option><option value="250g">250g</option></select>) : (<span className="text-[11px] text-gray-500 mb-1 font-medium">1 pc</span>)}
                              <span className="font-extrabold text-gray-900 text-base">₹{product.isWeighable ? (variant === '500g' ? Math.ceil(product.price/2) : variant === '250g' ? Math.ceil(product.price/4) : product.price) : product.price}</span>
                            </div>
                            {product.available ? (cartItem ? (<div className="flex items-center bg-green-50 border border-green-200 rounded-lg overflow-hidden h-7 shadow-sm"><button onClick={() => updateQuantity(cartId, -1)} className="w-7 h-full flex items-center justify-center text-green-700 hover:bg-green-100 font-bold">-</button><span className="w-5 text-center text-xs font-bold text-green-900">{cartItem.quantity}</span><button onClick={() => updateQuantity(cartId, 1)} className="w-7 h-full flex items-center justify-center text-green-700 hover:bg-green-100 font-bold">+</button></div>) : (<button onClick={() => handleAddToCart(product, variant)} className="bg-green-50 text-green-700 px-3.5 h-7 rounded-lg text-xs font-extrabold border border-green-200 hover:bg-green-100 shadow-sm">ADD</button>)) : (<span className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-1 rounded-md">Out of Stock</span>)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : view === 'cart' ? (
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 max-w-xl mx-auto">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Your Shopping Cart</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-16"><p className="text-gray-400 font-medium mb-4">Your cart is feeling empty!</p><button onClick={() => setView('store')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold">Start Shopping</button></div>
                ) : (
                  <>
                    <div className="space-y-4 divide-y">
                      {cart.map(item => (
                        <div key={item.cartId} className="flex justify-between items-center pt-4 first:pt-0">
                          <div className="flex gap-3 items-center"><img src={item.image} className="w-12 h-12 rounded-lg object-cover border" alt=""/><div><p className="font-bold text-gray-800 text-sm">{item.name}</p><p className="text-xs text-gray-500 font-medium">₹{item.price} x {item.quantity}</p></div></div>
                          <div className="flex items-center gap-4"><span className="font-extrabold text-gray-900 text-sm w-8 text-right">₹{item.price * item.quantity}</span><div className="flex items-center bg-gray-50 border rounded-lg overflow-hidden h-7"><button onClick={() => updateQuantity(item.cartId, -1)} className="w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold">-</button><span className="w-6 text-center text-xs font-bold text-gray-900">{item.quantity}</span><button onClick={() => updateQuantity(item.cartId, 1)} className="w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold">+</button></div></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-2xl space-y-2.5 border border-gray-100">
                      <div className="flex justify-between text-gray-600 text-sm font-medium"><span>Items Subtotal</span><span>₹{cartSubtotal}</span></div>
                      {handlingFee > 0 && <div className="flex justify-between text-gray-600 text-sm font-medium"><span>Handling Charge</span><span>₹{handlingFee}</span></div>}
                      <div className="flex justify-between text-sm"><span className="text-gray-600 font-medium">Delivery Fee <span className="text-xs text-green-600 font-bold">(Free above ₹{deliverySettings.freeThreshold})</span></span><span className={deliveryFee === 0 ? 'text-green-600 font-bold' : 'text-gray-700 font-bold'}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                      <div className="flex justify-between font-extrabold text-lg pt-3 border-t border-gray-200 text-gray-900"><span>Grand Total</span><span>₹{cartTotal}</span></div>
                    </div>
                    <button onClick={() => setView('checkout')} className="w-full mt-6 bg-green-600 text-white py-4 rounded-2xl font-extrabold text-base shadow-lg hover:bg-green-700">Proceed to Checkout 🛍️</button>
                  </>
                )}
              </div>
            ) : view === 'checkout' ? (
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-extrabold text-gray-900">Complete Order</h2><button onClick={() => setView('cart')} className="text-sm font-bold text-green-600">Back to Cart</button></div>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className={`p-4 rounded-2xl border ${locationStatus === 'success' ? 'bg-green-50 border-green-200' : locationStatus === 'out_of_range' ? 'bg-red-50 border-red-200' : locationStatus === 'loading' ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
                    <div className="flex justify-between items-center mb-2"><span className="font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1"> Delivery Range Check</span></div>
                    {locationStatus === 'loading' && <p className="text-sm text-blue-700 font-bold flex items-center gap-2"><span className="animate-spin">🔄</span> Fetching your location...</p>}
                    {locationStatus === 'success' && <p className="text-sm text-green-800 font-bold flex items-center gap-1"><CheckCircle2 size={16}/> Deliverable! You are {userDistance}km away.</p>}
                    {locationStatus === 'out_of_range' && <p className="text-sm text-red-700 font-bold">Sorry, your area is not deliverable. {userDistance}km away (Max 5km).</p>}
                    {locationStatus === 'error' && <div><p className="text-sm text-orange-800 font-bold mb-2">Please allow location access to verify delivery range.</p><button type="button" onClick={verifyLocation} className="w-full bg-orange-600 text-white py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-orange-700">Retry Location Access</button></div>}
                  </div>
                  <div className="border border-gray-200 rounded-2xl overflow-hidden mt-4">
                    <div className="bg-gray-100 p-3 border-b border-gray-200 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5"><User size={16}/> Delivery Address</h3>{(customerDetails.name && customerDetails.address && !isEditingProfile) && (<button type="button" onClick={() => setIsEditingProfile(true)} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"><Edit size={12}/> Edit</button>)}</div>
                    {(!customerDetails.name || !customerDetails.address || isEditingProfile) ? (
                      <div className="p-4 space-y-3 bg-white">
                        <div><label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label><input required type="text" value={customerDetails.name} className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white text-sm font-medium" onChange={e => setCustomerDetails({...customerDetails, name: e.target.value})} /></div>
                        <div><label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Number</label><input required type="tel" value={customerDetails.phone || (loginType==='phone'?loginInput:'')} className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white text-sm font-medium" onChange={e => setCustomerDetails({...customerDetails, phone: e.target.value})} /></div>
                        <div><label className="block text-xs font-bold text-gray-700 uppercase mb-1">Village Address & Landmark</label><textarea required rows="2" value={customerDetails.address} className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white resize-none text-sm font-medium" onChange={e => setCustomerDetails({...customerDetails, address: e.target.value})}></textarea></div>
                        {isEditingProfile && (<button type="button" onClick={() => setIsEditingProfile(false)} className="w-full bg-blue-50 text-blue-700 border border-blue-200 py-2.5 rounded-xl text-sm font-bold mt-2 shadow-sm hover:bg-blue-100">Save Address Details</button>)}
                      </div>
                    ) : (
                      <div className="p-4 bg-white"><p className="font-extrabold text-sm text-gray-900">{customerDetails.name}</p><p className="text-xs text-gray-600 font-medium mt-1">📞 {customerDetails.phone}</p><p className="text-xs text-gray-600 font-medium mt-1">📍 {customerDetails.address}</p></div>
                    )}
                  </div>
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Payment Option</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div onClick={() => setPaymentMethod('COD')} className={`p-3 border-2 rounded-2xl text-center cursor-pointer font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ${paymentMethod === 'COD' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200'}`}>💵 COD</div>
                      <div onClick={() => setPaymentMethod('Cashfree')} className={`p-3 border-2 rounded-2xl text-center cursor-pointer font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ${paymentMethod === 'Cashfree' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200'}`}><CreditCard size={18}/> Pay Online</div>
                    </div>
                  </div>
                  <button type="submit" disabled={locationStatus !== 'success'} className={`w-full mt-4 py-4 rounded-2xl font-extrabold text-base shadow-lg flex justify-center items-center gap-2 transition-all ${locationStatus === 'success' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                    <Send size={20} /> {paymentMethod === 'Cashfree' ? 'Pay Securely Online' : 'Place Order & Celebrate! 🎉'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm p-8 text-center max-w-md mx-auto mt-10"><CheckCircle2 size={80} className="text-green-500 mx-auto mb-4 animate-bounce" /><h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Placed Successfully! 🎉</h2><button onClick={() => { setView('orders'); setLocationStatus('idle'); }} className="bg-gray-100 text-gray-800 px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-200 mt-6">View My Orders</button></div>
            )
          } />
        </Routes>
      </main>
    </div>
  );
}

// Global wrapper to provide React Router context to the entire app
export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}