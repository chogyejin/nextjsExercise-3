import Head from "next/head";

interface SeoProps {
  title: string;
}

export default function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title} | Next movies</title>
      {/* Meta description */}
      {/* 작성자 정보 */}
    </Head>
  );
}
