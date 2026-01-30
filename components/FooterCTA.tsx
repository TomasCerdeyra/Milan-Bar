'use client';

import { getWhatsAppLink } from '@/lib/utils';

interface FooterCTAProps {
  buttonText: string | null;
  phone: string | null;
}

export function FooterCTA({ buttonText, phone }: FooterCTAProps) {
  const handleClick = () => {
    if (!phone) return;
    
    const message = 'Hola, quiero comprar una entrada anticipada';
    const whatsappUrl = getWhatsAppLink(phone, message);
    window.open(whatsappUrl, '_blank');
  };

  if (!buttonText) return null;

  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto flex justify-center">
        <button
          onClick={handleClick}
          className="
            gradient-border
            bg-black/50 backdrop-blur-md
            text-white font-bold text-lg uppercase tracking-widest
            px-12 py-4 rounded-full
            shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)]
            hover:bg-white/10 hover:shadow-[0_0_35px_-5px_rgba(255,255,255,0.4)]
            transition-all duration-300
            hover:scale-105
          "
        >
          <span className="relative z-10">{buttonText}</span>
        </button>
      </div>
    </section>
  );
}
