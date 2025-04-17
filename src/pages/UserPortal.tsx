
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Wand, Image, Clock, User, Heart, Award, Newspaper, FileText } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

const UserPortal: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo') || '{}') 
    : { name: 'User' };

  // Mock data for player rankings
  const topPlayers = [
    { id: '1', name: 'Christian McCaffrey', position: 'RB', team: 'SF', score: 97 },
    { id: '2', name: 'Patrick Mahomes', position: 'QB', team: 'KC', score: 95 },
    { id: '3', name: 'Justin Jefferson', position: 'WR', team: 'MIN', score: 94 },
  ];

  // Mock data for blog posts (renamed to team name tips)
  const recentBlogs = [
    { 
      id: '1', 
      title: 'Use Alliteration for Memorable Names', 
      date: 'April 15, 2025',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: '2', 
      title: 'Incorporate Local Culture in Team Names', 
      date: 'April 10, 2025',
      image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Welcome, {userInfo.name}</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* Action Shortcuts */}
        <section className="grid grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/search')}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">Reserve Name</span>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/suggestions')}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Wand className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">AI Name</span>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/logo')}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Image className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">AI Logo</span>
            </CardContent>
          </Card>
        </section>

        {/* Tips for Good Team Name */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Tips for Good Team Name</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/blogs')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/blogs/${blog.id}`)}>
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-all hover:scale-105"
                    onError={(e) => {
                      // Fallback to a default sports image if the original fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">{blog.date}</div>
                    <h3 className="font-semibold">{blog.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Players Rankings */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Top Players</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/rankings')}>
              View All
            </Button>
          </div>
          <Card>
            <CardContent className="p-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPlayers.map((player, index) => (
                    <TableRow key={player.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>{player.team}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">{player.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default UserPortal;
