
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export const TrustScoreCard = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('safecredit_user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const getTrustScore = () => {
    if (!userData) return 75; // Default score
    
    let score = 50;
    
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

  const score = getTrustScore();
  
  const getRiskInfo = (score: number) => {
    if (score >= 80) return { 
      tier: 'Low Risk', 
      color: 'bg-green-100 text-green-800',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    };
    if (score >= 60) return { 
      tier: 'Medium Risk', 
      color: 'bg-yellow-100 text-yellow-800',
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200'
    };
    return { 
      tier: 'High Risk', 
      color: 'bg-red-100 text-red-800',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200'
    };
  };

  const riskInfo = getRiskInfo(score);

  return (
    <Card className={`bg-gradient-to-br ${riskInfo.bgColor} ${riskInfo.borderColor}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Trust Score
          </CardTitle>
          <Badge className={riskInfo.color}>
            {riskInfo.tier}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{score}</div>
            <div className="text-sm text-gray-600">out of 100</div>
          </div>
          <div className="flex-1">
            <Progress value={score} className="h-3" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-gray-700">
              {score >= 80 ? 'Excellent creditworthiness' : 
               score >= 60 ? 'Good potential for loans' : 
               'Room for improvement'}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
