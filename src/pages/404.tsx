import { ReactNode } from "react";

import { NotFoundView } from "@/components/errors/NotFoundView";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
const NotFoundPage = () => {
  return <NotFoundView />;
};

NotFoundPage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default NotFoundPage;
