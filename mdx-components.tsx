import type { MDXComponents } from "mdx/types";

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  h1: ({ children }) => <h1 className="font-bold text-3xl">{children}</h1>,
  h2: ({ children }) => <h2 className="font-bold text-3xl">{children}</h2>,
  p: ({ children }) => <p className="text-default-400">{children}</p>,
  strong: ({ children }) => <span className="font-bold text-white">{children}</span>,
  ul: ({ children }) => <ul className="list-inside list-disc text-default-400">{children}</ul>,
  ...components,
});
