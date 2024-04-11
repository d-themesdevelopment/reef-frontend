interface MarkdownProps {
  value: string;
}

const Markdown = ({ value }: MarkdownProps) => {
  return value && <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

export default Markdown;
