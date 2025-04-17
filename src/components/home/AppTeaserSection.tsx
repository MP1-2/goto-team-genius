
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

const AppTeaserSection = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Get the GotoGuys App</h2>
            <p className="text-lg text-muted-foreground">
              Access all our features on the go. Download our mobile app for a seamless fantasy team management experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                App Store
              </Button>
              <Button className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Google Play
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-72 h-96 flex items-center justify-center">
              <p className="text-center text-muted-foreground">
                [App Screenshot]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppTeaserSection;
