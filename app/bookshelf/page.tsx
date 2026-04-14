import type { Metadata } from "next";
import Link from "next/link";
import { books } from "@/lib/data";
import BookCard from "@/components/BookCard";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Browse the full Kingdom Kids book series — adventure storybooks rooted in Scripture.",
};

export default function BookshelfPage() {
  const available    = books.books.filter((b) => b.available);
  const comingSoon   = books.books.filter((b) => !b.available);

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <div className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0e2d14 0%, #1a5225 100%)" }}>
        {/* Leaf decoration */}
        <div className="absolute inset-0 flex items-center justify-between px-8 opacity-20 pointer-events-none select-none text-8xl">
          <span>🌿</span><span>🌿</span>
        </div>
        <h1 className="text-5xl font-black text-[#f5c842] relative z-10"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          📚 The Bookshelf
        </h1>
        <p className="text-[#fdf6e3]/80 mt-3 text-lg max-w-xl mx-auto relative z-10">
          Every Kingdom Kids book is a new chapter in the biggest story ever told — God&apos;s Word.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* ── Available Now ── */}
        <h2 className="text-2xl font-black text-[#f5c842] mb-6"
          style={{ fontFamily: "Georgia, serif" }}>
          Available Now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {available.map((book) => (
            <div key={book.id} className="panel-parchment overflow-hidden card-lift">
              {/* Cover */}
              <div className="flex justify-center py-8"
                style={{ background: `linear-gradient(135deg, ${book.coverColor}cc, ${book.coverColor}88)` }}>
                <BookCard
                  title={book.title}
                  series={book.series}
                  coverColor={book.coverColor}
                  tags={book.tags}
                  available={book.available}
                  compact={false}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-black text-xl text-[#3d2008]" style={{ fontFamily: "Georgia, serif" }}>
                      {book.title}
                    </h3>
                    <p className="text-[#8b5e3c] text-sm font-semibold">{book.series}</p>
                  </div>
                  <div className="text-right">
                    {book.price === 0 ? (
                      <span className="badge-jungle">Free</span>
                    ) : (
                      <span className="text-[#d94f2b] font-black text-xl">${book.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <span className="bg-[#f5c842]/20 text-[#8b5e3c] px-2 py-0.5 rounded text-xs font-semibold">Ages {book.ageRange}</span>
                  <span className="bg-[#f5c842]/20 text-[#8b5e3c] px-2 py-0.5 rounded text-xs font-semibold">{book.pages} pages</span>
                </div>

                <p className="text-[#5c3d1e] text-sm leading-relaxed mb-4">{book.description}</p>

                <div className="flex gap-2">
                  {book.shopLink && (
                    <Link href={book.shopLink} className="btn-cta !text-sm !px-5 !py-2">
                      {book.price === 0 ? "Download Free" : "Buy Now"}
                    </Link>
                  )}
                  {book.previewLink && (
                    <Link href={book.previewLink} className="btn-secondary !text-sm !px-4 !py-2" style={{ borderColor: "#8b5e3c", color: "#5c3d1e" }}>
                      Preview
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Coming Soon ── */}
        {comingSoon.length > 0 && (
          <>
            <h2 className="text-2xl font-black text-[#f5c842] mb-6"
              style={{ fontFamily: "Georgia, serif" }}>
              Coming Soon
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {comingSoon.map((book) => (
                <div key={book.id} className="panel-parchment overflow-hidden opacity-80">
                  <div className="flex justify-center py-8 relative"
                    style={{ background: `linear-gradient(135deg, ${book.coverColor}66, ${book.coverColor}44)` }}>
                    <div className="absolute inset-0 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-[#3d2008]/80 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                        Coming Soon
                      </span>
                    </div>
                    <BookCard
                      title={book.title}
                      series={book.series}
                      coverColor={book.coverColor}
                      tags={book.tags}
                      available={book.available}
                      compact={false}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-xl text-[#3d2008]" style={{ fontFamily: "Georgia, serif" }}>
                      {book.title}
                    </h3>
                    <p className="text-[#8b5e3c] text-sm font-semibold mb-2">{book.series}</p>
                    <p className="text-[#5c3d1e] text-sm">{book.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
