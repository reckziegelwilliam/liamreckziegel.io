
import { Experience } from '@/types/experience';

export const experience: Experience[] = [
  {
    year: 2024,
    title: "Senior Full Stack Engineer",
    company: "HELPAR",
    location: "New York, NY",
    period: "June 2024 - Present",
    description: "Leading the development of a modern web application platform with focus on scalability and performance.",
    achievements: [
      "Spearheading complete app rebuild, transitioning from create-react-app to a Turbo monorepo with Vercel's Next.js",
      "Leading a global team, integrating AWS services to enhance app scalability and performance",
      "Architected a multi-tenant platform for post-purchase NFC tag experiences, including brand interactions and admin analytics",
      "Implemented modern tooling: RadixUI, NextAuth, tRPC, and DrizzleORM with PlanetScale for robust database management"
    ],
    tech: ["Next.js", "AWS", "RadixUI", "tRPC", "DrizzleORM", "PlanetScale"]
  },
  {
    year: 2023,
    title: "Founding Full Stack Engineer",
    company: "HAVE YOU MET",
    location: "New York, NY",
    period: "Aug 2023 - Feb 2024",
    description: "Led the development of a cross-platform mobile application, focusing on user experience and performance.",
    achievements: [
      "Built and deployed a React Native app for testing on iOS and Android",
      "Led the development of the frontend experience, collaborating with the product manager and overseeing 1 engineer",
      "Used essential libraries such as Twilio for notifications, Redux for state management and Reanimated for UI"
    ],
    tech: ["React Native", "Twilio", "Redux", "Reanimated"]
  },
  {
    year: 2023,
    title: "Application Developer",
    company: "R/WEST (INTEL)",
    location: "Portland, OR",
    period: "June - July 2023",
    description: "Redesigned system architecture for large-scale retail kiosk deployment.",
    achievements: [
      "Redesigned the system architecture for in-store consumer kiosk system with TypeScript/Electron/AWS/PouchDB",
      "Architected 10,000+ store kiosks into a central asset management system"
    ],
    tech: ["TypeScript", "Electron", "AWS", "PouchDB"]
  },
  {
    year: 2023,
    title: "Software Engineer",
    company: "ROBUST COMPUTING",
    location: "San Francisco, CA",
    period: "Jan - May 2023",
    description: "Developed and optimized cloud-based data processing solutions.",
    achievements: [
      "Developed a Node.js API as an AWS Lambda function, integrating AWS Cognito for secure authentication",
      "Rewrote and deployed the data scraping service in Python, utilizing AWS Lambda and AWS Glue for efficient ETL processing",
      "Successfully transferred data to a managed AWS Postgres server, ensuring data integrity and accessibility"
    ],
    tech: ["Node.js", "AWS Lambda", "Python", "AWS Glue", "PostgreSQL"]
  },
  {
    year: 2018,
    title: "Contract Frontend Engineer",
    company: "PILOT LIGHT",
    location: "Various Locations",
    period: "2018 - 2022",
    description: "Delivered custom web solutions for diverse client base across multiple industries.",
    achievements: [
      "Developed over 50 websites and 20 web applications as a contract-for-hire developer using MongoDB, Express, React and Node.js",
      "Injected JavaScript containers into low code CMS and CRM platforms for small business owners in the retail, real estate and venture capital space"
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "JavaScript"]
  }
];