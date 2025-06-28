
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, DollarSign, Briefcase, Smartphone, Target, Settings, HelpCircle, LogOut, Shield } from 'lucide-react';

export const ProfileTab = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('safecredit_user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('safecredit_onboarding_complete');
    localStorage.removeItem('safecredit_user_data');
    window.location.reload();
  };

  if (!userData) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTrustScore = () => {
    // Simple trust score calculation based on user data
    let score = 50; // Base score
    
    if (userData.monthlyIncome) {
      const income = parseInt(userData.monthlyIncome);
      if (income > 50000) score += 20;
      else if (income > 25000) score += 15;
      else if (income > 15000) score += 10;
    }
    
    if (userData.upiUsage === 'high') score += 15;
    else if (userData.upiUsage === 'medium') score += 10;
    else if (userData.upiUsage === 'low') score += 5;
    
    if (userData.jobType === 'salaried') score += 15;
    else if (userData.jobType === 'self-employed') score += 10;
    else if (userData.jobType === 'gig') score += 8;
    
    if (!userData.hasLoanApps || userData.installedLoanApps.length === 0) score += 10;
    
    return Math.min(score, 100);
  };

  const getRiskTier = (score: number) => {
    if (score >= 80) return { tier: 'Low Risk', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { tier: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800' };
    return { tier: 'High Risk', color: 'bg-red-100 text-red-800' };
  };

  const trustScore = getTrustScore();
  const riskInfo = getRiskTier(trustScore);

  return (
    <div className="p-4 space-y-4">
      {/* User Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{userData.fullName}</h2>
              <p className="text-gray-600">{userData.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Trust Score</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">{trustScore}/100</span>
                <Badge className={riskInfo.color}>
                  {riskInfo.tier}
                </Badge>
              </div>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      {/* Profile Data */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="font-medium">₹{userData.monthlyIncome}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-medium capitalize">{userData.jobType}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">UPI Usage</p>
                <p className="font-medium capitalize">{userData.upiUsage}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Loan Purpose</p>
                <p className="font-medium capitalize">{userData.loanPurpose}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ULI Integration */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Link ULI Account</h3>
              <p className="text-sm text-gray-600">Connect for better loan matching</p>
            </div>
            <Button size="sm" disabled>
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start" disabled>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        
        <Button variant="outline" className="w-full justify-start" disabled>
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Support
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
