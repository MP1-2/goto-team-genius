
import React from 'react';
import { Heart, Home, User, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const LeftSidebar = () => {
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
  ];

  const handleLogout = () => {
    // Clear user info from localStorage
    localStorage.removeItem('userInfo');
    
    // Show a toast notification
    toast.success('Logged out successfully');
    
    // Navigate to the home/intro page
    navigate('/');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftSidebar;
