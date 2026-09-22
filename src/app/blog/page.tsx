import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog & Travel Guides",
  description:
    "Explore travel guides, business travel tips, and things to do in Kaduna State. Expert content from the team at Zuma Suites.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Insights & Guides"
          title="The Zuma Journal"
          subtitle="Travel guides, local insights, and everything you need to know about Kaduna and beyond."
        />
      </section>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-0 bg-[#111] border border-white/5 hover:border-[#C9A84C]/30 transition-colors overflow-hidden">
          <div className="relative h-72 lg:h-auto">
            <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
          </div>
          <div className="p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5 text-[#C9A84C] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                <Tag size={12} /> {featured.category}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5 text-white/30 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                <Clock size={12} /> {featured.readTime}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl text-white mb-4 group-hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
              {featured.title}
            </h2>
            <p className="text-white/50 leading-relaxed mb-6 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              {featured.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white/30 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{featured.date}</span>
              <span className="flex items-center gap-2 text-[#C9A84C] text-sm group-hover:gap-3 transition-all" style={{ fontFamily: "var(--font-inter)" }}>
                Read Article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Rest of posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#111] border border-white/5 hover:border-[#C9A84C]/30 transition-colors overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#C9A84C] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>{post.category}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/30 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{post.readTime}</span>
                </div>
                <h3 className="text-white text-lg mb-3 group-hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                  {post.title}
                </h3>
                <p className="text-white/40 text-sm line-clamp-3 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-white/20 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{post.date}</span>
                  <span className="text-[#C9A84C] text-sm flex items-center gap-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                    Read <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
