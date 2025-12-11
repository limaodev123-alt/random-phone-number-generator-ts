# Random Phone Number Generator (TypeScript)

A robust, region-aware phone number generator written in TypeScript. It handles **uniqueness checks**, **pattern matching** (e.g., `(###) ###-####`), and multiple formats (E.164, National, International).

## How it works

The core logic uses a `Set` to ensure uniqueness (O(1) lookup) and supports a "retry strategy" to maximize the generated quantity without duplicates.

### Key Features

- **Pattern Matching**: Replaces placeholders (`#`) with random digits based on country-specific plans.
- **Uniqueness**: Uses a `Set<string>` to track `regionId + digits` combinations to prevent duplicates.
- **Retry Mechanism**: Implements a `maxAttempts` safety valve to prevent infinite loops when the pool is exhausted.

## Usage Example

```typescript
import { generatePhoneNumbers } from './core';

const result = generatePhoneNumbers({
  regionId: 'us', // or 'global'
  quantity: 50,
  format: 'national',
  ensureUnique: true
});

console.log(result.numbers);
```

## Live Demo & Online Tool

This repository contains the core logic for the **Random Phone Number Generator** web tool.

If you need to generate test data (CSV/JSON/SQL) instantly without running the code, use the live version:

👉 **[Try the Random Phone Number Generator Online](https://www.randomphonenumber.online/)**

## License

MIT
