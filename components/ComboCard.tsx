'use client';

import { Combo } from '@/lib/database.types';
import { getWhatsAppLink, getNeonBorderClasses, getNeonButtonClasses } from '@/lib/utils';

interface ComboCardProps {
  combo: Combo;
}

export function ComboCard({ combo }: ComboCardProps) {
  const borderClasses = getNeonBorderClasses(combo.color_borde);
  const buttonClasses = getNeonButtonClasses(combo.color_borde);

  const handleOrderClick = () => {
    if (!combo.telefono_vendedor) return;
    
    const message = `Hola, quiero pedir el ${combo.titulo} de ${combo.precio}`;
    const whatsappUrl = getWhatsAppLink(combo.telefono_vendedor, message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative flex flex-col h-full">
      {/* Ribbon/Badge */}
      {combo.mostrar_liston && combo.liston_texto && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-green-500 text-black font-bold text-xs px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.5)] transform rotate-0">
            {combo.liston_texto}
          </div>
        </div>
      )}

      {/* Card - Más estirada con min-height y más padding */}
      <div
        className={`
          flex flex-col h-full min-h-[280px]
          bg-black/65 backdrop-blur-md rounded-2xl
          border-2 ${borderClasses}
          px-6 py-8 transition-all duration-300
          hover:scale-[1.02] hover:shadow-lg
        `}
      >
        {/* Title */}
        <h3 className="text-white text-xl font-bold tracking-wider uppercase text-center mb-4">
          {combo.titulo}
        </h3>

        {/* Description - Ocupa el espacio disponible */}
        <div className="flex-grow flex items-start justify-center">
          {combo.descripcion && (
            <p className="text-gray-400 text-lg text-center line-clamp-4">
              {combo.descripcion}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="text-white text-4xl font-bold text-center my-6">
          {combo.precio}
        </div>

        {/* Order Button */}
        <button
          onClick={handleOrderClick}
          className={`
            w-full py-3 px-4 rounded-full
            border-2 ${buttonClasses}
            font-semibold text-sm uppercase tracking-wider
            transition-all duration-300
            hover:scale-105
          `}
        >
          Pedir por Whatsapp
        </button>
      </div>
    </div>
  );
}
