import { Hero } from '@/components/home/hero';
import { WhatIDo } from '@/components/home/what-i-do';
import { Experience } from '@/components/home/experience';
import { experience } from '@/data/experience';

export default function Page() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <Experience experience={experience} />
    </>
  );
}
