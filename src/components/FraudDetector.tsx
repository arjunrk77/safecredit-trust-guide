
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Scan } from 'lucide-react';

export const FraudDetector = () => {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'clean' | 'warning'>('idle');
  const [detectedApps, setDetectedApps] = useState<string[]>([]);

  // Simulated risky app database
  const riskyApps = [
    'CashEasy', 'QuickRupee', 'InstaCash', 'MoneyNow', 'LoanBaba', 
    'CashBean', 'EasyLoan', 'FastCash', 'QuickMoney', 'CashKing'
  ];

  const handleScan = async () => {
    setScanStatus('scanning');
    
    // Simulate scanning process
    setTimeout(() => {
      // Get user's installed loan apps from local storage
      const userData = localStorage.getItem('safecredit_user_data');
      let installedApps: string[] = [];
      
      if (userData) {
        const parsedData = JSON.parse(userData);
        installedApps = parsedData.installedLoanApps || [];
      }
      
      // Check for risky apps
      const foundRiskyApps = installedApps.filter(app => 
        riskyApps.some(riskyApp => 
          app.toLowerCase().includes(riskyApp.toLowerCase()) || 
          riskyApp.toLowerCase().includes(app.toLowerCase())
        )
      );
      
      if (foundRiskyApps.length > 0) {
        setDetectedApps(foundRiskyApps);
        setScanStatus('warning');
      } else {
        setScanStatus('clean');
      }
    }, 2000);
  };

  const renderScanResult = () => {
    switch (scanStatus) {
      case 'scanning':
        return (
          <div className="text-center py-4">
            <Scan className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-spin" />
            <p className="text-sm text-gray-600">Scanning installed apps...</p>
          </div>
        );
      
      case 'clean':
        return (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              ✅ No risky apps detected! Your device looks safe.
            </AlertDescription>
          </Alert>
        );
      
      case 'warning':
        return (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              🚨 Warning: Detected potentially risky apps: {detectedApps.join(', ')}
              <br />
              <span className="text-sm">These apps have been flagged by RBI or consumer groups.</span>
            </AlertDescription>
          </Alert>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Fraud App Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Button 
            onClick={handleScan}
            disabled={scanStatus === 'scanning'}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            {scanStatus === 'scanning' ? 'Scanning...' : 'Scan for Risky Apps'}
          </Button>
          <p className="text-xs text-gray-600 mt-2">
            Check your phone for potentially harmful loan apps
          </p>
        </div>
        
        {renderScanResult()}
        
        {scanStatus === 'warning' && (
          <div className="flex gap-2">
            <Button size="sm" variant="destructive" className="flex-1">
              Uninstall Apps
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Learn More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
