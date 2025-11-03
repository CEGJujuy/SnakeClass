# Snake Game

Un juego clásico de la serpiente desarrollado con TypeScript, Vite y Canvas API. Diseño moderno, responsive y con controles táctiles.

## Descripción del Proyecto

Este proyecto implementa el clásico juego de la serpiente con características modernas y una experiencia de usuario optimizada. El juego presenta una interfaz limpia y atractiva, controles intuitivos tanto para teclado como para dispositivos táctiles, y un sistema de dificultad progresiva que hace el juego cada vez más desafiante.

## Características Principales

### Mecánicas del Juego
- Cuadrícula de 20x20 celdas
- Serpiente que crece al consumir alimento
- Detección de colisiones con paredes y con sí misma
- Sistema de puntuación: +10 puntos por cada alimento consumido
- Récord personal guardado en localStorage

### Dificultad Progresiva
- Velocidad inicial configurable
- Incremento automático de velocidad cada 5 puntos
- Indicador visual de velocidad en tiempo real (porcentaje)
- Velocidad mínima limitada para mantener jugabilidad

### Controles

#### Teclado
- **Flechas direccionales**: Control de dirección
- **WASD**: Control alternativo de dirección
- **Barra espaciadora o P**: Pausar/Reanudar
- **R**: Reiniciar (solo disponible en game over)

#### Táctil
- **Deslizamiento (swipe)**: Control direccional
- Detección de gestos en todas direcciones
- Distancia mínima de swipe para evitar inputs accidentales

### Interfaz de Usuario
- Diseño responsive adaptable a móviles, tablets y desktop
- Gradientes modernos y atractivos
- Visualización en tiempo real de:
  - Puntuación actual
  - Récord personal
  - Velocidad del juego
- Animaciones suaves y transiciones
- Estados visuales claros (juego activo, pausado, game over)

### Características Técnicas
- Renderizado con Canvas API
- Sistema de game loop optimizado con requestAnimationFrame
- Arquitectura modular y escalable
- TypeScript para type safety
- Sistema de controles desacoplado
- Persistencia de datos con localStorage

## Estructura del Proyecto

```
src/
├── main.ts          - Punto de entrada y loop principal del juego
├── game.ts          - Lógica central del juego
├── renderer.ts      - Renderizado del canvas
├── controls.ts      - Manejo de inputs (teclado y táctil)
├── ui.ts            - Interfaz de usuario y HUD
├── types.ts         - Definiciones de tipos TypeScript
├── style.css        - Estilos y diseño responsive
└── vite-env.d.ts    - Declaraciones de tipos para Vite
```

## Tecnologías Utilizadas

- **TypeScript**: Lenguaje de programación con tipado estático
- **Vite**: Build tool y dev server de alta velocidad
- **Canvas API**: Renderizado gráfico 2D
- **CSS3**: Estilos modernos con gradientes y animaciones
- **LocalStorage API**: Persistencia de récord personal

## Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## Información del Desarrollador

**Profesional**: César Eduardo González
**Cargo**: Analista en Sistemas
**Email**: gonzalezeduardo_31@hotmail.com
**Teléfono**: (+54) 3884 858-907

## Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.
