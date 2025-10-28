
import { Experience } from '@/types/experience';

export const experience: Experience[] = [
  {
    year: 2025,
    title: "Founding Engineer (Full Stack)",
    company: "TOUT TECHNOLOGIES",
    location: "Los Angeles, CA",
    period: "Apr - Aug 2025",
    description: "Rebuilt failing React Native app to deliver first stable alpha launch for early users.",
    achievements: [
      "Rebuilt failing React Native app to deliver first stable alpha launch for 10 women users within 3 months",
      "Designed invite-only onboarding with OTP verification to enforce women-only access and protect community integrity",
      "Integrated observability stack (Sentry, Grafana, Prometheus), cutting crash diagnosis time by >40% pre-launch"
    ],
    tech: ["React Native", "Sentry", "Grafana", "Prometheus", "OTP"]
  },
  {
    year: 2024,
    title: "Senior Full Stack Engineer",
    company: "HELPAR",
    location: "New York, NY",
    period: "Jun 2024 - Present",
    description: "Leading global team to rebuild app and architect multi-tenant NFC platform with focus on scalability.",
    achievements: [
      "Leading global team of 5 engineers to rebuild app from CRA → Next.js Turbo monorepo, reducing deploy times by 60%",
      "Architected multi-tenant NFC platform enabling brands to track post-purchase interactions + analytics dashboards",
      "Integrated AWS Lambda, DynamoDB, and S3 to scale to thousands of concurrent users without downtime"
    ],
    tech: ["Next.js", "AWS Lambda", "DynamoDB", "S3", "Turbo"]
  },
  {
    year: 2023,
    title: "Founding Full Stack Engineer",
    company: "HAVE YOU MET",
    location: "New York, NY",
    period: "Aug 2023 - Feb 2024",
    description: "Built React Native MVP enabling first live user testing and investor demos.",
    achievements: [
      "Built React Native MVP (iOS/Android), enabling first live user testing and investor demos",
      "Directed frontend strategy and managed 1 engineer, achieving delivery within 6 months",
      "Integrated Twilio (notifications), Redux (state), and Reanimated, improving user engagement + reliability"
    ],
    tech: ["React Native", "Twilio", "Redux", "Reanimated"]
  },
  {
    year: 2018,
    title: "Contract Frontend Engineer",
    company: "LUMENAUT",
    location: "Remote",
    period: "2018 - 2025",
    description: "Delivered 50+ websites and 20+ apps for SMB clients, expanding digital reach.",
    achievements: [
      "Delivered 50+ websites + 20+ apps for SMB clients, expanding client digital reach",
      "Enhanced CMS/CRM platforms with custom JavaScript, enabling non-technical teams to scale operations faster"
    ],
    tech: ["JavaScript", "CMS", "CRM", "React", "Node.js"]
  }
];