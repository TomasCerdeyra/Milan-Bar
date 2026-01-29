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
        {/* Wrapper con gradiente de borde */}
        <div 
          className="p-[2px] rounded-full transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
          }}
        >
          <button
            onClick={handleClick}
            className="
              bg-black/60 backdrop-blur-md
              text-white font-bold text-lg uppercase tracking-widest
              px-12 py-4 rounded-full
              hover:bg-black/40
              transition-all duration-300
            "
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
