/**
 * Example Test File
 * 
 * This file demonstrates the testing setup and serves as a template
 * for writing new tests in the project.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Example: Testing a simple component
function ExampleComponent({ message }: { message: string }) {
  return <div data-testid="message">{message}</div>;
}

describe('Testing Setup Verification', () => {
  it('should render components correctly', () => {
    render(<ExampleComponent message="Hello, World!" />);
    
    const element = screen.getByTestId('message');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello, World!');
  });

  it('should support basic assertions', () => {
    expect(1 + 1).toBe(2);
    expect('test').toBeTruthy();
    expect([1, 2, 3]).toHaveLength(3);
  });

  it('should have access to DOM APIs', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
    expect(localStorage).toBeDefined();
  });
});
