
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

// Enhanced mock rankings with more data
const PLAYER_RANKINGS = {
  football: [
    { id: '1', name: 'Christian McCaffrey', sport: 'Football', position: 'RB', rank: 1, team: 'San Francisco 49ers', teamLogo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png', league: 'NFL', bestPerf: '92%', worstPerf: '76%', trend: 'up' },
    { id: '2', name: 'Patrick Mahomes', sport: 'Football', position: 'QB', rank: 2, team: 'Kansas City Chiefs', teamLogo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png', league: 'NFL', bestPerf: '90%', worstPerf: '71%', trend: 'same' },
    { id: '3', name: 'Justin Jefferson', sport: 'Football', position: 'WR', rank: 3, team: 'Minnesota Vikings', teamLogo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png', league: 'NFL', bestPerf: '88%', worstPerf: '68%', trend: 'up' },
    { id: '4', name: 'Travis Kelce', sport: 'Football', position: 'TE', rank: 4, team: 'Kansas City Chiefs', teamLogo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png', league: 'NFL', bestPerf: '87%', worstPerf: '65%', trend: 'down' },
    { id: '5', name: "Ja'Marr Chase", sport: 'Football', position: 'WR', rank: 5, team: 'Cincinnati Bengals', teamLogo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png', league: 'NFL', bestPerf: '86%', worstPerf: '69%', trend: 'up' },
  ],
  basketball: [
    { id: '1', name: 'Nikola Jokić', sport: 'Basketball', position: 'C', rank: 1, team: 'Denver Nuggets', teamLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png', league: 'NBA', bestPerf: '95%', worstPerf: '82%', trend: 'up' },
    { id: '2', name: 'Luka Dončić', sport: 'Basketball', position: 'PG', rank: 2, team: 'Dallas Mavericks', teamLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/dal.png', league: 'NBA', bestPerf: '93%', worstPerf: '79%', trend: 'up' },
    { id: '3', name: 'Joel Embiid', sport: 'Basketball', position: 'C', rank: 3, team: 'Philadelphia 76ers', teamLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png', league: 'NBA', bestPerf: '91%', worstPerf: '73%', trend: 'down' },
    { id: '4', name: 'Giannis Antetokounmpo', sport: 'Basketball', position: 'PF', rank: 4, team: 'Milwaukee Bucks', teamLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png', league: 'NBA', bestPerf: '92%', worstPerf: '78%', trend: 'same' },
    { id: '5', name: 'Jayson Tatum', sport: 'Basketball', position: 'SF', rank: 5, team: 'Boston Celtics', teamLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png', league: 'NBA', bestPerf: '90%', worstPerf: '75%', trend: 'up' },
  ],
  baseball: [
    { id: '1', name: 'Aaron Judge', sport: 'Baseball', position: 'OF', rank: 1, team: 'New York Yankees', teamLogo: 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png', league: 'MLB', bestPerf: '91%', worstPerf: '79%', trend: 'up' },
    { id: '2', name: 'Shohei Ohtani', sport: 'Baseball', position: 'DH/SP', rank: 2, team: 'Los Angeles Dodgers', teamLogo: 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png', league: 'MLB', bestPerf: '94%', worstPerf: '80%', trend: 'up' },
    { id: '3', name: 'Juan Soto', sport: 'Baseball', position: 'OF', rank: 3, team: 'New York Yankees', teamLogo: 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png', league: 'MLB', bestPerf: '89%', worstPerf: '74%', trend: 'same' },
    { id: '4', name: 'Freddie Freeman', sport: 'Baseball', position: '1B', rank: 4, team: 'Los Angeles Dodgers', teamLogo: 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png', league: 'MLB', bestPerf: '87%', worstPerf: '72%', trend: 'down' },
    { id: '5', name: 'Ronald Acuña Jr.', sport: 'Baseball', position: 'OF', rank: 5, team: 'Atlanta Braves', teamLogo: 'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png', league: 'MLB', bestPerf: '90%', worstPerf: '76%', trend: 'down' },
  ],
  hockey: [
    { id: '1', name: 'Connor McDavid', sport: 'Hockey', position: 'C', rank: 1, team: 'Edmonton Oilers', teamLogo: 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png', league: 'NHL', bestPerf: '96%', worstPerf: '85%', trend: 'up' },
    { id: '2', name: 'Nathan MacKinnon', sport: 'Hockey', position: 'C', rank: 2, team: 'Colorado Avalanche', teamLogo: 'https://a.espncdn.com/i/teamlogos/nhl/500/col.png', league: 'NHL', bestPerf: '93%', worstPerf: '81%', trend: 'up' },
    { id: '3', name: 'Auston Matthews', sport: 'Hockey', position: 'C', rank: 3, team: 'Toronto Maple Leafs', teamLogo: 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png', league: 'NHL', bestPerf: '91%', worstPerf: '78%', trend: 'down' },
    { id: '4', name: 'Leon Draisaitl', sport: 'Hockey', position: 'C', rank: 4, team: 'Edmonton Oilers', teamLogo: 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png', league: 'NHL', bestPerf: '90%', worstPerf: '76%', trend: 'same' },
    { id: '5', name: 'Nikita Kucherov', sport: 'Hockey', position: 'RW', rank: 5, team: 'Tampa Bay Lightning', teamLogo: 'https://a.espncdn.com/i/teamlogos/nhl/500/tb.png', league: 'NHL', bestPerf: '91%', worstPerf: '77%', trend: 'up' },
  ]
};

// Helper function to render trend icon
const renderTrendIcon = (trend: string) => {
  switch(trend) {
    case 'up':
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    case 'down':
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    default:
      return <Minus className="h-4 w-4 text-gray-400" />;
  }
};

const PlayerRankingsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Player Rankings</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/rankings')}>
          View All
        </Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="football" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
              <TabsTrigger value="baseball">Baseball</TabsTrigger>
              <TabsTrigger value="hockey">Hockey</TabsTrigger>
            </TabsList>
            
            {Object.keys(PLAYER_RANKINGS).map((sport) => (
              <TabsContent key={sport} value={sport}>
                <ScrollArea className="h-[350px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Pos</TableHead>
                        <TableHead>League</TableHead>
                        <TableHead>Best %</TableHead>
                        <TableHead>Worst %</TableHead>
                        <TableHead className="text-right">Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PLAYER_RANKINGS[sport as keyof typeof PLAYER_RANKINGS].map((player) => (
                        <TableRow key={player.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              {player.rank}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{player.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img 
                                src={player.teamLogo} 
                                alt={player.team} 
                                className="h-6 w-6 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60";
                                }}
                              />
                              <span>{player.team}</span>
                            </div>
                          </TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell>{player.league}</TableCell>
                          <TableCell className="text-green-600">{player.bestPerf}</TableCell>
                          <TableCell className="text-red-600">{player.worstPerf}</TableCell>
                          <TableCell className="text-right">
                            {renderTrendIcon(player.trend)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default PlayerRankingsSection;
