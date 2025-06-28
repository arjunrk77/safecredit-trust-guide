
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, TrendingUp, Search, ArrowUp } from 'lucide-react';
import { TrustScoreCard } from '@/components/TrustScoreCard';
import { FraudDetector } from '@/components/FraudDetector';
import { LoanWizard } from '@/components/LoanWizard';

export const HomeTab = () => {
  const [showLoanWizard, setShowLoanWizard] = useState(false);

  return (
    <div className="p-4 space-y-6">
      {/* Trust Score Card */}
      <TrustScoreCard />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => setShowLoanWizard(true)}>
          <CardContent className="p-4 text-center">
            <Search className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Find a Loan</h3>
            <p className="text-sm text-gray-600">Get matched with lenders</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Improve Score</h3>
            <p className="text-sm text-gray-600">Boost your trust rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Detector */}
      <FraudDetector />

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-green-600" />
            Quick Tips to Improve Your Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Increase UPI transactions</p>
                <p className="text-xs text-gray-600">Use UPI for daily payments to show active usage</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Remove risky apps</p>
                <p className="text-xs text-gray-600">Uninstall apps flagged by RBI or consumer groups</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Link bank account</p>
                <p className="text-xs text-gray-600">Connect your primary bank for better verification</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Wizard Modal */}
      {showLoanWizard && (
        <LoanWizard onClose={() => setShowLoanWizard(false)} />
      )}
    </div>
  );
};
