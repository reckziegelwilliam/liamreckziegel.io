import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Cloud, Wrench } from 'lucide-react';
import { Skill } from '@/app/types/skill';

const categories = {
  frontend: { name: 'Frontend', icon: Code },
  backend: { name: 'Backend', icon: Server },
  devops: { name: 'DevOps', icon: Cloud },
  other: { name: 'Other', icon: Wrench }
};


export function Skills({ skills }: { skills: Skill[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = selectedCategory
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  return (
    <section className="py-16">
      <h2 className="font-bold text-2xl mb-8 tracking-tighter">
        Skills & Technologies
      </h2>

      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries(categories).map(([key, { name, icon: Icon }]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
            className={`
              flex items-center px-4 py-2 rounded-lg border
              ${selectedCategory === key
                ? 'border-blue-500 text-blue-500'
                : 'border-gray-200 dark:border-gray-800'
              }
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-4 h-4 mr-2" />
            {name}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < (skill.level || 0)
                        ? 'bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}