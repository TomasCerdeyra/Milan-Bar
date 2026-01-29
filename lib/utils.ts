/**
 * Generates a WhatsApp link with pre-filled message
 */
export function getWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Returns matching Tailwind classes for neon glow effect based on color
 */
export function getNeonBorderClasses(color: string): string {
  const colorMap: Record<string, string> = {
    purple: 'border-purple-500 shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]',
    blue: 'border-blue-500 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]',
    green: 'border-green-500 shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)]',
    red: 'border-red-500 shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)]',
    cyan: 'border-cyan-500 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]',
    pink: 'border-pink-500 shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)]',
  };
  return colorMap[color] || colorMap.purple;
}

/**
 * Returns matching button styles for neon glow effect based on color
 * Con fondo sutil que se ilumina al hacer hover
 */
export function getNeonButtonClasses(color: string): string {
  const colorMap: Record<string, string> = {
    purple: 'border-purple-500 text-white bg-purple-500/20 hover:bg-purple-500 shadow-[0_0_15px_-5px_rgba(168,85,247,0.6)] hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.9)]',
    blue: 'border-blue-500 text-white bg-blue-500/20 hover:bg-blue-500 shadow-[0_0_15px_-5px_rgba(59,130,246,0.6)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.9)]',
    green: 'border-green-500 text-white bg-green-500/20 hover:bg-green-500 shadow-[0_0_15px_-5px_rgba(34,197,94,0.6)] hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.9)]',
    red: 'border-red-500 text-white bg-red-500/20 hover:bg-red-500 shadow-[0_0_15px_-5px_rgba(239,68,68,0.6)] hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.9)]',
    cyan: 'border-cyan-500 text-white bg-cyan-500/20 hover:bg-cyan-500 shadow-[0_0_15px_-5px_rgba(6,182,212,0.6)] hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.9)]',
    pink: 'border-pink-500 text-white bg-pink-500/20 hover:bg-pink-500 shadow-[0_0_15px_-5px_rgba(236,72,153,0.6)] hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.9)]',
  };
  return colorMap[color] || colorMap.purple;
}
