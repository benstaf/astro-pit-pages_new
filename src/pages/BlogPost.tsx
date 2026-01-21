import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getAllPosts();

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <article className="relative py-16 md:py-24">
          <div className="absolute inset-0 glow-bg opacity-10" />

          <div className="container relative mx-auto px-4">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-12 max-w-3xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="mb-6 text-3xl font-bold md:text-5xl">
                {post.title}
              </h1>

              <p className="mb-6 text-lg text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </motion.header>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-3xl"
            >
              <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-table:border prose-th:border prose-th:border-border prose-th:bg-secondary prose-th:p-3 prose-td:border prose-td:border-border prose-td:p-3 prose-li:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto mt-16 max-w-3xl border-t border-border pt-16"
              >
                <h2 className="mb-8 text-2xl font-bold">Related Posts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="glass-card rounded-xl p-6 transition-all hover:border-primary/50">
                        <div className="mb-3 flex items-center gap-2">
                          <Tag className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">
                          {relatedPost.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
