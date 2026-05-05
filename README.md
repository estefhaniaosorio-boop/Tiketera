# BoliVer — Verificación de Identidad y Firma Biométrica

Plataforma para generar links de validación de identidad y firma biométrica de contratos de arrendamiento.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS
- API de Biometría (Seguros Bolívar)

## Ejecutar localmente

**Requisitos:** Node.js 20+

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env.local
   ```
   Llenar `VITE_BIOMETRY_API_KEY` con la API key de biometría.

3. Ejecutar:
   ```bash
   npm run dev
   ```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_BIOMETRY_API_KEY` | API key del servicio de biometría |
| `GEMINI_API_KEY` | API key de Google Gemini (opcional, para IA) |

## Funcionalidades

- Login por NIT de inmobiliaria
- Generación de links de validación de identidad
- Firma biométrica de contratos (vivienda y comercial)
- Dashboard de seguimiento de solicitudes y contratos
- Control de cupo de transacciones
