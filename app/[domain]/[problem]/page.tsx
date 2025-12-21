import { getProblemData } from '@/lib/content-loader';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function ProblemPage({ params }: any) {
  const { domain, problem } = await params;
  const problemData = getProblemData(domain, problem);

  if (!problemData) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      {/* Problem Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{problemData.title}</h1>
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              problemData.difficulty === 'Easy'
                ? 'bg-green-100 text-green-800'
                : problemData.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {problemData.difficulty}
          </span>
        </div>

        {/* Tags */}
        {problemData.topics && (
          <div className="flex flex-wrap gap-2 mt-3">
            {problemData.topics.map((topic: string) => (
              <span
                key={topic}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Companies */}
        {problemData.companies && (
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">Companies:</span>{' '}
            {problemData.companies.join(', ')}
          </div>
        )}

        {/* LeetCode Link */}
        {problemData.leetcodeUrl && (
          <a
            href={problemData.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View on LeetCode →
          </a>
        )}
      </div>

      {/* Problem Content */}
      <div className="prose prose-lg max-w-none">
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
          {problemData.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
