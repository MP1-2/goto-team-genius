
import React from 'react';
import { Heart, Home, Search, User, LogOut, Wand } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Home',
      path: '/portal',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: 'Favorites',
      path: '/favorites',
    },
    {
      icon: <User className="h-5 w-5" />,
      label: 'Profile',
      path: '/profile',
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: 'Search',
      path: '/search',
    },
    {
      icon: <Wand className="h-5 w-5" />,
      label: 'AI Tools',
      path: '/suggestions',
    },
  ];

  const handleLogout = () => {
    // Clear user info from localStorage
    localStorage.removeItem('userInfo');
    
    // Show a toast notification
    toast.success('Logged out successfully');
    
    // Close the drawer
    onOpenChange(false);
    
    // Navigate to the home/intro page
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
          
          <div className="mt-auto pt-4 border-t">
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Log Out</span>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
