export type Combo = {
  id: number;
  titulo: string;
  descripcion: string | null;
  precio: string;
  liston_texto: string | null;
  mostrar_liston: boolean;
  color_borde: string;
  telefono_vendedor: string | null;
  imagen_url: string | null;
  orden: number;
  created_at?: string;
};

export type Configuracion = {
  clave: string;
  valor: string | null;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      combos: {
        Row: Combo;
        Insert: Omit<Combo, 'id' | 'created_at'>;
        Update: Partial<Omit<Combo, 'id' | 'created_at'>>;
        Relationships: [];
      };
      configuracion: {
        Row: Configuracion;
        Insert: Omit<Configuracion, 'created_at'>;
        Update: Partial<Omit<Configuracion, 'created_at'>>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
