
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, TrendingUp, Building2 } from 'lucide-react';

interface LoanWizardProps {
  onClose: () => void;
}

export const LoanWizard = ({ onClose }: LoanWizardProps) => {
  const [step, setStep] = useState(1);
  const [loanData, setLoanData] = useState({
    amount: '',
    tenure: '',
    purpose: '',
    hasCollateral: ''
  });

  const [results, setResults] = useState<any>(null);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Generate results
      generateResults();
    }
  };

  const generateResults = () => {
    // Simulate loan matching logic
    const amount = parseInt(loanData.amount);
    const newScore = Math.min(85, 75 + Math.floor(Math.random() * 10));
    
    const matchedLenders = [
      {
        name: 'KreditBee',
        logo: '🐝',
        offer: `₹${amount.toLocaleString()} @ 14.5% APR`,
        tenure: `${loanData.tenure} months`,
        processing: '15 minutes',
        match: '95%'
      },
      {
        name: 'Fibe',
        logo: '⚡',
        offer: `₹${(amount * 0.8).toLocaleString()} @ 16.2% APR`,
        tenure: `${loanData.tenure} months`,
        processing: '30 minutes',
        match: '88%'
      },
      {
        name: 'CASHe',
        logo: '💰',
        offer: `₹${(amount * 0.9).toLocaleString()} @ 18% APR`,
        tenure: `${loanData.tenure} months`,
        processing: '8 minutes',
        match: '82%'
      }
    ];

    setResults({
      newScore,
      oldScore: 75,
      lenders: matchedLenders
    });
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Loan Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount needed"
                value={loanData.amount}
                onChange={(e) => setLoanData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div>
              <Label>Tenure (months)</Label>
              <Select onValueChange={(value) => setLoanData(prev => ({ ...prev, tenure: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tenure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label>What's this loan for?</Label>
              <Select onValueChange={(value) => setLoanData(prev => ({ ...prev, purpose: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Do you have any collateral or guarantor?</Label>
              <Select onValueChange={(value) => setLoanData(prev => ({ ...prev, hasCollateral: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Quick Profile Check</h3>
              <p className="text-sm text-gray-600">
                We'll use your existing profile data to find the best matches
              </p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Loan Amount:</span>
                <span className="font-medium">₹{parseInt(loanData.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tenure:</span>
                <span className="font-medium">{loanData.tenure} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Purpose:</span>
                <span className="font-medium capitalize">{loanData.purpose}</span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {/* Updated Trust Score */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Your Trust Score</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{results?.newScore}/100</span>
                      <Badge className="bg-green-100 text-green-800">
                        +{results?.newScore - results?.oldScore} improved!
                      </Badge>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            {/* Matched Lenders */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Recommended Offers</h3>
              <div className="space-y-3">
                {results?.lenders.map((lender: any, index: number) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{lender.logo}</span>
                          <span className="font-medium">{lender.name}</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          {lender.match} match
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Offer:</p>
                          <p className="font-medium">{lender.offer}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Processing:</p>
                          <p className="font-medium">{lender.processing}</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {step === 4 ? 'Loan Matches Found!' : `Find a Loan - Step ${step}/3`}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {step <= 3 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between">
            {step > 1 && step < 4 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <div className="flex-1" />
            {step < 4 && (
              <Button 
                onClick={handleNext}
                disabled={
                  (step === 1 && (!loanData.amount || !loanData.tenure)) ||
                  (step === 2 && (!loanData.purpose || !loanData.hasCollateral))
                }
              >
                {step === 3 ? 'Find Matches' : 'Next'}
              </Button>
            )}
            {step === 4 && (
              <Button onClick={onClose} className="w-full">
                Done
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
