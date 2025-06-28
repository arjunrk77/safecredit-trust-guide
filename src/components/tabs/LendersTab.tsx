
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Star, ArrowRight } from 'lucide-react';

const lenders = [
  {
    id: 1,
    name: 'KreditBee',
    logo: '🐝',
    minAmount: '₹1,000',
    maxAmount: '₹4,00,000',
    interestRate: '11.99% - 47.64%',
    processingTime: '15 minutes',
    rating: 4.2,
    features: ['No collateral', 'Quick approval', 'Flexible tenure'],
    riskTier: 'low'
  },
  {
    id: 2,
    name: 'CASHe',
    logo: '💰',
    minAmount: '₹5,000',
    maxAmount: '₹4,00,000',
    interestRate: '2.25% per month',
    processingTime: '8 minutes',
    rating: 4.0,
    features: ['Social credit scoring', 'Young professionals', 'Easy KYC'],
    riskTier: 'medium'
  },
  {
    id: 3,
    name: 'Slice',
    logo: '🍕',
    minAmount: '₹2,000',
    maxAmount: '₹10,00,000',
    interestRate: '13% - 36%',
    processingTime: '24 hours',
    rating: 4.1,
    features: ['Credit card alternative', 'Rewards program', 'UPI payments'],
    riskTier: 'low'
  },
  {
    id: 4,
    name: 'MoneyTap',
    logo: '💳',
    minAmount: '₹3,000',
    maxAmount: '₹5,00,000',
    interestRate: '13% - 36%',
    processingTime: '2 hours',
    rating: 3.8,
    features: ['Line of credit', 'Pay interest on usage', 'EMI option'],
    riskTier: 'medium'
  },
  {
    id: 5,
    name: 'Fibe',
    logo: '⚡',
    minAmount: '₹2,000',
    maxAmount: '₹5,00,000',
    interestRate: '24% - 30%',
    processingTime: '30 minutes',
    rating: 4.3,
    features: ['Instant approval', 'Salary based limit', 'Flexible repayment'],
    riskTier: 'low'
  }
];

export const LendersTab = () => {
  const getRiskBadgeColor = (tier: string) => {
    switch (tier) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Verified Lending Partners</h2>
        <p className="text-gray-600">Choose from RBI-approved lenders</p>
      </div>

      {lenders.map((lender) => (
        <Card key={lender.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{lender.logo}</div>
                <div>
                  <CardTitle className="text-lg">{lender.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{lender.rating}</span>
                    </div>
                    <Badge className={getRiskBadgeColor(lender.riskTier)}>
                      {lender.riskTier} risk
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" className="flex items-center gap-1">
                View Offers
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Loan Amount</p>
                <p className="font-medium">{lender.minAmount} - {lender.maxAmount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Interest Rate</p>
                <p className="font-medium">{lender.interestRate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Processing Time</p>
                <p className="font-medium">{lender.processingTime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="font-medium">Personal Loan</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Key Features</p>
              <div className="flex flex-wrap gap-1">
                {lender.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900 mb-1">More lenders coming soon</h3>
          <p className="text-sm text-gray-600">We're adding more verified partners to give you better options</p>
        </CardContent>
      </Card>
    </div>
  );
};
