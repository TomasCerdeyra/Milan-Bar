'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Background } from '@/components/Background';
import { TextsManager } from '@/components/admin/TextsManager';
import { CombosManager } from '@/components/admin/CombosManager';
import { LogOut, Home } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }
      
      setUserEmail(session.user.email || null);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <Background />
        <div className="text-white text-xl">Cargando...</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pb-12">
      <Background />

      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
              Admin Panel
            </h1>
            <p className="text-gray-400 text-sm">{userEmail}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <Home className="w-4 h-4" />
              Ver Sitio
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <TextsManager />
        <CombosManager />
      </div>
    </main>
  );
}
