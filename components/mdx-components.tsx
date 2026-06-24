import type { MDXRemoteProps } from "next-mdx-remote/rsc"

type MDXComponents = MDXRemoteProps["components"]

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="font-serif text-3xl md:text-4xl mt-12 mb-4 text-foreground" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-serif text-2xl mt-8 mb-3 text-foreground" {...props} />
  ),
  p: (props) => (
    <p className="text-lg leading-relaxed mb-6 text-foreground/90" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-2 border-primary pl-6 font-serif text-2xl italic text-foreground/80"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-foreground/90" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-foreground/90" {...props} />
  ),
  a: (props) => (
    <a className="text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  hr: () => <hr className="my-12 border-border" />,
}
