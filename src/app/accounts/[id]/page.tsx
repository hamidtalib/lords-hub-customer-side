"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAccountById } from "@/store/thunks/accountsThunk";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { AccountDetailsGallery } from "@/src/components/accounts/AccountDetailsGallery";
import { AccountDetailsHeader } from "@/src/components/accounts/AccountDetailsHeader";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AccountDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch<AppDispatch>();
  
  const { selectedAccount: account, loading } = useSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAccountById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <p className="text-xl font-bold text-white mb-2">
              Loading account details...
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!account) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Account Not Found
            </h1>
            <p className="text-slate-400 mb-4">
              The account you're looking for doesn't exist in our database.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/accounts/restricted"
                className="text-amber-400 hover:text-amber-300 font-bold"
              >
                ← Restricted Accounts
              </Link>
              <Link
                href="/accounts/open"
                className="text-amber-400 hover:text-amber-300 font-bold"
              >
                Open Accounts →
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      {/* Breadcrumb */}
      <section className="px-3 sm:px-4 py-4 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/accounts/${account.type}`}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to {account.type === "restricted"
              ? "Restricted"
              : "Open"}{" "}
            Kingdom Accounts
          </Link>
        </div>
      </section>

      {/* Account Details */}
      <section className="px-3 sm:px-4 py-6 sm:py-8 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Image Gallery */}
            <div>
              <AccountDetailsGallery
                mainImage={account.images?.[0] || "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"}
                galleryImages={account.images || []}
                accountName={account.title}
              />
            </div>

            {/* Right: Account Details */}
            <div>
              <AccountDetailsHeader
                name={account.title}
                description={account.description}
                price={account.price}
                accountId={account.productId || account.id}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-800/90 rounded-xl p-5 sm:p-6 lg:p-8 border-2 border-blue-500/30">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              💡 How to Purchase
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">1.</span>
                <span>Click the "Buy This Account" button above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">2.</span>
                <span>You'll be connected with our support team via chat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Discuss payment and transfer details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">4.</span>
                <span>Receive your account credentials securely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">5.</span>
                <span>Start playing immediately!</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
