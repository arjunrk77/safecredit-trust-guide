
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    monthlyIncome: '',
    jobType: '',
    upiUsage: '',
    hasLoanApps: false,
    installedLoanApps: [] as string[],
    loanPurpose: '',
    consentApps: false,
    consentULI: false,
  });

  const loanApps = [
    'CashBean', 'MoneyTap', 'KreditBee', 'CASHe', 'Slice', 'LazyPay', 'Fibe', 'Other'
  ];

  const steps = [
    'Welcome',
    'Personal Info',
    'Financial Info', 
    'Loan Apps',
    'Purpose',
    'Permissions'
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save data and complete onboarding
      localStorage.setItem('safecredit_user_data', JSON.stringify(formData));
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleLoanApp = (app: string) => {
    setFormData(prev => ({
      ...prev,
      installedLoanApps: prev.installedLoanApps.includes(app)
        ? prev.installedLoanApps.filter(a => a !== app)
        : [...prev.installedLoanApps, app]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Shield className="h-20 w-20 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">SafeCredit</h1>
              <p className="text-xl text-blue-600 font-medium mb-4">Borrow Smart. Stay Safe.</p>
              <p className="text-gray-600">Your digital trust assistant for safe lending</p>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Detect risky loan apps</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Get your Trust Score</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Find verified lenders</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="income">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                placeholder="Enter your monthly income"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Select onValueChange={(value) => updateFormData('jobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="gig">Gig Worker</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>UPI Usage Frequency</Label>
              <Select onValueChange={(value) => updateFormData('upiUsage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How often do you use UPI?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Few times a month)</SelectItem>
                  <SelectItem value="medium">Medium (Weekly)</SelectItem>
                  <SelectItem value="high">High (Daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasLoanApps"
                checked={formData.hasLoanApps}
                onCheckedChange={(checked) => updateFormData('hasLoanApps', checked)}
              />
              <Label htmlFor="hasLoanApps">I have loan apps installed on my phone</Label>
            </div>
            {formData.hasLoanApps && (
              <div>
                <Label>Which loan apps do you have? (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {loanApps.map((app) => (
                    <div key={app} className="flex items-center space-x-2">
                      <Checkbox
                        id={app}
                        checked={formData.installedLoanApps.includes(app)}
                        onCheckedChange={() => toggleLoanApp(app)}
                      />
                      <Label htmlFor={app} className="text-sm">{app}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="purpose">What would you primarily use a loan for?</Label>
              <Select onValueChange={(value) => updateFormData('loanPurpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentApps"
                  checked={formData.consentApps}
                  onCheckedChange={(checked) => updateFormData('consentApps', checked)}
                />
                <div>
                  <Label htmlFor="consentApps" className="font-medium">Scan installed apps</Label>
                  <p className="text-sm text-gray-600">Allow SafeCredit to scan your phone for risky loan apps</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentULI"
                  checked={formData.consentULI}
                  onCheckedChange={(checked) => updateFormData('consentULI', checked)}
                />
                <div>
                  <Label htmlFor="consentULI" className="font-medium">Consent to share data via ULI</Label>
                  <p className="text-sm text-gray-600">For future integration with verified lenders</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-lg">{steps[step]}</CardTitle>
            <span className="text-sm text-gray-500">{step + 1}/{steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
          <div className="flex justify-between">
            {step > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            <div className="flex-1" />
            <Button onClick={handleNext} className="flex items-center gap-2">
              {step === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
