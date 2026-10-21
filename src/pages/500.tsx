import { ReactNode } from "react";

import { InternalServerView } from "@/components/errors/InternalServerView";
import { StoreLayout } from "@/components/layout/store/StoreLayout";

const InternalServerPage = () => {
  return <InternalServerView />;
};

InternalServerPage.getLayout = (page: ReactNode) => (
  <StoreLayout>{page}</StoreLayout>
);

export default InternalServerPage;
