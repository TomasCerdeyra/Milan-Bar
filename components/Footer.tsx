import { getWhatsAppLink } from '@/lib/utils';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  const contactLink = getWhatsAppLink('543329684724', 'Hola, tengo una consulta');

  return (
    <footer className="w-full mt-auto py-4 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Footer Links - más compacto */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 underline underline-offset-4 transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="https://www.instagram.com/milan.vap3s/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 underline underline-offset-4 transition-colors"
          >
            Milan
          </Link>
          <Link
            href="https://www.instagram.com/maikadisco/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 underline underline-offset-4 transition-colors"
          >
            Maika
          </Link>
          <Link
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 underline underline-offset-4 transition-colors"
          >
            Contact Us
          </Link>

          {/* Decorative Element inline */}
          <Sparkles className="w-5 h-5 text-white/20 ml-4" />
        </div>
      </div>
    </footer>
  );
}
