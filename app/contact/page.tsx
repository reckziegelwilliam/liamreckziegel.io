'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitContactForm } from '@/app/actions/posts';
import { Briefcase, Users, Loader2, CheckCircle } from 'lucide-react';
import { PageViewTracker } from '@/app/components/page-view-tracker';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const [type, setType] = useState<'hire' | 'studio'>(
    typeParam === 'studio' ? 'studio' : 'hire'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project_brief: '',
    budget_range: '',
    timeline: '',
  });

  useEffect(() => {
    if (typeParam === 'studio' || typeParam === 'hire') {
      setType(typeParam as 'hire' | 'studio');
    }
  }, [typeParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('type', type);
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const result = await submitContactForm(form);
      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          project_brief: '',
          budget_range: '',
          timeline: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="max-w-2xl mx-auto text-center py-16">
        <PageViewTracker />
        <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Thanks for reaching out!</h1>
        <p className="text-lg text-[#9CA3AF] mb-8">
          I've received your message and will get back to you within 24-48 hours.
          If you need immediate assistance, feel free to email me directly at{' '}
          <a
            href="mailto:reckziegel.william@gmail.com"
            className="text-[#00D9FF] hover:underline"
          >
            reckziegel.william@gmail.com
          </a>
          .
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-[#00D9FF] text-[#0A0E1A] rounded-lg hover:bg-[#00B8D9] transition-colors font-medium"
        >
          Submit Another
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto">
      <PageViewTracker />
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        Let's Work Together
      </h1>
      <p className="text-lg text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl">
        Whether you need a founding engineer or want to work with my studio, I'm here to help.
        Fill out the form below and I'll get back to you within 24-48 hours.
      </p>

      {/* Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <button
          onClick={() => setType('hire')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            type === 'hire'
              ? 'border-[#00D9FF] bg-[#00D9FF]/10'
              : 'border-[#1A1F35] hover:border-[#00D9FF]/50'
          }`}
        >
          <Briefcase className={`w-8 h-8 mb-3 ${type === 'hire' ? 'text-[#00D9FF]' : 'text-[#9CA3AF]'}`} />
          <h3 className="text-xl font-semibold mb-2">Hire Me as a Founding Engineer</h3>
          <p className="text-sm text-[#9CA3AF]">
            Full-time or contract role building your product from the ground up.
          </p>
        </button>

        <button
          onClick={() => setType('studio')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            type === 'studio'
              ? 'border-[#00D9FF] bg-[#00D9FF]/10'
              : 'border-[#1A1F35] hover:border-[#00D9FF]/50'
          }`}
        >
          <Users className={`w-8 h-8 mb-3 ${type === 'studio' ? 'text-[#00D9FF]' : 'text-[#9CA3AF]'}`} />
          <h3 className="text-xl font-semibold mb-2">Work with Lumenaut Studio</h3>
          <p className="text-sm text-[#9CA3AF]">
            Project-based or retainer engagement for targeted development work.
          </p>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            placeholder="Your company (optional)"
          />
        </div>

        {/* Project Brief */}
        <div>
          <label htmlFor="project_brief" className="block text-sm font-medium mb-2">
            Project Brief <span className="text-[#EF4444]">*</span>
          </label>
          <textarea
            id="project_brief"
            value={formData.project_brief}
            onChange={(e) => setFormData({ ...formData, project_brief: e.target.value })}
            required
            rows={6}
            className="w-full px-4 py-3 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED] resize-none"
            placeholder="Tell me about your project, what you're building, and what help you need..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Range */}
          <div>
            <label htmlFor="budget_range" className="block text-sm font-medium mb-2">
              Budget Range
            </label>
            <select
              id="budget_range"
              value={formData.budget_range}
              onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
              className="w-full px-4 py-3 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            >
              <option value="">Select range...</option>
              <option value="< $10k">Less than $10k</option>
              <option value="$10k - $25k">$10k - $25k</option>
              <option value="$25k - $50k">$25k - $50k</option>
              <option value="$50k - $100k">$50k - $100k</option>
              <option value="$100k+">$100k+</option>
              <option value="TBD">To be discussed</option>
            </select>
          </div>

          {/* Timeline */}
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium mb-2">
              Timeline
            </label>
            <select
              id="timeline"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-3 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            >
              <option value="">Select timeline...</option>
              <option value="ASAP">ASAP</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6+ months">6+ months</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-[#9CA3AF]">
            I'll respond within 24-48 hours
          </p>
          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.project_brief}
            className="flex items-center gap-2 px-8 py-3 bg-[#00D9FF] text-[#0A0E1A] rounded-lg hover:bg-[#00B8D9] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all font-medium text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>

      {/* Alternative Contact */}
      <div className="mt-12 pt-12 border-t border-[#1A1F35] text-center">
        <p className="text-[#9CA3AF] mb-4">
          Prefer email?{' '}
          <a
            href="mailto:reckziegel.william@gmail.com"
            className="text-[#00D9FF] hover:underline"
          >
            reckziegel.william@gmail.com
          </a>
        </p>
        <p className="text-sm text-[#9CA3AF]">
          Or find me on{' '}
          <a
            href="https://www.linkedin.com/in/william-reckziegel/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D9FF] hover:underline"
          >
            LinkedIn
          </a>
          {' '}or{' '}
          <a
            href="https://x.com/liamreckziegel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D9FF] hover:underline"
          >
            Twitter
          </a>
        </p>
      </div>
    </section>
  );
}

