import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Edit, Check, CreditCard, LogOut, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import InterestsSection from '@/components/profile/InterestsSection';

const DEFAULT_USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '********',
};

const DEFAULT_INTERESTS = {
  sports: [],
  teams: [],
  keywordTypes: [],
  keywords: '',
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
  const [user, setUser] = useState(DEFAULT_USER);
  const [interests, setInterests] = useState(DEFAULT_INTERESTS);
  const [subscriptions] = useState(MOCK_SUBSCRIPTIONS);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_USER);
  const [formInterests, setFormInterests] = useState(DEFAULT_INTERESTS);
  const [activeSection, setActiveSection] = useState('account-interests');
  const [teamCodes, setTeamCodes] = useState<Record<string, { code: string, platforms: string[], isUsed: boolean, reservedAt: string }>>({});
  
  useEffect(() => {
    // Load user data from localStorage if available
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        setUser({
          name: userInfo.name || DEFAULT_USER.name,
          email: userInfo.email || DEFAULT_USER.email,
          password: DEFAULT_USER.password,
        });
        setFormData({
          name: userInfo.name || DEFAULT_USER.name,
          email: userInfo.email || DEFAULT_USER.email,
          password: DEFAULT_USER.password,
        });
        
        if (userInfo.interests) {
          setInterests(userInfo.interests);
          setFormInterests(userInfo.interests);
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }

    // Load team codes from localStorage
    const teamCodesStr = localStorage.getItem('teamCodes');
    if (teamCodesStr) {
      try {
        const codes = JSON.parse(teamCodesStr);
        setTeamCodes(codes);
      } catch (error) {
        console.error('Error parsing team codes:', error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setInterests(formInterests);
    setEditing(false);
    
    // Save to localStorage
    try {
      const userInfoStr = localStorage.getItem('userInfo');
      const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
      const updatedUserInfo = {
        ...userInfo,
        name: formData.name,
        email: formData.email,
        interests: formInterests
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    } catch (error) {
      console.error('Error saving user info:', error);
    }
    
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

  const handleCopyCode = (teamName: string, code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const handleMarkAsUsed = (teamName: string) => {
    // Update the team code as used
    const updatedCodes = { ...teamCodes };
    if (updatedCodes[teamName]) {
      updatedCodes[teamName].isUsed = true;
      setTeamCodes(updatedCodes);
      
      // Save to localStorage
      localStorage.setItem('teamCodes', JSON.stringify(updatedCodes));
      toast.success(`${teamName} code marked as used`);
    }
  };

  const handleLogout = () => {
    // In a real app, you would also clear any auth tokens
    // For this demo, we'll just navigate to the intro page
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/portal')}
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
        <div className="flex justify-between mb-4">
          <Button 
            variant={activeSection === 'account-interests' ? 'default' : 'outline'}
            className="flex-1 mr-2"
            onClick={() => setActiveSection('account-interests')}
          >
            Account & Interests
          </Button>
          <Button 
            variant={activeSection === 'subscriptions' ? 'default' : 'outline'}
            className="flex-1 mx-2"
            onClick={() => setActiveSection('subscriptions')}
          >
            Subscriptions
          </Button>
          <Button 
            variant={activeSection === 'name-management' ? 'default' : 'outline'}
            className="flex-1 ml-2"
            onClick={() => setActiveSection('name-management')}
          >
            Name Management
          </Button>
        </div>
        
        {activeSection === 'account-interests' ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
            
            <InterestsSection 
              interests={editing ? formInterests : interests}
              onInterestChange={setFormInterests}
              isEditing={editing}
            />
            
            {editing && (
              <Button className="w-full mt-4" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>
        ) : activeSection === 'subscriptions' ? (
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
        ) : (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Name Codes Management</CardTitle>
                <CardDescription>
                  Manage your unique codes for fantasy platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(teamCodes).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(teamCodes).map(([teamName, codeData]) => (
                      <div key={teamName} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{teamName}</h3>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div className="text-muted-foreground">Reserved on:</div>
                          <div className="font-medium">
                            {new Date(codeData.reservedAt).toLocaleDateString()}
                          </div>
                          <div className="text-muted-foreground">Status:</div>
                          <div className="flex items-center font-medium">
                            <span className={`mr-2 h-2 w-2 rounded-full ${codeData.isUsed ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                            {codeData.isUsed ? 'Used' : 'Available'}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-1">Platforms:</h4>
                          <div className="flex flex-wrap gap-2">
                            {codeData.platforms.map(platform => (
                              <div key={platform} className="text-xs px-2 py-1 bg-secondary/50 rounded">
                                {platform}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <h4 className="text-sm font-medium mb-1">Unique Code:</h4>
                          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <div className="font-mono text-sm">
                              {codeData.isUsed ? 
                                "Code is in use" : 
                                `${codeData.code.substring(0, 2)}•••••••••••••`}
                            </div>
                            {!codeData.isUsed && (
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleCopyCode(teamName, codeData.code)}
                                  className="gap-1.5"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy
                                </Button>
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  onClick={() => handleMarkAsUsed(teamName)}
                                >
                                  <Check className="h-3.5 w-3.5 mr-1" />
                                  Mark as Used
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No team name codes available yet. Reserve a team name to get started.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
