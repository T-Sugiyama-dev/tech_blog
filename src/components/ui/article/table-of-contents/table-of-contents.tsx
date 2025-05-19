"use client";

import { useEffect } from "react";
import tocbot from "tocbot";
import styles from "./table-of-contents.module.css";

export const TableOfContents = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc", // 目次を追加する class 名
      contentSelector: ".target-toc", // 目次を取得するコンテンツの class 名
      headingSelector: "h2, h3, h4", // 目次として取得する見出しタグ
      headingsOffset: 150, // 見出しのオフセット
      scrollSmoothOffset: -150, //スムーススクロールのオフセット
      hasInnerContainers: true,
    });

    // 不要となったtocbotインスタンスを削除
    return () => tocbot.destroy();
  }, []);

  return <nav className={`toc ${styles.toc}`} />;
};
