interface HeaderProps {
  notificationText: string | null;
}

export function Header({ notificationText }: HeaderProps) {
  return (
    <header className="relative w-full py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase">
            MILAN BAR
          </h1>
          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mt-1">
            Experience the Night
          </p>
        </div>

        {/* Dynamic Notification Pill - Con borde degradé */}
        {notificationText && (
          <div 
            className="p-[2px] rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
            }}
          >
            <div className="bg-black/60 backdrop-blur-md rounded-lg px-8 py-3">
              <span className="text-white text-base md:text-lg font-semibold tracking-wide">
                {notificationText}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
