import { MdMiscellaneousServices } from 'react-icons/md';
import React from 'react';
import { RiGalleryFill, RiFileSearchFill } from 'react-icons/ri';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { MdContactPage, MdFreeCancellation, MdWorkHistory } from 'react-icons/md';
import { AiFillProfile } from 'react-icons/ai';
const sublinks = [
  {
    page: 'Home',
    links: [
      { label: 'gallery', icon: <RiGalleryFill size={20} />, url: '/gallery' },
      { label: 'services', icon: <MdMiscellaneousServices size={20} />, url: '/services' },
      { label: 'FAQs', icon: <BsFillQuestionSquareFill size={15} />, url: '/journey' },
      { label: 'about', icon: <MdContactPage size={20} />, url: '/about' }
    ],
  },
  {
    page: 'Services',
    links: [
      { label: 'cancel', icon: <MdFreeCancellation size={20} />, url: '/cancel' },
      { label: 'Search Trains', icon: <RiFileSearchFill size={20} />, url: '/search' },
    ],
  },
  {
    page: 'Profile',
    links: [
      { label: 'View Profile', icon: <AiFillProfile size={20} />, url: '/profile' },
      { label: 'View History', icon: <MdWorkHistory size={20} />, url: '/viewhistory' },
    ],
  },
];

export default sublinks;
