import ReactMarkdown from 'react-markdown';

type Props = {
    content: string;
};

export default function MarkdownRenderer({ content }: Props) {
    return (
        <div className="text-slate-300">
            <ReactMarkdown
                components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,

                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,

                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2 marker:text-blue-500" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2 marker:text-blue-500" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,

                    a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline transition decoration-blue-500/30" {...props} />,
                    code: ({node, ...props}) => <code className="bg-slate-800 border border-white/10 text-blue-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-6 bg-slate-900/50 py-2 pr-4 rounded-r" {...props} />,
                    img: ({node, ...props}) => <img className="rounded-xl border border-white/10 shadow-lg my-8 w-full h-auto object-cover" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}