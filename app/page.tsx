import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { Background } from '@/components/Background';
import { HeroSection } from '@/components/HeroSection';
import { Header } from '@/components/Header';
import { ComboGrid } from '@/components/ComboGrid';
import { FooterCTA } from '@/components/FooterCTA';
import { Footer } from '@/components/Footer';
import { ComboGridSkeleton } from '@/components/Skeletons';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getConfig(clave: string): Promise<string | null> {
  const { data } = await supabase
    .from('configuracion')
    .select('valor')
    .eq('clave', clave)
    .single();
  
  return data?.valor ?? null;
}

async function getCombos() {
  const { data, error } = await supabase
    .from('combos')
    .select('*')
    .order('orden', { ascending: true });
  
  if (error) {
    console.error('Error fetching combos:', error);
    return [];
  }
  
  return data ?? [];
}

export default async function HomePage() {
  const [combos, textoHeader, textoBoton, telefonoAnticipada] = await Promise.all([
    getCombos(),
    getConfig('texto_header_derecho'),
    getConfig('texto_boton_anticipada'),
    getConfig('telefono_anticipada'),
  ]);

  return (
    <main className="relative min-h-screen flex flex-col">
      <Background />
      
      {/* Sección 1: Hero con Header */}
      <section className="min-h-screen flex flex-col">
        <Header notificationText={textoHeader} />
        <HeroSection buttonText={textoBoton} phone={telefonoAnticipada} />
      </section>

      {/* Sección 2: Combos */}
      <section id="combos-section" className="min-h-screen flex flex-col">
        <Suspense fallback={<ComboGridSkeleton />}>
          <ComboGrid combos={combos} />
        </Suspense>

        <FooterCTA buttonText={textoBoton} phone={telefonoAnticipada} />

        <Footer />
      </section>
    </main>
  );
}
