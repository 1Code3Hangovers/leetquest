import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export const DOMAINS = ['dsa', 'system-design', 'database', 'math'] as const;
export type Domain = typeof DOMAINS[number];

export function getPatterns(domain: string) {
  const dir = path.join(CONTENT_DIR, domain, "patterns");
  if(!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).map(file => file.replace('.md', ''));
}

export function getProblems(domain: string){
  const dir = path.join(CONTENT_DIR, domain, "problems");
  if(!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

export function getProblemsWithPattern(domain: string, pattern: string) {
  const problemsDir = path.join(CONTENT_DIR, domain, "problems");
  if(!fs.existsSync(problemsDir)) return [];
  const problems = fs.readdirSync(problemsDir);

  const matched: Array<{ slug: string; title: string; difficulty: string }> = [];
  problems.forEach(problem => {
    const metaPath = path.join(problemsDir, problem, "meta.json");
    if(fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      if(meta.patterns?.includes(pattern)) {
        matched.push({
          slug: problem,
          title: meta.title,
          difficulty: meta.difficulty,
        });
      }
    }
  })
  return matched;
}

export function getProblemData(domain: string, problemSlug: string) {
  const problemDir = path.join(CONTENT_DIR, domain, "problems", problemSlug);
  
  const metaPath = path.join(problemDir, "meta.json");
  const solutionPath = path.join(problemDir, "solution.md");
  
  if (!fs.existsSync(metaPath)) return null;
  
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  const solution = fs.existsSync(solutionPath) 
    ? fs.readFileSync(solutionPath, 'utf-8') 
    : '';
  
  return {
    ...meta,
    slug: problemSlug,
    content: solution
  };
}

export function getPatternProblemsTree(domain: string) {
  const patterns = getPatterns(domain);
  
  return patterns.map(pattern => ({
    pattern,
    problems: getProblemsWithPattern(domain, pattern)
  }));
}