'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Combo } from '@/lib/database.types';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

type ComboForm = Omit<Combo, 'id' | 'created_at'>;

const emptyCombo: ComboForm = {
  titulo: '',
  descripcion: '',
  precio: '',
  liston_texto: '',
  mostrar_liston: false,
  color_borde: 'purple',
  telefono_vendedor: '',
  imagen_url: '',
  orden: 0,
};

const colorOptions = [
  { value: 'purple', label: 'Púrpura' },
  { value: 'blue', label: 'Azul' },
  { value: 'green', label: 'Verde' },
  { value: 'red', label: 'Rojo' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'pink', label: 'Rosa' },
];

export function CombosManager() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ComboForm>(emptyCombo);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    const { data } = await supabase
      .from('combos')
      .select('*')
      .order('orden', { ascending: true });
    if (data) setCombos(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    const { error } = await supabase.from('combos').insert(formData);
    if (!error) {
      await fetchCombos();
      setIsCreating(false);
      setFormData(emptyCombo);
    }
  };

  const handleUpdate = async (id: number) => {
    const { error } = await supabase
      .from('combos')
      .update(formData)
      .eq('id', id);
    if (!error) {
      await fetchCombos();
      setEditingId(null);
      setFormData(emptyCombo);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este combo?')) return;
    const { error } = await supabase.from('combos').delete().eq('id', id);
    if (!error) await fetchCombos();
  };

  const startEdit = (combo: Combo) => {
    setEditingId(combo.id);
    setFormData({
      titulo: combo.titulo,
      descripcion: combo.descripcion || '',
      precio: combo.precio,
      liston_texto: combo.liston_texto || '',
      mostrar_liston: combo.mostrar_liston,
      color_borde: combo.color_borde,
      telefono_vendedor: combo.telefono_vendedor || '',
      imagen_url: combo.imagen_url || '',
      orden: combo.orden,
    });
    setIsCreating(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData(emptyCombo);
  };

  if (loading) {
    return (
      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/4" />
          <div className="h-20 bg-gray-700 rounded" />
          <div className="h-20 bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white tracking-wide uppercase">
          Gestión de Combos
        </h2>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingId(null);
            setFormData(emptyCombo);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Nuevo Combo
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId !== null) && (
        <div className="bg-black/40 border border-purple-500/50 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {isCreating ? 'Crear Nuevo Combo' : 'Editar Combo'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Título *</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="COMBO NEON"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Precio *</label>
              <input
                type="text"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="€25"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Descripción</label>
              <textarea
                value={formData.descripcion || ''}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={2}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="2 Cocktails + 1 Gen. Entry"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Color Borde</label>
              <select
                value={formData.color_borde}
                onChange={(e) => setFormData({ ...formData, color_borde: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                {colorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Teléfono Vendedor</label>
              <input
                type="text"
                value={formData.telefono_vendedor || ''}
                onChange={(e) => setFormData({ ...formData, telefono_vendedor: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="5491122334455"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">URL de Imagen (Cloudinary)</label>
              <input
                type="url"
                value={formData.imagen_url || ''}
                onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="https://res.cloudinary.com/..."
              />
              {formData.imagen_url && (
                <div className="mt-2 text-xs text-gray-500">
                  Vista previa: <a href={formData.imagen_url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Ver imagen</a>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Texto Listón</label>
              <input
                type="text"
                value={formData.liston_texto || ''}
                onChange={(e) => setFormData({ ...formData, liston_texto: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="+ VENDIDO"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Orden</label>
              <input
                type="number"
                value={formData.orden}
                onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mostrar_liston"
                checked={formData.mostrar_liston}
                onChange={(e) => setFormData({ ...formData, mostrar_liston: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-black/40 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="mostrar_liston" className="text-sm text-gray-400">
                Mostrar Listón/Badge
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={isCreating ? handleCreate : () => editingId && handleUpdate(editingId)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
            >
              <Save className="w-4 h-4" />
              {isCreating ? 'Crear' : 'Guardar'}
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Combos List */}
      <div className="space-y-3">
        {combos.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No hay combos aún. ¡Crea el primero!
          </p>
        ) : (
          combos.map((combo) => (
            <div
              key={combo.id}
              className="flex items-center justify-between bg-black/30 border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full bg-${combo.color_borde}-500`}
                  style={{
                    backgroundColor:
                      combo.color_borde === 'purple' ? '#a855f7' :
                      combo.color_borde === 'blue' ? '#3b82f6' :
                      combo.color_borde === 'green' ? '#22c55e' :
                      combo.color_borde === 'red' ? '#ef4444' :
                      combo.color_borde === 'cyan' ? '#06b6d4' :
                      combo.color_borde === 'pink' ? '#ec4899' : '#a855f7',
                  }}
                />
                <div>
                  <p className="text-white font-semibold">{combo.titulo}</p>
                  <p className="text-gray-400 text-sm">
                    {combo.precio} • Orden: {combo.orden}
                    {combo.mostrar_liston && (
                      <span className="ml-2 text-green-400">({combo.liston_texto})</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(combo)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(combo.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
