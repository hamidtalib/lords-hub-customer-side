import Link from 'next/link'
import { Facebook, Instagram, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="border-t-2 border-purple-200/50 bg-gradient-to-b from-white to-blue-50/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-black gradient-text mb-2">LORDS HUB</h3>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed font-semibold">
              Your trusted marketplace for premium Lords Mobile accounts and services.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-slate-600 hover:text-purple-600 transition-all duration-300 hover:scale-125 transform">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-600 hover:text-purple-600 transition-all duration-300 hover:scale-125 transform">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-600 hover:text-purple-600 transition-all duration-300 hover:scale-125 transform">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Products</h4>
            <ul className="space-y-3 text-sm">
              {['Accounts', 'Gems', 'Diamonds', 'Bot Services'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-700 hover:text-purple-600 transition-all duration-300 hover:translate-x-1 transform inline-block font-semibold">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              {['About Us', 'FAQ', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-700 hover:text-purple-600 transition-all duration-300 hover:translate-x-1 transform inline-block font-semibold">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Subscribe</h4>
            <p className="text-sm text-slate-700 mb-4 font-semibold">Get updates on new accounts and deals.</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Email" 
                className="border-2 border-purple-200 focus:border-purple-500 bg-white text-sm font-semibold transition-all duration-300"
              />
              <Button size="sm" className="btn-secondary font-bold">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-purple-200 pt-8 text-center text-sm text-slate-600 font-semibold">
          <p>&copy; 2025 Lords Hub. All rights reserved. | Premium Gaming Marketplace</p>
        </div>
      </div>
    </footer>
  )
}
