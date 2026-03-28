import { mapApiError } from './utils/errorMessages.ts';

const testCases = [
  { isOffline: true, message: '' },
  { isTimeout: true, message: '' },
  { status: 404, message: 'Nenájdené' },
  { status: 422, message: 'Validačná chyba' },
  { status: 500, message: '' },
  { message: 'Neznáma chyba' }
];

console.log('=== Toast Error Mapping Test ===\n');

testCases.forEach((error, i) => {
  const mapped = mapApiError(error);
  console.log(`Test ${i + 1}:`, JSON.stringify(error));
  console.log(`→ ${mapped.type.toUpperCase()}: ${mapped.message}\n`);
});
