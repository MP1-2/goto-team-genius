
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock rankings
const PLAYER_RANKINGS = [
  { id: '1', name: 'Christian McCaffrey', sport: 'Football', position: 'RB', rank: 1 },
  { id: '2', name: 'Nikola Jokić', sport: 'Basketball', position: 'C', rank: 1 },
  { id: '3', name: 'Aaron Judge', sport: 'Baseball', position: 'OF', rank: 1 },
  { id: '4', name: 'Connor McDavid', sport: 'Hockey', position: 'C', rank: 1 },
];

interface RankingsSectionProps {
  rankingsRef: React.RefObject<HTMLDivElement>;
}

const RankingsSection: React.FC<RankingsSectionProps> = ({ rankingsRef }) => {
  return (
    <section ref={rankingsRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Player Rankings</h2>
          <p className="text-muted-foreground max-w-2xl">
            Stay up-to-date with the top-ranked players across different fantasy sports
          </p>
        </div>
        
        <Tabs defaultValue="football" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="football">Football</TabsTrigger>
            <TabsTrigger value="basketball">Basketball</TabsTrigger>
            <TabsTrigger value="baseball">Baseball</TabsTrigger>
            <TabsTrigger value="hockey">Hockey</TabsTrigger>
          </TabsList>
          
          <TabsContent value="football" className="border rounded-lg p-4">
            <div className="space-y-4">
              {PLAYER_RANKINGS.filter(player => player.sport === 'Football').map((player) => (
                <div key={player.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      {player.rank}
                    </div>
                    <div>
                      <h4 className="font-medium">{player.name}</h4>
                      <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="basketball" className="border rounded-lg p-4">
            <div className="space-y-4">
              {PLAYER_RANKINGS.filter(player => player.sport === 'Basketball').map((player) => (
                <div key={player.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      {player.rank}
                    </div>
                    <div>
                      <h4 className="font-medium">{player.name}</h4>
                      <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="baseball" className="border rounded-lg p-4">
            <div className="space-y-4">
              {PLAYER_RANKINGS.filter(player => player.sport === 'Baseball').map((player) => (
                <div key={player.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      {player.rank}
                    </div>
                    <div>
                      <h4 className="font-medium">{player.name}</h4>
                      <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hockey" className="border rounded-lg p-4">
            <div className="space-y-4">
              {PLAYER_RANKINGS.filter(player => player.sport === 'Hockey').map((player) => (
                <div key={player.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      {player.rank}
                    </div>
                    <div>
                      <h4 className="font-medium">{player.name}</h4>
                      <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 text-center">
          <Button variant="outline">View Complete Rankings</Button>
        </div>
      </div>
    </section>
  );
};

export default RankingsSection;
