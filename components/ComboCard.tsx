'use client';

import Image from 'next/image';
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

      {/* Card */}
      <div
        className={`
          flex flex-col h-full
          bg-black/65 backdrop-blur-md rounded-2xl
          border-2 ${borderClasses}
          overflow-hidden transition-all duration-300
          hover:scale-[1.02] hover:shadow-lg
        `}
      >
        {/* Imagen del combo */}
        {combo.imagen_url && (
          <div className="relative w-full h-60 min-[420px]:h-75 min-[640px]:h-50 flex-shrink-0">
            <Image
              src={combo.imagen_url}
              alt={combo.titulo}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-grow px-6 pb-6">
          {/* Title */}
          <h3 className="text-white text-xl font-bold tracking-wider uppercase text-center mb-3">
            {combo.titulo}
          </h3>

          {/* Description - Ocupa el espacio disponible */}
          <div className="flex-grow flex items-start justify-center">
            {combo.descripcion && (
              <p className="text-gray-400 text-sm text-center line-clamp-3">
                {combo.descripcion}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="text-white text-4xl font-bold text-center my-4">
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
    </div>
  );
}

