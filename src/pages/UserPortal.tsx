
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LeftSidebar from '@/components/layout/LeftSidebar';
import ActionShortcuts from '@/components/portal/ActionShortcuts';
import TipsSection from '@/components/portal/TipsSection';
import PlayerRankingsSection from '@/components/portal/PlayerRankingsSection';

const UserPortal: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo') || '{}') 
    : { name: 'User' };

  return (
    <div className="h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Left Sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <LeftSidebar />
          </div>

          <div className="flex-1">
            {/* Header */}
            <header className="bg-white p-4 shadow-sm">
              <div className="container mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-xl font-bold">Welcome, {userInfo.name}</h1>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate('/profile')}
                    className="md:hidden"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </header>

            <main className="container mx-auto p-4 space-y-6 pb-20 md:pb-6">
              {/* Action Shortcuts */}
              <ActionShortcuts />

              {/* Tips for Good Team Name */}
              <TipsSection />

              {/* Player Rankings with Tabs */}
              <PlayerRankingsSection />
            </main>

            {/* Bottom Navigation - visible only on mobile */}
            <div className="md:hidden">
              <BottomNavigation />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserPortal;
