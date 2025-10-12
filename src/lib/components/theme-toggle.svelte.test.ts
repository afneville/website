import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import ThemeToggle from './theme-toggle.svelte';

const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

const matchMediaMock = vi.fn();
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: matchMediaMock
});

describe('ThemeToggle', () => {
	let mediaQueryListMock: {
		matches: boolean;
		addEventListener: ReturnType<typeof vi.fn>;
		removeEventListener: ReturnType<typeof vi.fn>;
	};

	beforeEach(() => {
		vi.clearAllMocks();
		localStorageMock.getItem.mockReturnValue(null);

		mediaQueryListMock = {
			matches: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn()
		};
		matchMediaMock.mockReturnValue(mediaQueryListMock);

		document.documentElement.className = '';
	});

	afterEach(() => {
		cleanup();
		document.documentElement.className = '';
	});

	describe('Initial Rendering', () => {
		it('renders theme toggle with default "auto" button active', () => {
			const { getByTitle } = render(ThemeToggle);
			const autoButton = getByTitle('Auto theme') as HTMLButtonElement;

			expect(autoButton).toBeInTheDocument();
			expect(autoButton.classList.contains('active')).toBe(true);
		});

		it('loads theme from localStorage on mount', () => {
			localStorageMock.getItem.mockReturnValue('dark');

			const { getByTitle } = render(ThemeToggle);
			const darkButton = getByTitle('Dark theme') as HTMLButtonElement;

			expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
			expect(darkButton.classList.contains('active')).toBe(true);
		});

		it('contains all theme buttons', () => {
			const { getByTitle } = render(ThemeToggle);

			const autoButton = getByTitle('Auto theme');
			const lightButton = getByTitle('Light theme');
			const darkButton = getByTitle('Dark theme');

			expect(autoButton).toBeInTheDocument();
			expect(lightButton).toBeInTheDocument();
			expect(darkButton).toBeInTheDocument();
		});

		it('has proper accessibility attributes', () => {
			const { getByTitle } = render(ThemeToggle);

			const autoButton = getByTitle('Auto theme');
			const lightButton = getByTitle('Light theme');
			const darkButton = getByTitle('Dark theme');

			expect(autoButton.title).toBe('Auto theme');
			expect(lightButton.title).toBe('Light theme');
			expect(darkButton.title).toBe('Dark theme');
		});
	});

	describe('System Theme Detection', () => {
		it('applies light theme when system prefers light and theme is auto', () => {
			mediaQueryListMock.matches = false;

			render(ThemeToggle);

			expect(document.documentElement.classList.contains('light')).toBe(true);
			expect(document.documentElement.classList.contains('dark')).toBe(false);
		});

		it('applies dark theme when system prefers dark and theme is auto', () => {
			mediaQueryListMock.matches = true;

			render(ThemeToggle);

			expect(document.documentElement.classList.contains('dark')).toBe(true);
			expect(document.documentElement.classList.contains('light')).toBe(false);
		});

		it('sets up media query listeners for system theme changes', () => {
			render(ThemeToggle);

			expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
			expect(mediaQueryListMock.addEventListener).toHaveBeenCalledWith(
				'change',
				expect.any(Function)
			);
		});

		it('removes event listener on component destroy', () => {
			const { unmount } = render(ThemeToggle);

			unmount();

			expect(mediaQueryListMock.removeEventListener).toHaveBeenCalledWith(
				'change',
				expect.any(Function)
			);
		});
	});

	describe('User Interactions', () => {
		it('activates light button when clicked', async () => {
			const { getByTitle } = render(ThemeToggle);
			const lightButton = getByTitle('Light theme') as HTMLButtonElement;
			const autoButton = getByTitle('Auto theme') as HTMLButtonElement;

			await fireEvent.click(lightButton);
			await tick();

			expect(lightButton.classList.contains('active')).toBe(true);
			expect(autoButton.classList.contains('active')).toBe(false);
		});

		it('applies theme class to document when button clicked', async () => {
			const { getByTitle } = render(ThemeToggle);
			const lightButton = getByTitle('Light theme') as HTMLButtonElement;

			await fireEvent.click(lightButton);
			await tick();

			expect(document.documentElement.classList.contains('light')).toBe(true);
		});

		it('responds to system theme changes when in auto mode', async () => {
			mediaQueryListMock.matches = false;
			const { getByTitle } = render(ThemeToggle);
			const autoButton = getByTitle('Auto theme') as HTMLButtonElement;

			expect(autoButton.classList.contains('active')).toBe(true);
			expect(document.documentElement.classList.contains('light')).toBe(true);

			mediaQueryListMock.matches = true;
			const changeHandler = mediaQueryListMock.addEventListener.mock.calls.find(
				(call) => call[0] === 'change'
			)?.[1];

			if (changeHandler) {
				changeHandler();
			}

			expect(document.documentElement.classList.contains('dark')).toBe(true);
			expect(document.documentElement.classList.contains('light')).toBe(false);
		});
	});

	describe('LocalStorage Integration', () => {
		it('removes theme from localStorage when changed to auto', async () => {
			localStorageMock.getItem.mockReturnValue('light');
			const { getByTitle } = render(ThemeToggle);
			const autoButton = getByTitle('Auto theme') as HTMLButtonElement;

			await fireEvent.click(autoButton);

			expect(localStorageMock.removeItem).toHaveBeenCalledWith('theme');
		});

		it('demonstrates $effect.root testing capability', async () => {
			let theme = $state('auto');

			const cleanup = $effect.root(() => {
				$effect(() => {
					if (theme === 'auto') {
						localStorageMock.removeItem('theme');
					} else {
						localStorageMock.setItem('theme', theme);
					}
				});
			});

			theme = 'dark';
			await tick();
			expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');

			theme = 'light';
			await tick();
			expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');

			theme = 'auto';
			await tick();
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('theme');

			cleanup?.();
		});
	});
});
