import RestrictedAccountsPage from "@/src/components/accounts/restricted/page";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function RestrictedAccounts() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <RestrictedAccountsPage />
      <Footer />
    </main>
  );
}
