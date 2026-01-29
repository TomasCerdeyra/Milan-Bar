'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Configuracion } from '@/lib/database.types';
import { Save } from 'lucide-react';

export function TextsManager() {
  const [configs, setConfigs] = useState<Configuracion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const configLabels: Record<string, string> = {
    texto_header_derecho: 'Texto Header (Notificación)',
    texto_boton_anticipada: 'Texto Botón Anticipada',
    telefono_anticipada: 'Teléfono Anticipada',
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    const { data } = await supabase.from('configuracion').select('*');
    if (data) setConfigs(data);
    setLoading(false);
  };

  const handleValueChange = (clave: string, valor: string) => {
    setConfigs((prev) =>
      prev.map((c) => (c.clave === clave ? { ...c, valor } : c))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);

    for (const config of configs) {
      await supabase
        .from('configuracion')
        .update({ valor: config.valor })
        .eq('clave', config.clave);
    }

    setSaving(false);
    setSuccessMessage('¡Configuración guardada!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3" />
          <div className="h-10 bg-gray-700 rounded" />
          <div className="h-10 bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <h2 className="text-xl font-bold text-white mb-6 tracking-wide uppercase">
        Textos Globales
      </h2>

      <div className="space-y-4">
        {configs.map((config) => (
          <div key={config.clave}>
            <label className="block text-sm text-gray-400 mb-2">
              {configLabels[config.clave] || config.clave}
            </label>
            <input
              type="text"
              value={config.valor || ''}
              onChange={(e) => handleValueChange(config.clave, e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando...' : 'Guardar'}
        </button>

        {successMessage && (
          <span className="text-green-400 text-sm">{successMessage}</span>
        )}
      </div>
    </div>
  );
}
