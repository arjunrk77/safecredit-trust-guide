
import { useState, useEffect } from 'react';
import { Onboarding } from '@/components/Onboarding';
import { MainApp } from '@/components/MainApp';

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingStatus = localStorage.getItem('safecredit_onboarding_complete');
    setHasCompletedOnboarding(onboardingStatus === 'true');
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('safecredit_onboarding_complete', 'true');
    setHasCompletedOnboarding(true);
  };

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <MainApp />;
};

export default Index;
