import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Edit, Check, CreditCard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MOCK_USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '********',
};

const MOCK_SUBSCRIPTIONS = [
  { 
    id: '1', 
    teamName: 'Thunder Dragons', 
    purchasedAt: '2025-03-15', 
    expiresAt: '2026-03-15',
    status: 'Active',
  },
  { 
    id: '2', 
    teamName: 'Lightning Eagles', 
    purchasedAt: '2025-03-28', 
    expiresAt: '2026-03-28',
    status: 'Active',
  },
  { 
    id: '3', 
    teamName: 'Golden Knights', 
    purchasedAt: '2025-04-05', 
    expiresAt: '2026-04-05',
    status: 'Active',
  },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(MOCK_USER);
  const [subscriptions] = useState(MOCK_SUBSCRIPTIONS);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(MOCK_USER);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleExtendSubscription = (subscriptionId: string, teamName: string, expiresAt: string) => {
    navigate('/payment', { 
      state: { 
        subscriptionId,
        teamName,
        expiryDate: expiresAt
      } 
    });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold">Profile</h1>
          </div>
          <div className="flex items-center space-x-2">
            {editing ? (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSave}
              >
                <Save className="h-5 w-5" />
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setEditing(true)}
              >
                <Edit className="h-5 w-5" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {editing ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="rounded-md border px-3 py-2">{user.name}</div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {editing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="rounded-md border px-3 py-2">{user.email}</div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                {editing ? (
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="rounded-md border px-3 py-2">{user.password}</div>
                )}
              </div>
              
              {editing && (
                <Button className="w-full mt-4" onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="subscriptions" className="mt-6">
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{subscription.teamName}</CardTitle>
                    <CardDescription>
                      Reserved on {new Date(subscription.purchasedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Status:</div>
                      <div className="flex items-center font-medium">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        {subscription.status}
                      </div>
                      <div className="text-muted-foreground">Expires:</div>
                      <div className="font-medium">
                        {new Date(subscription.expiresAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleExtendSubscription(
                        subscription.id, 
                        subscription.teamName,
                        subscription.expiresAt
                      )}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Extend Reservation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
