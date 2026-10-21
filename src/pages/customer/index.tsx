import { ReactNode } from "react";

import { CustomerResourceBoundary } from "@/components/boundaries/CustomerResourceBoundary";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { AccountAddress } from "@/features/customers/account/components/AccountAddress";
import { AccountProfile } from "@/features/customers/account/components/AccountProfile";
import { useAccount } from "@/features/customers/account/hooks/useAccount";

const AccountPage = () => {
  const { account, isLoading, error } = useAccount();

  return (
    <CustomerResourceBoundary isLoading={isLoading} error={error}>
      <AccountProfile account={account} />

      <hr className="border-t border-slate-300" />

      <AccountAddress account={account} />
    </CustomerResourceBoundary>
  );
};

export default AccountPage;

AccountPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="アカウント">{page}</CustomerLayout>
);
