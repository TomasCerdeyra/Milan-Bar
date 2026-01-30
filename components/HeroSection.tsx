'use client';

import Image from 'next/image';
import { getWhatsAppLink } from '@/lib/utils';

interface HeroSectionProps {
  buttonText: string | null;
  phone: string | null;
}

export function HeroSection({ buttonText, phone }: HeroSectionProps) {
  const handleScrollToCombos = () => {
    const combosSection = document.getElementById('combos-section');
    if (combosSection) {
      combosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    if (!phone) return;
    const message = 'Hola, quiero comprar una entrada anticipada';
    const whatsappUrl = getWhatsAppLink(phone, message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative flex-grow flex flex-col items-center justify-center px-4 pb-16 pt-5">
      {/* Logos Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-6 md:mb-16">
        {/* Logo 1 */}
        <div className="relative w-40 h-40 md:w-80 md:h-80">
          <Image
            src="/logo1.png"
            alt="Logo 1"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Plus Symbol with Neon Glow */}
        <span 
          className="text-5xl md:text-7xl font-bold"
          style={{
            color: '#ffffffff', // cyan-500
            textShadow: `
              0 0 5px #ffffffff,
              0 0 20px #06b6d4,
              0 0 80px #a855f7
            `,
          }}
        >
          +
        </span>

        {/* Logo 2 */}
        <div className="relative w-40 h-40 md:w-80 md:h-80">
          <Image
            src="/logo2.png"
            alt="Logo 2"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-none sm:w-auto px-4 sm:px-0">
        {/* Ver Combos Button */}
        <div 
          className="p-[2px] rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          style={{
            background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
          }}
        >
          <button
            onClick={handleScrollToCombos}
            className="
              w-full
              bg-black/60 backdrop-blur-md
              text-white font-bold text-lg uppercase tracking-widest
              px-10 py-4 rounded-full
              hover:bg-black/40
              transition-all duration-300
              text-center
              sm:min-w-[250px]
            "
          >
            Ver Combos
          </button>
        </div>

        {/* Pedi tu entrada anticipada Button */}
        {buttonText && (
          <div 
            className="p-[2px] rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            style={{
              background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
            }}
          >
            <button
              onClick={handleWhatsAppClick}
              className="
                w-full
                bg-black/60 backdrop-blur-md
                text-white font-bold text-lg uppercase tracking-widest
                px-10 py-4 rounded-full
                hover:bg-black/40
                transition-all duration-300
                text-center
                sm:min-w-[250px]
              "
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
