"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { MarketplaceProduct } from "@/store/types/products";
import { TableSkeleton } from "@/src/components/loaders";

type ColumnRenderer<T> = (item: T) => ReactNode;

export interface TableColumn<T extends { id: string }> {
  id: string;
  label: string;
  className?: string;
  render?: ColumnRenderer<T>;
  field?: keyof T;
}

interface MarketplaceTableProps<T extends { id: string }> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  emptyCta?: ReactNode;
  illustrationUrl?: string;
}

const defaultIllustration =
  "https://images.unsplash.com/photo-1527449992864-12194eb114c5?auto=format&fit=crop&w=900&q=80";

export function MarketplaceDataTable<T extends MarketplaceProduct>({
  data,
  columns,
  isLoading,
  emptyTitle = "Nothing to show yet",
  emptySubtitle = "Admin will add fresh listings shortly. Check again in a bit!",
  emptyCta,
  illustrationUrl = defaultIllustration,
}: MarketplaceTableProps<T>) {
  if (isLoading) {
    return <TableSkeleton rows={8} columns={columns.length} />;
  }

  if (!data.length) {
    return (
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-900/90 p-4 sm:p-6 lg:p-8 shadow-2xl">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black gradient-text mb-2">
              {emptyTitle}
            </h3>
            <p className="text-slate-200 font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
              {emptySubtitle}
            </p>
            {emptyCta}
          </div>
          <div className="relative h-40 sm:h-48 lg:h-56 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-amber-500/40">
            <Image
              src={illustrationUrl}
              alt="Empty state illustration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-amber-500/30 bg-slate-900/60 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-amber-500/20">
          <thead className="bg-gradient-to-r from-amber-500/20 to-blue-500/20">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 whitespace-nowrap ${
                    column.className ?? ""
                  } text-center`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-500/10">
            {data.map((item) => (
              <tr
                key={item.id}
                className="transition-colors duration-300 hover:bg-slate-800/60"
              >
                {columns.map((column) => (
                  <td
                    key={`${item.id}-${column.id}`}
                    className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-slate-200 ${
                      column.className ?? ""
                    }`}
                  >
                    {column.render
                      ? column.render(item)
                      : column.field
                      ? (item[column.field] as ReactNode)
                      : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
