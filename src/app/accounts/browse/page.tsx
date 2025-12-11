"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllAccounts } from "@/store/thunks/accountsThunk";
import AccountsDisplay from "@/src/components/accounts/AccountsDisplay";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { ShoppingBag } from "lucide-react";

export default function BrowseAccountsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { allAccounts, loading } = useSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    // Always fetch fresh data on mount
    dispatch(fetchAllAccounts());
  }, [dispatch]);

  // Deduplicate accounts by ID to prevent duplicates
  const uniqueAccounts = allAccounts.reduce((acc, account) => {
    if (!acc.find((a) => a.id === account.id)) {
      acc.push(account);
    }
    return acc;
  }, [] as typeof allAccounts);

  const restrictedAccounts = uniqueAccounts.filter(
    (account) => account.type === "restricted"
  );
  const openAccounts = uniqueAccounts.filter(
    (account) => account.type === "open"
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,10,25,0.92), rgba(8,10,25,0.96)), url('https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center">
            Browse All Accounts
          </h1>
        </div>
        <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
          Explore our complete collection of Lords Mobile accounts
        </p>
      </section>

      {/* Accounts Display */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AccountsDisplay
            restrictedAccounts={restrictedAccounts}
            openAccounts={openAccounts}
            loading={loading && allAccounts.length === 0}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
