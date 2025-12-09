import { Navbar } from '../components/nav';
import { Footer } from '../components/footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
      <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
        <Navbar />
        <div className="mt-6">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}

