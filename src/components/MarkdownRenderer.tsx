/* eslint-disable @next/next/no-img-element,@typescript-eslint/no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
    content: string;
};

/** Links to our own site stay in the tab, everything else opens in a new one. */
function isExternal(href?: string) {
    if (!href || !/^https?:\/\//i.test(href)) return false;
    try {
        return !new URL(href).hostname.endsWith('adeptstack.net');
    } catch {
        return false;
    }
}

export default function MarkdownRenderer({ content }: Props) {
    return (
        <div className="text-slate-300">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,

                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,

                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2 marker:text-blue-500" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2 marker:text-blue-500" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,

                    a: ({node, href, ...props}) => (
                        <a
                            href={href}
                            className="text-blue-400 hover:text-blue-300 underline transition decoration-blue-500/30"
                            {...(isExternal(href) ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                            {...props}
                        />
                    ),
                    code: ({node, ...props}) => <code className="bg-slate-800 border border-white/10 text-blue-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-6 bg-slate-900/50 py-2 pr-4 rounded-r" {...props} />,
                    img: ({node, ...props}) => <img className="rounded-xl border border-white/10 shadow-lg my-8 w-full h-auto object-cover" {...props}  alt={"cover"}/>,

                    table: ({node, ...props}) => (
                        <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full text-sm text-left border-collapse" {...props} />
                        </div>
                    ),
                    thead: ({node, ...props}) => <thead className="bg-slate-800/60 text-white" {...props} />,
                    th: ({node, ...props}) => <th className="px-4 py-2.5 font-semibold border-b border-white/10 whitespace-nowrap" {...props} />,
                    td: ({node, ...props}) => <td className="px-4 py-2.5 border-b border-white/5 text-slate-300 align-top" {...props} />,
                    del: ({node, ...props}) => <del className="text-slate-500" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}