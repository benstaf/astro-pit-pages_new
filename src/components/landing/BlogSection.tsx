import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllPosts, getFeaturedPost, formatDate } from "@/lib/blog";

export const BlogSection = () => {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const regularPosts = allPosts.filter((post) => !post.featured).slice(0, 3);

  return (
    <section id="blog" className="relative py-24 md:py-32">
      <div className="absolute inset-0 glow-bg opacity-20" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <div>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
              Blog
            </span>
            <h2 className="text-3xl font-bold md:text-5xl">
              Latest <span className="gradient-text">Updates</span>
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Featured Post */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                  <h3 className="mb-4 text-2xl font-bold transition-colors group-hover:text-primary">
                    {featuredPost.title}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
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
                </div>
              </Link>
            </motion.article>
          )}

          {/* Regular Posts */}
          <div className="space-y-6">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <h4 className="mb-2 font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
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
      </div>
    </section>
  );
};
