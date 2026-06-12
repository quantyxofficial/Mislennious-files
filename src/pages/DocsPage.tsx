import React, { useState, useEffect } from 'react';
import { loadBlogPosts, getBlogPost, BlogPost as BlogPostType } from '../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Terminal, Code, Cpu, Calendar, Clock, ChevronRight, Hash } from 'lucide-react';
import { Navbar } from '../components/sections/Navbar';

export function DocsPage() {
  const [docsList, setDocsList] = useState<BlogPostType[]>([]);
  const [activeDocId, setActiveDocId] = useState<string>('docs-quickstart');
  const [activeDoc, setActiveDoc] = useState<BlogPostType | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  // Fetch all documentation items
  useEffect(() => {
    const fetchDocsList = async () => {
      try {
        const posts = await loadBlogPosts();
        const docs = posts.filter(post => post.category === 'Documentation');
        setDocsList(docs);
        if (docs.length > 0) {
          // Default to the first doc or one from URL if desired
          setActiveDocId(docs[0].id);
        }
      } catch (err) {
        console.error('Failed to load documentation list:', err);
      } finally {
        setLoadingList(false);
      }
    };
    fetchDocsList();
  }, []);

  // Fetch active document content
  useEffect(() => {
    const fetchDocContent = async () => {
      if (!activeDocId) return;
      setLoadingDoc(true);
      try {
        const doc = await getBlogPost(activeDocId);
        setActiveDoc(doc);

        if (doc?.content) {
          const lines = doc.content.split('\n');
          const headers: { id: string; text: string; level: number }[] = [];
          lines.forEach(line => {
            const match = line.match(/^(#{2,3})\s+(.+)$/);
            if (match) {
              const level = match[1].length;
              const text = match[2];
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              headers.push({ id, text, level });
            }
          });
          setToc(headers);
        }
      } catch (err) {
        console.error('Failed to load active document content:', err);
      } finally {
        setLoadingDoc(false);
      }
    };
    fetchDocContent();
  }, [activeDocId]);

  // Scroll spy for ToC
  useEffect(() => {
    const handleScroll = () => {
      const sections = toc.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const getDocIcon = (id: string) => {
    if (id.includes('quickstart')) return <Cpu className="w-4 h-4" />;
    if (id.includes('cli')) return <Terminal className="w-4 h-4" />;
    return <Code className="w-4 h-4" />;
  };

  if (loadingList) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-slate-100 pt-28 pb-24">
        {/* Background radial effects */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent z-0" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Navigation of Docs */}
          <aside className="lg:col-span-3 sticky top-28 self-start space-y-6">
            <div className="bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-md rounded-2xl p-6">
              <h3 className="font-serif font-bold text-white mb-4 flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-white/70" />
                Documentation
              </h3>
              
              <nav className="space-y-1.5">
                {docsList.map((doc) => {
                  const isActive = doc.id === activeDocId;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDocId(doc.id)}
                      className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border text-left ${
                        isActive
                          ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      {getDocIcon(doc.id)}
                      <span className="truncate flex-1">{doc.title.replace('Guide', '')}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'rotate-90 text-black' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Middle: Active Document Content */}
          <main className="lg:col-span-6 space-y-8 bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm min-h-[60vh]">
            <AnimatePresence mode="wait">
              {loadingDoc ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[40vh] flex items-center justify-center"
                >
                  <div className="w-6 h-6 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
                </motion.div>
              ) : activeDoc ? (
                <motion.article
                  key={activeDoc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Document Header */}
                  <div className="space-y-4 border-b border-white/5 pb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white">
                      {activeDoc.category}
                    </span>

                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {activeDoc.title}
                    </h1>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {activeDoc.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(activeDoc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{activeDoc.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Document Body */}
                  <div className="prose prose-stone prose-invert max-w-none
                    prose-headings:font-serif prose-headings:text-white prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/5
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-slate-400 prose-p:leading-[1.75] prose-p:mb-6 prose-p:text-sm
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                    prose-li:mb-2 prose-li:text-slate-400 prose-li:text-sm
                    prose-a:text-white prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:text-slate-300 transition-colors
                    prose-strong:text-white prose-strong:font-bold
                    prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/5 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono prose-pre:text-xs prose-pre:overflow-x-auto
                    prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:my-8
                    prose-blockquote:border-l-2 prose-blockquote:border-white/30 prose-blockquote:italic prose-blockquote:text-slate-300 prose-blockquote:bg-white/[0.02] prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8
                    prose-table:w-full prose-table:text-left prose-table:border-collapse prose-table:text-xs prose-th:border-b prose-th:border-white/10 prose-th:pb-2 prose-td:border-b prose-td:border-white/5 prose-td:py-3
                  ">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: ({ node, ...props }) => {
                          const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                          return <h2 id={id} className="scroll-mt-28" {...props} />;
                        },
                        h3: ({ node, ...props }) => {
                          const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                          return <h3 id={id} className="scroll-mt-28" {...props} />;
                        }
                      }}
                    >
                      {activeDoc.content}
                    </ReactMarkdown>
                  </div>
                </motion.article>
              ) : null}
            </AnimatePresence>
          </main>

          {/* Right Sidebar: Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start space-y-6">
            {toc.length > 0 && (
              <div className="bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-md rounded-2xl p-6">
                <h3 className="font-serif font-bold text-white mb-4 flex items-center gap-2 text-sm">
                  <Hash className="w-4 h-4 text-white/50" />
                  Table of Contents
                </h3>
                
                <nav className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <ul className="space-y-1">
                    {toc.map((item) => (
                      <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                        <a
                          href={`#${item.id}`}
                          className={`block py-1.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border-l-2 ${
                            activeSection === item.id
                              ? 'bg-white/10 text-white border-white translate-x-1'
                              : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </aside>

        </div>
        </div>
      </div>
    </>
  );
}
