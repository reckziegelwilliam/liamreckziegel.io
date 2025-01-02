import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const template = `---
title: 'Hello, World!'
publishedAt: '2023-01-01'
summary: 'This is your first blog post.'
---

Hello, World!`;

const homePage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my portfolio</h1>
      <p className="prose prose-neutral dark:prose-invert">
        This is your new portfolio.
      </p>
    </section>
  );
}
`;

const workPage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <p className="prose prose-neutral dark:prose-invert">
        This is where your work experience goes.
      </p>
    </section>
  );
}
`;

const deleteFolderRecursive = async (path) => {
  try {
    const stat = await fs.stat(path);
    if (stat.isDirectory()) {
      const files = await fs.readdir(path);
      await Promise.all(
        files.map((file) => deleteFolderRecursive(`${path}/${file}`))
      );
      await fs.rmdir(path);
    } else {
      await fs.unlink(path);
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err; // Only throw if error is not "file not found"
  }
};

// Modify the main function to ensure directories exist before operating on them
(async () => {
  dotenv.config();

  if (process.env.IS_TEMPLATE === 'false') {
    return;
  }

  const contentDir = path.join(process.cwd(), 'content');
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const appDir = path.join(process.cwd(), 'app');
  const workDir = path.join(process.cwd(), 'app', 'work');

  // Ensure directories exist before trying to delete them
  const ensureDir = async (dir) => {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
  };

  // Ensure all directories exist first
  await ensureDir(contentDir);
  await ensureDir(imagesDir);
  await ensureDir(appDir);
  await ensureDir(workDir);

  // Now proceed with the deletion and recreation
  await deleteFolderRecursive(contentDir);
  await deleteFolderRecursive(imagesDir);
  await fs.mkdir(contentDir);
  await fs.writeFile(path.join(contentDir, 'hello-world.mdx'), template);
  await fs.writeFile(path.join(appDir, 'page.tsx'), homePage);
  await fs.writeFile(path.join(workDir, 'page.tsx'), workPage);
})();