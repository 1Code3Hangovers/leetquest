import Link from 'next/link';
import { DOMAINS, getPatternProblemsTree } from '@/lib/content-loader';
import Sidebar from '@/components/Sidebar';

export default async function DomainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const patternTree = getPatternProblemsTree(domain);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 text-white px-6 py-4 flex gap-6 items-center border-b border-gray-700">
        <Link href="/" className="font-bold text-xl">
          LeetQuest
        </Link>
        <div className="flex gap-4">
          {DOMAINS.map((d) => (
            <Link
              key={d}
              href={`/${d}`}
              className={`px-4 py-2 rounded transition-colors ${
                domain === d
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              {d.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar domain={domain} patternTree={patternTree} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
