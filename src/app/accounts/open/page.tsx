import OpenAccountsPage from "@/src/components/accounts/open/page";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function OpenAccounts() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <OpenAccountsPage />
      <Footer />
    </main>
  );
}
