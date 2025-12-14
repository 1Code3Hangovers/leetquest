'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type Problem = {
  slug: string;
  title: string;
  difficulty: string;
};

type PatternNode = {
  pattern: string;
  problems: Problem[];
};

export default function Sidebar({
  domain,
  patternTree,
}: {
  domain: string;
  patternTree: PatternNode[];
}) {
  const pathname = usePathname();
  const [expandedPatterns, setExpandedPatterns] = useState<Set<string>>(
    new Set(patternTree.map(p => p.pattern))
  );

  const togglePattern = (pattern: string) => {
    setExpandedPatterns((prev) => {
      const next = new Set(prev);
      if (next.has(pattern)) {
        next.delete(pattern);
      } else {
        next.add(pattern);
      }
      return next;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Patterns
        </h2>

        <div className="space-y-2">
          {patternTree.map(({ pattern, problems }) => (
            <div key={pattern} className="border border-gray-200 rounded-lg">
              {/* Pattern Header */}
              <div className="flex items-center">
                <Link
                  href={`/${domain}/patterns/${pattern}`}
                  className="flex-1 px-4 py-3 font-medium text-gray-700 capitalize hover:text-blue-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {pattern.replace(/-/g, ' ')}
                </Link>
                <button
                  onClick={() => togglePattern(pattern)}
                  className="px-4 py-3 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-700 capitalize sr-only">
                    Toggle {pattern.replace(/-/g, ' ')}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {problems.length}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedPatterns.has(pattern) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Problems List */}
              {expandedPatterns.has(pattern) && problems.length > 0 && (
                <div className="border-t border-gray-200">
                  {problems.map((problem) => {
                    const isActive = pathname === `/${domain}/${problem.slug}`;
                    return (
                      <Link
                        key={problem.slug}
                        href={`/${domain}/${problem.slug}`}
                        className={`block px-4 py-2 hover:bg-blue-50 transition-colors border-l-4 ${
                          isActive
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm text-gray-700 flex-1">
                            {problem.title}
                          </span>
                          <span
                            className={`text-xs font-medium ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {expandedPatterns.has(pattern) && problems.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-200">
                  No problems yet
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
