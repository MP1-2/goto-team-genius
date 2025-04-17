
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">GotoGuys</h3>
            <p className="text-gray-400">
              Your ultimate platform for fantasy team branding and name management.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">📱</span> (123) 456-7890
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span> contact@gotoguys.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span> 123 Fantasy Lane, Sports City
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Download</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-800 hover:text-white">
                <Smartphone className="mr-2 h-5 w-5" />
                App Store
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-800 hover:text-white">
                <Smartphone className="mr-2 h-5 w-5" />
                Google Play
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 GotoGuys. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              <span className="text-xl">📱</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="text-xl">🐦</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="text-xl">📷</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="text-xl">👥</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
