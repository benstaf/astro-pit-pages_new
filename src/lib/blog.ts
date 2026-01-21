// Blog post type definition
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  author: string;
  content: string;
}

// Import all markdown files from content/blog
const blogModules = import.meta.glob('/src/content/blog/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

// Simple frontmatter parser (avoiding gray-matter browser issues)
function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }

  const frontmatterStr = match[1];
  const bodyContent = match[2];
  
  const data: Record<string, any> = {};
  const lines = frontmatterStr.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Parse booleans
    if (value === 'true') {
      data[key] = true;
    } else if (value === 'false') {
      data[key] = false;
    } else {
      data[key] = value;
    }
  }
  
  return { data, content: bodyContent };
}

// Parse all blog posts
export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, rawContent] of Object.entries(blogModules)) {
    const slug = path.replace('/src/content/blog/', '').replace('.md', '');
    const { data, content } = parseFrontmatter(rawContent as string);

    posts.push({
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      date: data.date || '',
      readTime: data.readTime || '',
      featured: data.featured || false,
      author: data.author || '',
      content,
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

// Get featured post
export function getFeaturedPost(): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.featured);
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
