import Timeline from '../components/work/timeline';
export default function Page() {
  return (
    <section className="flex flex-row justify-between max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <p className="prose prose-neutral dark:prose-invert">
        scroll down      
      </p>
      <Timeline />
    </section>
  );
}
