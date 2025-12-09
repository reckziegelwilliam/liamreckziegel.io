import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { TweetComponent } from './tweet';
import { highlight } from 'sugar-high';
import React from 'react';
import { LiveCode } from './sandpack';

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Callout(props) {
  return (
    <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Alert({ type = 'info', children }) {
  const styles = {
    info: 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100',
    warning: 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100',
    success: 'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100',
    error: 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100'
  };
  
  return (
    <div className={`border-l-4 rounded-r-lg px-6 py-4 my-6 ${styles[type]}`}>
      {children}
    </div>
  );
}

function MetricsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-amber-500">
            {metric.value}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Comparison({ before, after, labels = { before: 'Before', after: 'After' } }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-6">
        <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-4">
          {labels.before}
        </div>
        <div className="prose dark:prose-invert max-w-none">{before}</div>
      </div>
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg p-6">
        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4">
          {labels.after}
        </div>
        <div className="prose dark:prose-invert max-w-none">{after}</div>
      </div>
    </div>
  );
}

function TimelineStep({ number, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-amber-500 flex items-center justify-center text-white font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100">{title}</h4>
        <div className="text-neutral-600 dark:text-neutral-400">{children}</div>
      </div>
    </div>
  );
}

function CodeDiff({ before, after, language = 'typescript' }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
      <div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Before
        </div>
        <pre className="bg-neutral-900 rounded-lg p-4 overflow-x-auto border border-neutral-800">
          <code className="text-sm text-neutral-100">{before}</code>
        </pre>
      </div>
      <div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          After
        </div>
        <pre className="bg-neutral-900 rounded-lg p-4 overflow-x-auto border border-neutral-800">
          <code className="text-sm text-neutral-100">{after}</code>
        </pre>
      </div>
    </div>
  );
}

function KeyTakeaways({ items }) {
  return (
    <div className="bg-gradient-to-br from-cyan-50 to-amber-50 dark:from-cyan-950/20 dark:to-amber-950/20 border-2 border-cyan-200 dark:border-cyan-900 rounded-2xl p-6 my-8">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
        <span className="text-2xl">💡</span>
        Key Takeaways
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-amber-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
              {idx + 1}
            </span>
            <span className="flex-1 text-neutral-700 dark:text-neutral-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImageGrid({ images }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8 not-prose">
      {images.map((img, idx) => (
        <figure key={idx} className="group">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          {img.caption && (
            <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function CodeBlock({ children, filename, language = 'typescript' }) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 not-prose">
      {filename && (
        <div className="bg-neutral-100 dark:bg-neutral-900 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 font-mono border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <span>{filename}</span>
          <button 
            className="text-xs hover:text-cyan-500 transition-colors"
            onClick={() => navigator.clipboard.writeText(children)}
          >
            Copy
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-neutral-50 dark:bg-neutral-900">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level) {
  return ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    );
  };
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  StaticTweet: TweetComponent,
  code: Code,
  Table,
  LiveCode,
  Alert,
  MetricsGrid,
  Comparison,
  TimelineStep,
  CodeDiff,
  KeyTakeaways,
  ImageGrid,
  CodeBlock,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
