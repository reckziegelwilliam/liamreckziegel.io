import { Hero } from '@/components/home/hero';
import { WhatIDo } from '@/components/home/what-i-do';
import { Experience } from '@/components/home/experience';
import { experience } from '@/data/experience';
import { AuthErrorToast } from '@/components/auth-error-toast';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Suspense>
        <AuthErrorToast />
      </Suspense>
      <Hero />
      <WhatIDo />
      <Experience experience={experience} />
    </>
  );
}
