# Project: Milan Bar Landing Page & Admin Panel
**Role:** Senior Next.js & UI/UX Engineer
**Stack:** Next.js (App Router), Tailwind CSS, Supabase (Database + Auth), Lucide React.
**Goal:** Create a high-performance, neon-style landing page for a nightclub bar ("Milan") with a dynamic admin panel.

## 1. Visual Identity & Design Specs
The design mimics a "Cyberpunk/Neon" aesthetic suitable for a nightclub.

### Background Implementation (CRITICAL)
* The design relies on a provided background image.
* **Code Requirement:** Assume the file is located at `/public/background.jpg` (or .webp).
* **Implementation:** Use the Next.js `<Image />` component with:
    * `src="/background.jpg"`
    * `alt="Milan Bar Background"`
    * `fill` (layout fill)
    * `objectFit="cover"`
    * `quality={100}`
    * `priority` (true)
    * **Styling:** It must be `fixed`, `inset-0`, and `z-[-1]` to stay behind all content while scrolling.

### Tailwind Styling Rules (Strict Adherence)
1.  **Glassmorphism:** Cards must use `bg-black/40` with `backdrop-blur-md` and `rounded-2xl`.
2.  **Neon Glow:** Use specific box-shadows matching the border color.
    * Example: `border-2 border-purple-500 shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]`.
3.  **Typography:** * Titles: Bold, Uppercase, Tracking-widest.
    * Prices: Big, White, Bold.

## 2. Core Features (Public View)

### A. Header
* **Logo/Title:** "MILAN BAR" - "EXPERIENCE THE NIGHT".
* **Dynamic Notification Box (Top Right):** A pill-shaped container displaying dynamic text fetched from DB (key: `texto_header_derecho`).

### B. Product Grid (The Combos)
* Display a list of cards fetched from the `combos` table in Supabase.
* **Card Anatomy:**
    * **Neon Border:** Color determined by the `color_borde` field (purple, blue, green, red).
    * **Ribbon/Badge:** IF `mostrar_liston` is TRUE, display a ribbon (e.g., "+ VENDIDO") positioned absolutely on the top-right.
    * **Content:** `titulo`, `descripcion`, and `precio` (displayed prominently).
    * **Action Button:** "PEDIR ESTE COMBO" (Pill shape, glowing border).
* **WhatsApp Logic:** Clicking the button opens WhatsApp:
    * Format: `https://wa.me/[telefono_vendedor]?text=Hola, quiero pedir el [titulo] de [precio]`

### C. Footer CTA
* A large, glowing button at the bottom.
* **Text:** Fetched from DB (key: `texto_boton_anticipada`).
* **Logic:** Opens WhatsApp with a specific message for ticket sales.

## 3. Backend & Admin Panel (/admin)

### A. Authentication
* Use **Supabase Auth** (`auth.users`).
* Session must persist for 30 days.

### B. Admin Dashboard
A protected interface to manage content without code.
1.  **Global Texts Manager:** Inputs for `texto_header_derecho` and `texto_boton_anticipada`.
2.  **Combos CRUD:**
    * Fields: `titulo`, `descripcion`, `precio`, `imagen_url` (Upload), `telefono_vendedor`, `color_borde` (Select), `liston_texto`, `mostrar_liston` (Toggle), `orden`.

## 4. Database Schema (Supabase SQL)

The database is already created. Match these **exact column names**:

**Table: `combos`**
* `id` (int8)
* `titulo` (text)
* `descripcion` (text)
* `precio` (text)
* `liston_texto` (text)
* `mostrar_liston` (boolean)
* `color_borde` (text)
* `telefono_vendedor` (text)
* `imagen_url` (text)
* `orden` (int)

**Table: `configuracion`**
* `clave` (text)
* `valor` (text)

## 5. Technical Requirements
1.  **Images:** Use `next/image` for everything.
2.  **Responsiveness:**
    * Mobile: Cards stacked (1 column).
    * Desktop: Cards in a row (4 columns).
3.  **Loading:** Use "Skeleton" loaders with neon pulses.