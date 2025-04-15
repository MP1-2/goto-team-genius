
import React from 'react';
import { Heart, Home, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      icon: <Home className="h-6 w-6" />,
      label: 'Home',
      path: '/home',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      label: 'Favorites',
      path: '/favorites',
    },
    {
      icon: <User className="h-6 w-6" />,
      label: 'Profile',
      path: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around border-t bg-background px-4">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            'flex flex-col items-center justify-center space-y-1 text-muted-foreground transition-colors',
            location.pathname === item.path && 'text-primary'
          )}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
