import type { MDXRemoteProps } from "next-mdx-remote/rsc"

type MDXComponents = MDXRemoteProps["components"]

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="article-section-title" {...props} />
  ),
  h3: (props) => (
    <h3 className="article-section-title article-section-title-small" {...props} />
  ),
  p: (props) => (
    <p {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="article-pullquote"
      {...props}
    />
  ),
  ul: (props) => (
    <ul {...props} />
  ),
  ol: (props) => (
    <ol {...props} />
  ),
  a: (props) => (
    <a {...props} />
  ),
  strong: (props) => <strong {...props} />,
  sup: (props) => <sup {...props} />,
  hr: () => <hr />,
}
