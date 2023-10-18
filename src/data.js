import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';
import React from 'react';
const sublinks = [
  {
    page: 'Home',
    links: [
      { label: 'payment', icon: <FaCreditCard />, url: '/products' },
      { label: 'terminal', icon: <FaCreditCard />, url: '/products' },
      { label: 'connect', icon: <FaCreditCard />, url: '/products' },
    ],
  },
  {
    page: 'Gallery',
    links: [
      { label: 'plugins', icon: <FaBook />, url: '/products' },
      { label: 'libraries', icon: <FaBook />, url: '/products' },
      { label: 'help', icon: <FaBook />, url: '/products' },
      { label: 'billing', icon: <FaBook />, url: '/products' },
    ],
  },
  {
    page: 'Services',
    links: [
      { label: 'cancel', icon: <FaBriefcase />, url: '/cancel' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'Journey',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'About',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'Profile',
    links: [
      { label: 'View Profile', icon: <FaBriefcase />, url: '/profile' },
      { label: 'View History', icon: <FaBriefcase />, url: '/viewhistory' },
    ],
  },
];

export default sublinks;
