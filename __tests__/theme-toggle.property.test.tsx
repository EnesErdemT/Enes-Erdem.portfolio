/**
 * Property-Based Tests for Theme Toggle Functionality
 * Feature: personal-portfolio-website
 * 
 * Property 9: Theme Toggle Persistence
 * Property 10: Theme Initialization from Storage
 * Validates: Requirements 6.1, 6.2, 6.5
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, waitFor, cleanup } from '@testing-library/react';
import { act } from 'react';
import * as fc from 'fast-check';
import { ThemeProvider, useTheme } from '@/components/providers/theme-provider';

// Test component to access theme context
function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe('Theme Toggle Property-Based Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Remove dark class from document
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  /**
   * Property 9: Theme Toggle Persistence
   * 
   * For any theme change (light to dark or dark to light), the theme manager 
   * should save the selection to localStorage and apply it to the document root.
   * 
   * Validates: Requirements 6.1, 6.2
   */
  it('Property 9: should persist theme changes to localStorage and apply to document', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate a sequence of theme toggles (represented as boolean array)
        fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }),
        async (toggleSequence) => {
          // Reset state
          cleanup();
          localStorage.clear();
          document.documentElement.classList.remove('dark');

          const { getByTestId } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Wait for initial mount
          await waitFor(() => {
            expect(getByTestId('current-theme')).toBeInTheDocument();
          });

          const toggleButton = getByTestId('toggle-button');
          const themeDisplay = getByTestId('current-theme');

          // Track expected theme state
          let expectedTheme: 'light' | 'dark' = 'light';

          // Apply each toggle in the sequence
          for (const _ of toggleSequence) {
            await act(async () => {
              toggleButton.click();
            });

            // Toggle expected theme
            expectedTheme = expectedTheme === 'light' ? 'dark' : 'light';

            // Wait for state update
            await waitFor(() => {
              expect(themeDisplay.textContent).toBe(expectedTheme);
            });

            // Property: localStorage should contain the current theme
            const storedTheme = localStorage.getItem('theme');
            expect(storedTheme).toBe(expectedTheme);

            // Property: document root should have 'dark' class if theme is dark
            const hasDarkClass =
              document.documentElement.classList.contains('dark');
            expect(hasDarkClass).toBe(expectedTheme === 'dark');
          }

          // Clean up after this iteration
          cleanup();
        }
      ),
      { numRuns: 100 } // Run 100 iterations as per design requirements
    );
  });

  /**
   * Property 10: Theme Initialization from Storage
   * 
   * For any page load, the theme manager should check localStorage for a saved 
   * theme preference and apply it; if no preference exists, it should use the 
   * system preference or default to light mode.
   * 
   * Validates: Requirements 6.5
   */
  it('Property 10: should initialize theme from localStorage on mount', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate random initial theme state
        fc.constantFrom('light' as const, 'dark' as const),
        async (initialTheme) => {
          // Setup: Set theme in localStorage before mounting
          cleanup();
          localStorage.setItem('theme', initialTheme);
          document.documentElement.classList.remove('dark');

          const { getByTestId } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Wait for component to mount and initialize
          await waitFor(() => {
            expect(getByTestId('current-theme')).toBeInTheDocument();
          });

          const themeDisplay = getByTestId('current-theme');

          // Property: Theme should match the value from localStorage
          await waitFor(() => {
            expect(themeDisplay.textContent).toBe(initialTheme);
          });

          // Property: Document root should reflect the theme
          const hasDarkClass =
            document.documentElement.classList.contains('dark');
          expect(hasDarkClass).toBe(initialTheme === 'dark');

          // Cleanup
          cleanup();
          localStorage.clear();
          document.documentElement.classList.remove('dark');
        }
      ),
      { numRuns: 100 } // Run 100 iterations as per design requirements
    );
  });

  /**
   * Property 10 (Extended): Default to light mode when no preference exists
   * 
   * For any page load without a saved preference, the theme should default to 
   * light mode (when system preference is not dark).
   */
  it('Property 10 (Extended): should default to light mode when no localStorage value exists', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate random number of times to test this property
        fc.integer({ min: 1, max: 5 }),
        async (_iteration) => {
          // Ensure localStorage is empty
          cleanup();
          localStorage.clear();
          document.documentElement.classList.remove('dark');

          // Mock matchMedia to return false (no dark mode preference)
          const originalMatchMedia = window.matchMedia;
          window.matchMedia = (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => true,
          });

          const { getByTestId } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          await waitFor(() => {
            expect(getByTestId('current-theme')).toBeInTheDocument();
          });

          const themeDisplay = getByTestId('current-theme');

          // Property: Theme should default to 'light'
          await waitFor(() => {
            expect(themeDisplay.textContent).toBe('light');
          });

          // Property: Document should not have dark class
          const hasDarkClass =
            document.documentElement.classList.contains('dark');
          expect(hasDarkClass).toBe(false);

          // Restore matchMedia
          window.matchMedia = originalMatchMedia;

          // Cleanup
          cleanup();
          localStorage.clear();
          document.documentElement.classList.remove('dark');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9 & 10 Combined: Round-trip property
   * 
   * For any theme state, if we save it and then reload, we should get the same theme back.
   */
  it('Property 9 & 10 Combined: theme persistence round-trip', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('light' as const, 'dark' as const),
        async (theme) => {
          // First render: Set the theme
          cleanup();
          localStorage.clear();
          document.documentElement.classList.remove('dark');

          const { getByTestId: getByTestId1 } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          await waitFor(() => {
            expect(getByTestId1('current-theme')).toBeInTheDocument();
          });

          const toggleButton1 = getByTestId1('toggle-button');

          // Set to desired theme by toggling
          const currentTheme1 = getByTestId1('current-theme').textContent;
          if (currentTheme1 !== theme) {
            await act(async () => {
              toggleButton1.click();
            });
            await waitFor(() => {
              expect(getByTestId1('current-theme').textContent).toBe(theme);
            });
          } else {
            // If already at desired theme, toggle twice to ensure it's saved
            await act(async () => {
              toggleButton1.click();
            });
            await waitFor(() => {
              expect(getByTestId1('current-theme').textContent).not.toBe(theme);
            });
            await act(async () => {
              toggleButton1.click();
            });
            await waitFor(() => {
              expect(getByTestId1('current-theme').textContent).toBe(theme);
            });
          }

          // Verify it's saved
          expect(localStorage.getItem('theme')).toBe(theme);

          // Unmount first render
          cleanup();

          // Second render: Should load the same theme
          const { getByTestId: getByTestId2 } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          await waitFor(() => {
            expect(getByTestId2('current-theme')).toBeInTheDocument();
          });

          // Property: Theme should be the same as what we saved
          await waitFor(() => {
            expect(getByTestId2('current-theme').textContent).toBe(theme);
          });

          // Cleanup
          cleanup();
          localStorage.clear();
          document.documentElement.classList.remove('dark');
        }
      ),
      { numRuns: 100 }
    );
  });
});
