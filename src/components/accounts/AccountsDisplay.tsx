import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Shield, Globe } from "lucide-react";
import { Account } from "@/store/thunks/accountsThunk";

interface AccountsDisplayProps {
  restrictedAccounts: Account[];
  openAccounts: Account[];
}

export default function AccountsDisplay({
  restrictedAccounts,
  openAccounts,
}: AccountsDisplayProps) {
  const renderAccountCard = (account: Account) => (
    <div
      key={account.id}
      className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 overflow-hidden hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            account.images?.[0] ||
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
          }
          alt={account.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-black text-white mb-1">
            {account.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2">
            {account.description}
          </p>
        </div>
        <div className="pt-2 border-t border-slate-700">
          <p className="text-2xl font-black gradient-text text-center mb-3">
            ${account.price}
          </p>
          <div className="flex gap-2">
            <Link
              href={`/chat?source=accounts&productId=${account.productId || account.id}`}
              className="flex-1"
            >
              <Button size="sm" className="btn-game text-xs w-full">
                Chat
              </Button>
            </Link>
            <Link href={`/accounts/${account.id}`} className="flex-1">
              <Button size="sm" className="btn-game text-xs w-full">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-16">
      {/* Restricted Accounts Section */}
      <section className="fade-up">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-amber-400" />
          <h2 className="text-3xl font-black gradient-text">
            Restricted Accounts
          </h2>
        </div>

        {restrictedAccounts.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border-2 border-slate-700">
            <p className="text-xl font-bold text-white mb-2">
              No restricted accounts available
            </p>
            <p className="text-slate-400">Check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {restrictedAccounts.map(renderAccountCard)}
          </div>
        )}
      </section>

      {/* Open Accounts Section */}
      <section className="fade-up">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-8 w-8 text-blue-400" />
          <h2 className="text-3xl font-black gradient-text">Open Accounts</h2>
        </div>

        {openAccounts.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border-2 border-slate-700">
            <p className="text-xl font-bold text-white mb-2">
              No open accounts available
            </p>
            <p className="text-slate-400">Check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {openAccounts.map(renderAccountCard)}
          </div>
        )}
      </section>
    </div>
  );
}
