
import { useState } from 'react';
import { Home, Building2, User } from 'lucide-react';
import { HomeTab } from '@/components/tabs/HomeTab';
import { LendersTab } from '@/components/tabs/LendersTab';
import { ProfileTab } from '@/components/tabs/ProfileTab';

export const MainApp = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, component: HomeTab },
    { id: 'lenders', label: 'Lenders', icon: Building2, component: LendersTab },
    { id: 'profile', label: 'Profile', icon: User, component: ProfileTab },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || HomeTab;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">SafeCredit</h1>
          <p className="text-sm text-blue-600">Borrow Smart. Stay Safe.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <ActiveComponent />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
