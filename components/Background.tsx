import Image from 'next/image';

export function Background() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Image
        src="/background.png"
        alt="Milan Bar Background"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
