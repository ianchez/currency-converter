# Exchange Rates Converter

A modern currency exchange rates converter application with historical exchange rates and interactive trend visualization.

## Features

- React 19
- TypeScript
- Vite for fast development and building
- Redux Toolkit for state management and data caching
- ESLint and Prettier for code quality and formatting
- Recharts for data visualization
- React Testing Library and Vitest for testing

## Quick Start

### Prerequisites

- Node.js 18 or above (recommended: Node 22+)

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker

### Using Docker Compose

```bash
# Build and run
docker-compose up -d

# Stop
docker-compose down
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker directly

```bash
# Build image
docker build -t currency-exchange-rates .

# Run container
docker run -d -p 3000:80 currency-exchange-rates
```
