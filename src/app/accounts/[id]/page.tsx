import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { AccountDetailsGallery } from "@/src/components/accounts/AccountDetailsGallery";
import { AccountDetailsHeader } from "@/src/components/accounts/AccountDetailsHeader";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { getAccountById, accountsData } from "@/src/data/accountsData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return accountsData.map((account) => ({
    id: account.id,
  }));
}

export default function AccountDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const account = getAccountById(params.id);

  if (!account) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-4">Account Not Found</h1>
            <p className="text-slate-400 mb-6">
              The account you're looking for doesn't exist.
            </p>
            <Link
              href="/accounts/restricted"
              className="text-amber-400 hover:text-amber-300 font-bold"
            >
              ← Back to Accounts
            </Link>
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
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/accounts/${account.category}`}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {account.category === "restricted" ? "Restricted" : "Open"} Kingdom Accounts
          </Link>
        </div>
      </section>

      {/* Account Details */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div>
              <AccountDetailsGallery
                mainImage={account.mainImage}
                galleryImages={account.galleryImages}
                accountName={account.name}
              />
            </div>

            {/* Right: Account Details */}
            <div>
              <AccountDetailsHeader
                name={account.name}
                description={account.description}
                price={account.price}
                accountId={account.id}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-800/90 rounded-xl p-8 border-2 border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">
              💡 How to Purchase
            </h3>
            <ul className="space-y-2 text-slate-300">
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
