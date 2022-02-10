import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Seo from "../../components/Seo";

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

  return (
    <div>
      <Seo title={title}></Seo>
      <h4>{title}</h4>
      <h4>{id}</h4>
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
