import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { getProblemsWithPattern } from '@/lib/content-loader';
import Link from 'next/link';

export default async function PatternPage({ params }: any) {
  const { domain, pattern } = await params;
  const patternFile = path.join(
    process.cwd(),
    'content',
    domain,
    'patterns',
    `${pattern}.md`
  );

  if (!fs.existsSync(patternFile)) {
    notFound();
  }

  const content = fs.readFileSync(patternFile, 'utf-8');
  const problems = getProblemsWithPattern(domain, pattern);

  return (
    <div className="max-w-4xl">
      {/* Pattern Documentation */}
      <div className="prose prose-lg max-w-none mb-8">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              return inline ? (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              ) : (
                <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Related Problems */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Problems Using This Pattern</h2>
        <div className="space-y-2">
          {problems.map((problem) => (
            <Link
              key={problem.slug}
              href={`/${domain}/${problem.slug}`}
              className="block p-4 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{problem.title}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    problem.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : problem.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
