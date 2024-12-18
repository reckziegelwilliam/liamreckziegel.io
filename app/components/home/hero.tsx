import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { SocialLink } from '@/app/types/skill';
import { motion } from 'framer-motion';

const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: '#', icon: Github },
  { platform: 'LinkedIn', url: '#', icon: Linkedin },
  { platform: 'Email', url: 'mailto:your@email.com', icon: Mail }
];

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tighter">
          John Doe
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
          Full Stack Software Engineer
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
          I build accessible, scalable web applications with modern technologies.
          Currently focused on building robust full-stack solutions at TechCorp.
        </p>
        
        <div className="flex flex-wrap gap-4">
          {socialLinks.map(({ platform, url, icon: Icon }) => (
            <motion.a
              key={platform}
              href={url}
              className="flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5 mr-2" />
              {platform}
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </section>
  );
}