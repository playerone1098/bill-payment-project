import React from 'react';
import { Zap, Droplets, Wifi, Smartphone, Flame, Tv, FileText } from 'lucide-react';

export default function CategoryIcon({ category, size = 20, className = '' }) {
  switch (category?.toLowerCase()) {
    case 'electricity':
      return <Zap size={size} className={className || 'text-amber-500'} />;
    case 'water':
      return <Droplets size={size} className={className || 'text-cyan-500'} />;
    case 'broadband':
      return <Wifi size={size} className={className || 'text-violet-500'} />;
    case 'mobile':
      return <Smartphone size={size} className={className || 'text-blue-500'} />;
    case 'gas':
      return <Flame size={size} className={className || 'text-orange-500'} />;
    case 'dth':
      return <Tv size={size} className={className || 'text-pink-500'} />;
    default:
      return <FileText size={size} className={className || 'text-gray-500'} />;
  }
}
