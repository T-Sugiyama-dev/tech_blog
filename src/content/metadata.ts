import { TAGS } from "./tags";

export type Blog = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  fileName: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
};

export const posts: Omit<Blog, 'content'>[] = [
  {
    id: 1,
    title: "Add AI to Pandas",
    description: "PandasAI is an innovative tool that combines the power of AI with Pandas, a Python data analysis library. While maintaining the ease of use of traditional Pandas, it enables data manipulation through natural language, dramatically improving data analysis workflows.",
    tags: [TAGS.PANDAS, TAGS.PYTHON, TAGS.AI],
    slug: "pandas-ai",
    fileName: "pandas-ai.mdx",
    publishedAt: "2025-05-10",
  },
  {
    id: 2,
    title: "Develop an Agent with LangChain",
    description: "LangChain is a framework for building AI applications. It provides a set of tools and components for building AI applications.",
    tags: [TAGS.LANGCHAIN, TAGS.AI, TAGS.JAVASCRIPT, TAGS.PYTHON],
    slug: "langchain",
    fileName: "langchain.mdx",
    publishedAt: "2025-05-11",
  },
  {
    id: 3,
    title: "Develop Chat UI with Streamlit",
    description: "Streamlit is a framework for building AI applications. It provides a set of tools and components for building AI applications.",
    tags: [TAGS.PYTHON],
    slug: "streamlit",
    fileName: "streamlit.mdx",
    publishedAt: "2025-05-11",
  },
  {
    id: 4,
    title: "Nice slider with Swiper.js in Next.js",
    description: "Swiper.js is a powerful JavaScript library for implementing modern touch sliders. It enables easy creation of mobile-friendly, responsive sliders, carousels, tabs, and galleries.",
    tags: [TAGS.JAVASCRIPT, TAGS.NEXTJS],
    slug: "swiper-js-in-nextjs",
    fileName: "swiper-js-in-nextjs.mdx",
    publishedAt: "2025-05-11",
  },
  {
    id: 5,
    title: "Generating Invoice PDFs with React-PDF",
    description: "React-PDF is a library for generating PDFs in React applications. It provides a set of tools and components for generating PDFs.",
    tags: [TAGS.REACT, TAGS.TYPESCRIPT, TAGS.JAVASCRIPT],
    slug: "generating-invoice-pdfs-with-react-pdf",
    fileName: "react-pdf.mdx",
    publishedAt: "2025-05-12",
  },
  {
    id: 6,
    title: "How to Get Token Count with LangChain",
    description: "Explaining how to retrieve token counts when interacting with LLMs using LangChain.",
    tags: [TAGS.LANGCHAIN, TAGS.PYTHON, TAGS.AI],
    slug: "langchain-get-num-of-tokens",
    fileName: "langchain-get-num-of-tokens.mdx",
    publishedAt: "2025-05-13",
  },
  {
    id: 7,
    title: "Align Center Content with HTML and CSS",
    description: "A comprehensive guide to various methods of centering elements both horizontally and vertically using HTML and CSS.",
    tags: [TAGS.HTML, TAGS.CSS],
    slug: "align-center-content",
    fileName: "align-center-content.mdx",
    publishedAt: "2025-05-14",
  },
]