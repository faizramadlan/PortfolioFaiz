# SemuaBisa — Project Documentation

> Dokumentasi lengkap project SemuaBisa.
> **Terakhir diupdate: 26 Feb 2026**

---

## 1. Ringkasan Project

**SemuaBisa** adalah layanan **website berlangganan tahunan** untuk UMKM Indonesia.

- **Model bisnis:** Client bayar langganan → founder setup website → client edit konten sendiri via CMS
- **Target user:** UMKM Indonesia (non-teknis)
- **Domain:** [semuabisajadi.online](https://semuabisajadi.online)
- **Bahasa UI:** Bahasa Indonesia

### Prinsip Utama
- Layout **terkunci** (tidak bisa diubah client)
- Konten **bisa diedit** (teks, gambar, warna, logo, font)
- **Simpel** — tanpa page builder, tanpa markdown editor

---

## 2. Tech Stack

| Layer | Tool | Versi |
|---|---|---|
| Framework | Next.js App Router | 14.2.x |
| Styling | Tailwind CSS | 3.4.x |
| Database + Auth | Supabase | @supabase/ssr ^0.4.0 |
| Storage | Supabase Storage (`website-assets`) | — |
| Deploy | Vercel (sudah live) | — |
| Domain | semuabisajadi.online | — |
| Language | TypeScript | ^5 |

---

## 3. Arsitektur Sistem

### Data Flow
```
Client Browser → Next.js (Vercel) → Supabase (DB + Auth + Storage)
                                  ↕
                            middleware.ts (routing)
```

### Request Routing (middleware.ts)
```
semuabisajadi.online                → Landing Page (src/app/page.tsx)
dashboard.semuabisajadi.online      → CMS Dashboard (src/app/dashboard/)
admin.semuabisajadi.online          → Admin Panel (src/app/admin/)
custom-domain.com                   → Public Website (src/app/website/[domain]/)
semuabisajadi.online/demo/[slug]    → Template Demo (src/app/demo/[slug]/)
semuabisajadi.online/preview/[id]   → Website Preview (src/app/preview/[id]/)
```

Direct path access (`/dashboard`, `/admin`) juga tetap jalan di main domain.

---

## 4. Database Schema

### Tabel `user_profiles`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | → auth.users |
| `role` | text | 'superadmin' \| 'admin' \| 'client' |
| `created_at` | timestamptz | — |

### Tabel `websites`
| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | uuid PK | — | — |
| `user_id` | uuid | — | → auth.users |
| `name` | text | — | Nama bisnis |
| `template_key` | text | 'default' | Slug template |
| `domain` | text unique | — | Domain publik |
| `brand_primary_color` | text | '#1A6B5A' | Warna utama |
| `brand_secondary_color` | text | '#F4A026' | Warna sekunder |
| `brand_font` | text | 'cormorant-dm' | Font pair ID |
| `brand_palette_id` | text | 'arctic' | Palette combo ID |
| `brand_colors` | jsonb | — | Custom color overrides |
| `logo_url` | text | — | URL logo |
| `subscription_status` | text | 'testing' | testing\|active\|grace\|expired |
| `subscription_ends_at` | timestamptz | — | Tanggal berakhir |
| `created_at` | timestamptz | — | — |
| `updated_at` | timestamptz | — | — |

### Tabel `contents`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | — |
| `website_id` | uuid | → websites |
| `section_key` | text | hero, services, about, dll |
| `title` | text | LEGACY — hanya template 'default' lama |
| `subtitle` | text | LEGACY |
| `description` | text | LEGACY |
| `image_url` | text | LEGACY |
| `extra` | jsonb | **Semua template baru simpan di sini** |
| `updated_at` | timestamptz | — |

> **Constraint:** UNIQUE(website_id, section_key)

---

## 5. Role System

| Role | Dashboard | Admin Panel | Manage Users | Manage Admins |
|---|---|---|---|---|
| `client` | ✅ (website sendiri) | ❌ | ❌ | ❌ |
| `admin` | ✅ | ✅ (assigned) | ✅ (assigned) | ❌ |
| `superadmin` | ✅ | ✅ (semua) | ✅ (semua) | ✅ |

Role disimpan di tabel `user_profiles`, di-check via `lib/role.ts`:
- `getCurrentRole()` — role user yang sedang login
- `getRoleById(userId)` — role user tertentu
- `isAdminOrAbove(role)` — cek admin atau superadmin
- `isSuperAdmin(role)` — cek superadmin

---

## 6. Subscription Status

| Status | Website publik? | CMS edit? | Notes |
|---|---|---|---|
| `testing` | ✅ | ✅ | Default saat baru dibuat |
| `active` | ✅ | ✅ | Langganan aktif |
| `grace` | ✅ | ❌ (banner + lock) | Masa tenggang |
| `expired` | ❌ | ❌ | Langganan habis |

Billing **manual** — admin set status via admin panel.

---

## 7. Template System

### Arsitektur
```
schema.ts      → CMS baca ini, generate form fields otomatis
defaultContent → konten default saat website baru dibuat
index.tsx      → React component, terima { content, branding } props
registry.ts    → daftar semua template (untuk landing page gallery + admin)
```

### 15 Template Aktif

| Slug | Nama | Kategori | Personality |
|---|---|---|---|
| `umum-nusantara` | Nusantara | umum | Editorial, hangat, profesional |
| `umum-betawi` | Betawi | umum | Editorial, hangat, profesional |
| `fnb-pandan` | Pandan | fnb | Bold, appetizing |
| `fnb-senja` | Senja | fnb | Bold, appetizing |
| `jasa-lakara` | Lakara | jasa | Premium, clean |
| `jasa-prakarsa` | Prakarsa | jasa | Premium, clean |
| `jasa-wahana` | Wahana | jasa | Premium, clean |
| `toko-adi` | Adi | toko | Commercial, energetic |
| `toko-pasar` | Pasar | toko | Commercial, energetic |
| `tourism-kelana` | Kelana | tourism | Dramatic, adventure |
| `tourism-puri` | Puri | tourism | Dramatic, adventure |
| `personal-layang` | Layang | personal | Conversational |
| `personal-citra` | Citra | personal | Conversational |
| `org-gema` | Gema | organisasi | Structured, mission-first |
| `org-pelita` | Pelita | organisasi | Structured, mission-first |

Semua template punya: `schema.ts` ✅ | `defaultContent.ts` ✅ | `index.tsx` ✅

### Template Props
```typescript
interface Props {
  content: { sections: Record<string, Record<string, string>> }
  branding: {
    primaryColor: string
    palette?: ColorPalette    // dari lib/palettes.ts
    logoUrl?: string | null
    fontPreset: string        // ID dari lib/fonts.ts
    businessName: string
  }
}
```

### Design System

**8 Color Palettes** (`lib/palettes.ts`):
| ID | Nama | Deskripsi |
|---|---|---|
| `obsidian` | Obsidian | Hitam + emas |
| `arctic` | Arctic | Putih + biru (default) |
| `hutan` | Hutan | Hijau + krem |
| `lava` | Lava | Merah + charcoal |
| `pasir` | Pasir | Krem + cokelat |
| `midnight` | Midnight | Navy + lavender |
| `chalk` | Chalk | Abu + hitam bersih |
| `koral` | Koral | Salmon + teal |

Setiap palette punya 10 tokens: `bg`, `surface`, `surfaceAlt`, `text`, `textMuted`, `accent`, `accentFg`, `accentHover`, `border`, `borderStrong`

**8 Font Pairs** (`lib/fonts.ts`):
| ID | Nama | Style |
|---|---|---|
| `cormorant-dm` | Cormorant + DM Sans | Elegan & Profesional |
| `plus-jakarta` | Plus Jakarta Sans | Modern & Bersih |
| `fraunces-inter` | Fraunces + Inter | Hangat & Ramah |
| `syne-manrope` | Syne + Manrope | Berani & Kontemporer |
| `playfair-lato` | Playfair + Lato | Klasik & Terpercaya |
| `outfit` | Outfit | Simpel & Minimalis |
| `raleway-nunito` | Raleway + Nunito | Friendly & Youthful |
| `space-grotesk-dm` | Space Grotesk + DM Sans | Teknologi & Inovatif |

---

## 8. API Routes

Semua di `src/app/api/admin/`:

| Route | Method | Purpose |
|---|---|---|
| `assignments/` | GET/POST | Website-admin assignment management |
| `change-password/` | POST | Password change |
| `create-admin/` | POST | Create admin user |
| `create-user/` | POST | Create client user |
| `create-website/` | POST | Provision website + auto-seed defaultContent |
| `customer-assignments/` | GET/POST | Customer-to-website mapping |
| `delete-user/` | DELETE | Delete user |
| `delete-website/` | DELETE | Delete website |
| `list-admins/` | GET | List admin accounts |
| `list-users/` | GET | List client accounts |
| `me/` | GET | Current user info |
| `needs-actions-count/` | GET | Dashboard notification count |
| `template-settings/` | GET/POST | Per-template config |
| `update-profile/` | POST | Profile editing |
| `update-user/` | POST | User editing |
| `update-website-settings/` | POST | Website config editing |
| `upload-avatar/` | POST | Avatar upload |
| `user-detail/` | GET | User detail lookup |

---

## 9. Project Structure

```
sme-cms/
├── middleware.ts               ← subdomain routing + auth guard
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
│
├── src/
│   ├── app/
│   │   ├── page.tsx                        ← landing page
│   │   ├── layout.tsx                      ← root layout, fonts, metadata
│   │   ├── globals.css
│   │   ├── icon.svg                        ← favicon
│   │   ├── login/page.tsx                  ← login page
│   │   ├── auth/
│   │   │   ├── callback/                   ← auth callback handler
│   │   │   └── reset-password/             ← password reset
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                  ← auth guard + sidebar
│   │   │   ├── page.tsx                    ← website list
│   │   │   ├── profile/                    ← client profile
│   │   │   └── [websiteId]/
│   │   │       ├── page.tsx                ← section list
│   │   │       ├── brand/page.tsx          ← brand editor
│   │   │       └── content/[section]/      ← content editor
│   │   ├── demo/[slug]/
│   │   │   ├── page.tsx                    ← demo preview
│   │   │   ├── DemoClient.tsx              ← sidebar editor
│   │   │   └── DemoLinkBlocker.tsx         ← link prevention
│   │   ├── preview/[id]/                   ← website preview
│   │   ├── admin/
│   │   │   ├── layout.tsx                  ← role guard
│   │   │   ├── page.tsx                    ← dashboard overview
│   │   │   ├── adminSidebar.tsx            ← admin sidebar
│   │   │   ├── users/                      ← user management
│   │   │   ├── websites/                   ← website management
│   │   │   ├── admins/                     ← admin management
│   │   │   ├── assignments/                ← assignment management
│   │   │   ├── needs-actions/              ← action items
│   │   │   ├── profile/                    ← admin profile
│   │   │   └── templates/                  ← template management
│   │   ├── api/admin/                      ← 18 API routes
│   │   └── website/[domain]/               ← public website render
│   │
│   ├── components/
│   │   ├── SemuaBisaLogo.tsx               ← SVG logo
│   │   ├── dashboard/
│   │   │   ├── BrandForm.tsx               ← brand editor form
│   │   │   ├── ContentForm.tsx             ← dynamic content editor
│   │   │   ├── Sidebar.tsx                 ← dashboard sidebar
│   │   │   ├── Breadcrumb.tsx              ← navigation breadcrumb
│   │   │   └── CopyLinkButton.tsx          ← copy URL button
│   │   ├── landing/
│   │   │   ├── Navbar.tsx                  ← landing navbar
│   │   │   ├── HeroSection.tsx             ← hero with cursor glow
│   │   │   ├── ProblemSolution.tsx          ← problem/solution cards
│   │   │   ├── Sections.tsx                ← pricing, CTA, footer
│   │   │   ├── TemplateGallery.tsx         ← gallery server component
│   │   │   └── TemplateGalleryClient.tsx   ← gallery client interactions
│   │   ├── ui/
│   │   │   ├── Avatar.tsx                  ← user avatar
│   │   │   └── ConfirmModal.tsx            ← confirmation dialog
│   │   └── website/                        ← legacy default template
│   │
│   ├── lib/
│   │   ├── config.ts                       ← site config
│   │   ├── defaults.ts                     ← legacy default content
│   │   ├── fonts.ts                        ← 8 font pairs
│   │   ├── palettes.ts                     ← 8 color palettes
│   │   ├── role.ts                         ← role helpers
│   │   ├── types.ts                        ← TypeScript interfaces
│   │   └── supabase/
│   │       ├── client.ts                   ← browser client
│   │       ├── server.ts                   ← server client
│   │       └── admin.ts                    ← service role client
│   │
│   └── templates/
│       ├── registry.ts                     ← template registry
│       └── [15 template folders]/
│           ├── schema.ts                   ← field definitions
│           ├── defaultContent.ts           ← realistic defaults
│           └── index.tsx                   ← React component
│
├── supabase/                               ← Supabase config
├── make-admin.mjs                          ← CLI: make user admin
└── purge-and-seed.mjs                      ← CLI: reset + seed data
```

---

## 10. Environment Variables

| Variable | Scope | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Jangan prefix NEXT_PUBLIC_ |
| `NEXT_PUBLIC_SITE_DOMAIN` | Public | `semuabisajadi.online` |
| `NEXT_PUBLIC_SITE_URL` | Public | `https://semuabisajadi.online` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public | `628xxxxxxxxxx` |

---

## 11. Auth Flow

```
Login Page ──signInWithPassword──→ Supabase Auth
                                       │
                                  ┌─────┴─────┐
                                  │ Check role │
                                  └─────┬─────┘
                                        │
                   ┌────────────────────┼────────────────────┐
                   │                    │                    │
              superadmin             admin               client
                   │                    │                    │
              /admin              /admin (limited)      /dashboard
           (full access)          (assigned only)    (own websites)
```

User **tidak bisa daftar sendiri**. Akun dibuat oleh admin melalui:
- Admin panel → `/admin/users/new`
- Supabase Dashboard → Authentication → Users → Invite

---

## 12. Image Upload

Storage bucket: `website-assets` (Supabase Storage)

Path convention:
```
logos/[websiteId].[ext]                      ← logo upload
images/[websiteId]/[section]-[field].[ext]   ← content image
```

Limits: logo 2MB, content images 3MB.

---

## 13. How to Onboard a New Client

### Via Admin Panel (recommended)
1. Login ke admin panel (`admin.semuabisajadi.online`)
2. Buat user baru → `/admin/users/new`
3. Buat website → pilih template, set domain
4. Default content otomatis ter-seed
5. Kirim credentials ke client

### Via SQL (manual)
```sql
-- 1. Buat user via Supabase Dashboard

-- 2. Buat entry user_profiles
INSERT INTO user_profiles (id, role) VALUES ('[user-id]', 'client');

-- 3. Buat website
INSERT INTO websites (user_id, name, template_key, subscription_status)
VALUES ('[user-id]', 'Nama Bisnis', 'umum-nusantara', 'testing');

-- 4. Seed content (via API /api/admin/create-website yang sudah ada)
```

---

## 14. Pricing (Landing Page)

| Tier | Harga | Fitur |
|---|---|---|
| **Essentials** | Rp1.5–2jt/tahun | 1 website, template pilihan, edit konten, hosting + domain, brand + logo |
| **Growth** | Rp3–3.5jt/tahun | Semua Essentials + more templates, SEO setup, 2x revisi/bulan, priority support |
| **Custom** | Dikotasi | Desain dari nol, fitur khusus |

---

## 15. Remaining TODO

### Segera 🔴
- [ ] BrandForm: upgrade ke palette combo picker
- [ ] Sidebar: rebrand "CMS Dashboard" → "SemuaBisa" logo
- [ ] DB migration `brand_palette_id` (cek status)

### Future ⬜
- [ ] Wire palette tokens ke semua template (baru 2/15 fully wired)
- [ ] Screenshot preview per template
- [ ] DNS records untuk subdomain (cek apakah sudah ada)
- [ ] Vercel/Supabase upgrade saat scale
- [ ] Rate limiting di API routes
- [ ] Monitoring (Vercel Analytics / Umami)
- [ ] Delete stray `src/{app` directory

---

## 16. Related Documentation Files

| File | Scope |
|---|---|
| `CLAUDE.md` | Root context — baca pertama |
| `CLAUDE-TEMPLATE.md` | Panduan buat/update template |
| `CLAUDE-CMS.md` | Panduan CMS dashboard |
| `CLAUDE-LANDING.md` | Panduan landing page |
| `CLAUDE-DEPLOY.md` | Deploy + subdomain routing |
| `CHECKLIST.md` | Progress tracker lengkap |
| `DOCUMENTATION.md` | **File ini** — dokumentasi lengkap |
