import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { getAllPosts, getFeaturedPost, formatDate } from "@/lib/blog";

const Blog = () => {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const regularPosts = allPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 glow-bg opacity-20" />

          <div className="container relative mx-auto px-4">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-primary">
                Blog
              </span>
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                Latest <span className="gradient-text">Updates</span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Research findings, tutorials, and product updates from the
                PiT-Inference team.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Featured Post */}
              {featuredPost && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <div className="glass-card cursor-pointer rounded-2xl p-8 transition-all hover:border-primary/50">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Featured
                        </span>
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="mb-4 text-2xl font-bold transition-colors group-hover:text-primary">
                        {featuredPost.title}
                      </h2>
                      <p className="mb-6 text-muted-foreground">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(featuredPost.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {featuredPost.readTime}
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-sm text-primary">
                          Read more
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* Regular Posts */}
              <div className="space-y-6">
                {regularPosts.slice(0, 3).map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="glass-card cursor-pointer rounded-xl p-6 transition-all hover:border-primary/50">
                        <div className="mb-3 flex items-center gap-2">
                          <Tag className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatDate(post.date)}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* All Posts Section */}
            {regularPosts.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-16"
              >
                <h2 className="mb-8 text-2xl font-bold">All Posts</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {regularPosts.slice(3).map((post, index) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="group"
                    >
                      <Link to={`/blog/${post.slug}`}>
                        <div className="glass-card cursor-pointer rounded-xl p-6 transition-all hover:border-primary/50">
                          <div className="mb-3 flex items-center gap-2">
                            <Tag className="h-3 w-3 text-primary" />
                            <span className="text-xs text-primary">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
