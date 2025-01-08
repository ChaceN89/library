import { useRouter } from 'next/router';

const redirectToPage = (url) => {
  const router = useRouter();
  router.push(url);
};

export default redirectToPage;