// Structured data for SEO
// Use these JSON-LD schemas across the site

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Liam Reckziegel",
    "alternateName": "William Reckziegel",
    "url": "https://liamrex.io",
    "image": "https://liamrex.io/avatar.jpg",
    "sameAs": [
      "https://github.com/reckziegelwilliam",
      "https://www.linkedin.com/in/william-reckziegel/",
      "https://x.com/liamreckziegel"
    ],
    "jobTitle": "Founding Engineer & Product Partner",
    "worksFor": {
      "@type": "Organization",
      "name": "HELPAR"
    },
    "knowsAbout": [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Node.js",
      "AWS",
      "System Architecture",
      "Full-Stack Development"
    ],
    "email": "reckziegel.william@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "addressCountry": "US"
    }
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lumenaut Studio",
    "alternateName": "Lumenaut",
    "url": "https://liamrex.io",
    "logo": "https://liamrex.io/avatar.jpg",
    "description": "Software development studio specializing in websites and apps for creators, small businesses, and startups.",
    "founder": {
      "@type": "Person",
      "name": "Liam Reckziegel"
    },
    "foundingDate": "2018",
    "sameAs": [
      "https://github.com/reckziegelwilliam"
    ]
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Liam Reckziegel",
    "url": "https://liamrex.io",
    "description": "Portfolio and blog of Liam Reckziegel, a founding engineer specializing in React Native, Next.js, and AWS.",
    "author": {
      "@type": "Person",
      "name": "Liam Reckziegel"
    },
    "inLanguage": "en-US"
  };
}

export function getBlogPostSchema(post: {
  title: string;
  subtitle?: string;
  summary?: string;
  published_at: Date;
  updated_at: Date;
  slug: string;
  cover_image_url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "alternativeHeadline": post.subtitle,
    "description": post.summary,
    "image": post.cover_image_url || "https://liamrex.io/opengraph-image.jpg",
    "author": {
      "@type": "Person",
      "name": "Liam Reckziegel"
    },
    "publisher": {
      "@type": "Person",
      "name": "Liam Reckziegel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://liamrex.io/avatar.jpg"
      }
    },
    "datePublished": post.published_at.toISOString(),
    "dateModified": post.updated_at.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://liamrex.io/playbooks/${post.slug}`
    }
  };
}

export function getCaseStudySchema(study: {
  company: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${study.company} Case Study`,
    "headline": study.title,
    "description": study.tagline,
    "author": {
      "@type": "Person",
      "name": "Liam Reckziegel",
      "jobTitle": study.role
    },
    "datePublished": study.period,
    "url": `https://liamrex.io/case-studies/${study.slug}`,
    "about": {
      "@type": "Organization",
      "name": study.company
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://liamrex.io${item.url}`
    }))
  };
}

