# Deepwoken Wind Tracker

Aplicación web para calcular y rastrear tu Wind en el juego **Deepwoken**.

## Características

- **Gestión de Personajes**: Crea hasta 6 personajes distintos
- **Selección de Raza**: Elige entre múltiples razas del juego
- **Selección de Arma**: Configura tu arma principal
- **Attunements**: Selecciona tus afinaciones elementales
- **Tareas**: Marca las tareas completadas
- **Modifiers**: Activa/desactiva modificadores de viento
- **Cálculo de Wind**: Calcula automáticamente tu rango de viento (W, S, A, B, C, D, E)

## Cálculo del Wind

```
Total = PuntosBase × (1.0 + Σ(ModifiersActivos))
```

### Rangos de Wind

| Rango | Puntos mínimos |
|-------|----------------|
| W     | 140+           |
| S     | 112+           |
| A     | 87+            |
| B     | 60+            |
| C     | 30+            |
| D     | 1+             |
| E     | 0              |

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- localStorage para persistencia

## Commands

```bash
npm install    # Instalar dependencias
npm run dev    # Iniciar servidor de desarrollo (http://localhost:5173)
npm run build  # Construcción para producción
npm run lint   # Verificar código con ESLint
npm run preview # Vista previa de la build
```

## Estructura del Proyecto

```
src/
├── components/    # Componentes de React
├── constants/     # Datos del juego (razas, armas, tareas, modifiers)
├── hooks/         # Hooks personalizados
├── types/         # Interfaces de TypeScript
└── App.tsx        # Aplicación principal
```

## Persistencia

Los datos se almacenan en `localStorage` con la clave `deepwoken_characters`.

---
*Deepwoken es un juego de [Arken Studios](https://arkengames.co/). Esta aplicación no está afiliada al juego oficial.*