import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { Html } from "next/document";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  return (
    <Html lang="zh-Hans">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content="歡迎來到我的開發博客！這裡分享網頁開發、程式語言、框架和工具相關經驗和知識。" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="查爾斯文章坊" />
        <meta property="og:description" content="歡迎來到我的開發博客！這裡分享網頁開發、程式語言、框架和工具相關經驗和知識。" />
        <meta property="og:url" content="https://postsblogger.vercel.app" />
        <meta property="og:site_name" content="查爾斯文章坊" />
        <meta property="og:image" content="./cover.png" />
        <meta property="article:publisher" content="查爾斯" />

        <meta name="keywords" content="单元测试, CharlesSin个人博客, React, PHP 8, Python, Django, Tailwind, Bootstrap, JavaScript性能"></meta>

        <title>Dev Blog</title>

        <link rel="icon" type="image/x-icon" href="./favicon.ico"></link>
        <link rel="apple-touch-icon" sizes="96x96" href="./favicon96.ico"></link>
        <link rel="canonical" href="https://postsblogger.vercel.app" />
        <link rel="alternate" href="https://postsblogger.vercel.app" hrefLang="ZH-CN" />
        <link rel="pingback" href="https://postsblogger.vercel.app"></link>

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@查爾斯" />
        <meta name="twitter:creator" content="@查爾斯" />
        <meta name="twitter:description" content="歡迎來到我的開發博客！這裡分享網頁開發、程式語言、框架和工具相關經驗和知識。" />
        <meta name="twitter:image" content="./cover.png" />

        <meta name="google-site-verification" content="L3UxEUxOpbpZgzYHAyZGHNnP1xJcvT6IIkQjXssUU8U" />
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Html>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
