import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogPost, BlogPost as BlogPostType } from '../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import { Search, Globe, ChevronDown, ChevronUp } from 'lucide-react';

export const BlogPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);
    const [isTocOpen, setIsTocOpen] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const data = await getBlogPost(postId);
                setPost(data);

                if (data?.content) {
                    const lines = data.content.split('\n');
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
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) return <div className="min-h-screen pt-20 text-center font-sans text-sm">Loading...</div>;
    if (!post) return <Navigate to="/blog" replace />;

    return (
        <div className="min-h-screen bg-[#f6f6f6] font-sans text-[#202122] text-[14px] leading-[1.6]">

            {/* Wikipedia-style Header/Nav Simulation */}
            <div className="bg-white h-12 border-b border-[#a7d7f9] flex items-center px-4 mb-6 shadow-sm">
                <div className="font-serif font-bold text-xl mr-8 flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/blog'}>
                    <Globe className="w-6 h-6 text-gray-600" />
                    <span>Wikipedia</span>
                </div>
                <div className="flex-1 max-w-xl hidden md:block">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Wikipedia"
                            className="w-full bg-[#f0f0f0] border border-[#a2a9b1] rounded px-3 py-1.5 focus:border-[#2962cc] focus:ring-1 focus:ring-[#2962cc] outline-none transition-all placeholder-gray-500"
                        />
                        <Search className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="ml-auto text-xs flex gap-4 text-[#0645ad]">
                    <span className="cursor-pointer hover:underline">Create account</span>
                    <span className="cursor-pointer hover:underline">Log in</span>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 lg:px-0 flex gap-6">

                {/* Left Sidebar (Classic Wiki Sidebar) - Visual Only */}
                <div className="hidden lg:block w-40 flex-shrink-0 pt-2 text-xs text-[#0645ad] space-y-4">
                    <div className="bg-gradient-to-br from-gray-100 to-transparent p-2 rounded text-center text-gray-900 font-serif font-bold text-lg mb-4 cursor-pointer" onClick={() => window.location.href = '/blog'}>
                        <Globe className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                        The Free Encyclopedia
                    </div>
                    <div>
                        <ul className="space-y-1.5 border-t border-gray-200 pt-2 text-gray-800">
                            <li className="hover:underline cursor-pointer"><Link to="/blog">Main page</Link></li>
                            <li className="hover:underline cursor-pointer">Contents</li>
                            <li className="hover:underline cursor-pointer">Current events</li>
                            <li className="hover:underline cursor-pointer">Random article</li>
                            <li className="hover:underline cursor-pointer">About Wikipedia</li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-gray-500 pb-1 border-b border-gray-200 mb-1 mt-4">Cotribute</div>
                        <ul className="space-y-1.5 text-gray-800">
                            <li className="hover:underline cursor-pointer">Help</li>
                            <li className="hover:underline cursor-pointer">Learn to edit</li>
                            <li className="hover:underline cursor-pointer">Community portal</li>
                            <li className="hover:underline cursor-pointer">Recent changes</li>
                            <li className="hover:underline cursor-pointer">Upload file</li>
                        </ul>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">

                    {/* Tabs */}
                    <div className="flex items-end border-b border-[#a7d7f9] mb-[-1px] text-xs md:text-sm">
                        <div className="flex">
                            <div className="px-4 py-2 bg-white border border-[#a7d7f9] border-b-white font-medium rounded-t-sm z-10">
                                Article
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-b from-[#f6f6f6] to-[#f6f6f6] border border-transparent border-b-[#a7d7f9] text-[#0645ad] hover:bg-white cursor-pointer rounded-t-sm">
                                Talk
                            </div>
                        </div>
                        <div className="ml-auto flex">
                            <div className="px-4 py-2 bg-white border border-[#a7d7f9] border-b-white font-medium rounded-t-sm z-10">
                                Read
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-b from-[#f6f6f6] to-[#f6f6f6] border border-transparent border-b-[#a7d7f9] text-[#0645ad] hover:bg-white cursor-pointer rounded-t-sm">
                                Edit
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-b from-[#f6f6f6] to-[#f6f6f6] border border-transparent border-b-[#a7d7f9] text-[#0645ad] hover:bg-white cursor-pointer rounded-t-sm">
                                View history
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="bg-white border border-[#a7d7f9] p-6 lg:p-8 min-h-[600px]">

                        {/* Title */}
                        <div className="border-b border-[#a2a9b1] mb-4 pb-1">
                            <div className="italic text-sm text-[#54595d] mb-1">
                                <Link to="/blog" className="hover:underline">KaizenStat</Link>
                            </div>
                            <h1 className="font-serif text-[1.8rem] leading-[1.3] text-black">
                                {post.title}
                            </h1>
                        </div>

                        <div className="text-sm text-[#54595d] mb-4">
                            From Wikipedia, the free encyclopedia
                        </div>

                        {/* Relative container for content + floating infobox */}
                        <div className="relative">

                            {/* Infobox - Floated Right */}
                            <div className="float-none md:float-right ml-0 md:ml-4 mb-4 w-full md:w-[300px] bg-[#f8f9fa] border border-[#a2a9b1] p-1 text-[88%] leading-[1.5]">
                                <div className="bg-[#b0c4de] text-center p-2 font-bold font-serif mb-1">
                                    {post.title}
                                </div>
                                <div className="mb-2 bg-white border border-[#a2a9b1]">
                                    <img src={post.image} alt={post.title} className="w-full h-auto block" />
                                </div>
                                <table className="w-full text-left border-collapse bg-[#f8f9fa] mt-1">
                                    <tbody>
                                        <tr>
                                            <th className="pr-2 py-1 align-top font-bold text-gray-900 w-1/3">Author</th>
                                            <td className="py-1">{post.author}</td>
                                        </tr>
                                        <tr>
                                            <th className="pr-2 py-1 align-top font-bold text-gray-900">Role</th>
                                            <td className="py-1">{post.authorRole}</td>
                                        </tr>
                                        <tr>
                                            <th className="pr-2 py-1 align-top font-bold text-gray-900">Date published</th>
                                            <td className="py-1">{new Date(post.date).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <th className="pr-2 py-1 align-top font-bold text-gray-900">Category</th>
                                            <td className="py-1">
                                                <span className="text-[#0645ad] hover:underline cursor-pointer">{post.category}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="pr-2 py-1 align-top font-bold text-gray-900">Read time</th>
                                            <td className="py-1">{post.readTime}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Intro Text is rendered as part of markdown, unfortunately we can't easily split it. 
                                Ideally, the first paragraph should be here. 
                                We will assume the Markdown starts with text. 
                            */}

                            {/* TOC Inline */}
                            <div className="inline-block bg-[#f8f9fa] border border-[#a2a9b1] p-3 my-4 min-w-[300px] max-w-full clear-left lg:clear-none">
                                <div className="text-center font-bold mb-2 flex items-center justify-center gap-2">
                                    Contents
                                    <button
                                        onClick={() => setIsTocOpen(!isTocOpen)}
                                        className="text-[xs] font-normal text-[#0645ad] hover:underline hover:bg-none bg-transparent border-none"
                                    >
                                        [{isTocOpen ? 'hide' : 'show'}]
                                    </button>
                                </div>
                                {isTocOpen && (
                                    <ul className="text-[13px]">
                                        {toc.map((item, index) => (
                                            <li key={index} style={{ marginLeft: `${(item.level - 2) * 1.5}em` }} className="mb-0.5">
                                                <span className="text-[#202122] mr-1 font-bold">{item.level > 2 ? `${Math.floor(index / 3) + 1}.${index % 3 + 1}` : index + 1}</span>
                                                <a href={`#${item.id}`} className="text-[#0645ad] hover:underline visited:text-[#0b0080]">
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Main Markdown Content */}
                            <div className="prose prose-sm max-w-none text-black
                                prose-headings:font-serif prose-headings:font-normal prose-headings:border-b prose-headings:border-[#a2a9b1] prose-headings:pb-1 prose-headings:mb-4 prose-headings:mt-6
                                prose-h1:text-[1.8em] prose-h2:text-[1.5em] prose-h3:text-[1.2em] prose-h4:text-[100%] prose-h4:font-bold
                                prose-p:my-2 prose-p:leading-[1.6]
                                prose-li:my-0.5
                                prose-a:text-[#0645ad] prose-a:no-underline hover:prose-a:underline
                                prose-img:border prose-img:border-[#a2a9b1] prose-img:bg-[#f8f9fa] prose-img:p-1
                            ">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ node, ...props }) => <h1 hidden {...props} />, // Hide H1 as we render it in the header
                                        h2: ({ node, ...props }) => {
                                            const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                                            return (
                                                <div className="flex items-baseline group mt-8 mb-4 border-b border-[#a2a9b1] pb-1">
                                                    <h2 id={id} className="font-serif text-[1.5em] font-normal m-0" {...props} />
                                                    <span className="ml-auto text-sm text-[#0645ad] invisible group-hover:visible cursor-pointer select-none font-sans">
                                                        [<span className="hover:underline">edit</span>]
                                                    </span>
                                                </div>
                                            );
                                        },
                                        h3: ({ node, ...props }) => {
                                            const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                                            return (
                                                <div className="flex items-baseline group mt-6 mb-3">
                                                    <h3 id={id} className="font-serif text-[1.2em] font-bold m-0" {...props} />
                                                    <span className="ml-4 text-sm text-[#0645ad] invisible group-hover:visible cursor-pointer select-none font-sans">
                                                        [<span className="hover:underline">edit</span>]
                                                    </span>
                                                </div>
                                            );
                                        }
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </div>

                            {/* Categories Box */}
                            <div className="mt-12 bg-[#f8f9fa] border border-[#a2a9b1] p-3 text-[13px] rounded-sm">
                                <div className="flex items-start gap-2">
                                    <span className="font-bold whitespace-nowrap">Categories:</span>
                                    <div className="flex flex-wrap gap-2 text-[#0645ad]">
                                        <span className="hover:underline cursor-pointer">{post.category}</span>
                                        <span className="text-[#202122] mx-1">|</span>
                                        <span className="hover:underline cursor-pointer">Technology</span>
                                        <span className="text-[#202122] mx-1">|</span>
                                        <span className="hover:underline cursor-pointer">Education</span>
                                        <span className="text-[#202122] mx-1">|</span>
                                        <span className="hover:underline cursor-pointer">Guides</span>
                                        <span className="text-[#202122] mx-1">|</span>
                                        <span className="hover:underline cursor-pointer">KaizenStat Articles</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-[#54595d] flex justify-between">
                                <span>This page was last edited on {new Date(post.date).toLocaleDateString()}, at 12:00 (UTC).</span>
                                <div className="space-x-4 text-[#0645ad]">
                                    <span className="hover:underline cursor-pointer">Privacy policy</span>
                                    <span className="hover:underline cursor-pointer">About Wikipedia</span>
                                    <span className="hover:underline cursor-pointer">Disclaimers</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
