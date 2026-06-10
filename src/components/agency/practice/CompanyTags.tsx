import React from 'react';

interface CompanyTagsProps {
    tags: string[];
}

export const CompanyTags: React.FC<CompanyTagsProps> = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, idx) => (
                <span
                    key={idx}
                    className="inline-flex items-center px-2 py-1 bg-black/5 text-lux-text/70 text-[9px] font-medium uppercase tracking-wider rounded border border-black/5"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};
