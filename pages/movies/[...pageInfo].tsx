import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import axios from "axios";

interface DetailProps {
  params: string[];
}

export default function Detail({ params }: DetailProps) {
  // pageProps로 아무것도 받지 않고 useRouter hook을 사용할 때
  // const router = useRouter();
  // console.log(router);
  // const [title, id] = router.query.pageInfo || [];

  // getServerSideProps 사용하여 params 받아올 때
  const [title, id] = params;

  useEffect(() => {
    (async () => {
      const result = await axios.get(`/api/movies/${id}`);
      console.log(result.data);
    })();
  }, []);

  return (
    <div>
      <Seo title={title}></Seo>
      <h4>{title}</h4>
      <h4>{id}</h4>
      <h4>{}</h4>
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const pageInfo = context.params?.pageInfo;
  return {
    props: {
      params: pageInfo,
    },
  };
}
