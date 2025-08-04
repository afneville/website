import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock SVG imports
vi.mock('$lib/assets/copy.svg?raw', () => ({
	default: '<svg><path d="copy-icon"/></svg>'
}));

vi.mock('$lib/assets/check.svg?raw', () => ({
	default: '<svg><path d="check-icon"/></svg>'
}));
