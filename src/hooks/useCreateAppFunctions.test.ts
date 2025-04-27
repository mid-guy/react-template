import { renderHook, act } from '@testing-library/react';
import { Units, useCreateAppFunctions } from './useCreateAppFunctions';

describe('App Functions', () => {
  test('handleChange handles comma to period conversion', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    act(() => {
      result.current.handleChange({ target: { value: '12,5' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe('12.5');
    expect(result.current.value).toBe(12.5);
  });

  test('handleChange filters out non-numeric characters', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    act(() => {
      result.current.handleChange({ target: { value: '123abc' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe('123');
    expect(result.current.value).toBe(123);
  });

  test('handleChange handles multiple decimal points', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    act(() => {
      result.current.handleChange({ target: { value: '12.34.56' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe('12.3456');
    expect(result.current.value).toBe(12.3456);
  });

  test('handleChange handles misplaced minus sign', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    act(() => {
      result.current.handleChange({ target: { value: '12-34' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe('1234');
    expect(result.current.value).toBe(1234);
  });

  test('handleBlur caps negative values to 0', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    act(() => {
      result.current.handleChange({ target: { value: '-10' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleBlur();
    });

    expect(result.current.inputValue).toBe('0');
    expect(result.current.value).toBe(0);
  });

  test('handleBlur caps percent values to 100', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    // Ensure we're in percent mode
    expect(result.current.state).toBe(Units.PERCENT);

    act(() => {
      result.current.handleChange({ target: { value: '150' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleBlur();
    });

    expect(result.current.inputValue).toBe('100');
    expect(result.current.value).toBe(100);
  });

  test('handleIncrement increases value by 1 up to max', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    // Set initial value
    act(() => {
      result.current.handleChange({ target: { value: '98' } } as React.ChangeEvent<HTMLInputElement>);
    });

    // Increment once
    act(() => {
      result.current.handleIncrement();
    });

    expect(result.current.value).toBe(99);

    // Increment again
    act(() => {
      result.current.handleIncrement();
    });

    expect(result.current.value).toBe(100);

    // Try to exceed max value for percent
    act(() => {
      result.current.handleIncrement();
    });

    expect(result.current.value).toBe(100); // Should stay at 100
  });

  test('handleDecrement decreases value by 1 down to min', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    // Set initial value
    act(() => {
      result.current.handleChange({ target: { value: '2' } } as React.ChangeEvent<HTMLInputElement>);
    });

    // Decrement once
    act(() => {
      result.current.handleDecrement();
    });

    expect(result.current.value).toBe(1);

    // Decrement again
    act(() => {
      result.current.handleDecrement();
    });

    expect(result.current.value).toBe(0);

    // Try to go below min value
    act(() => {
      result.current.handleDecrement();
    });

    expect(result.current.value).toBe(0); // Should stay at 0
  });

  test('handleUnitChange caps value when switching to percent mode', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    // Switch to pixel mode first
    act(() => {
      result.current.handleUnitChange(Units.PIXEL);
    });

    // Set a value greater than 100
    act(() => {
      result.current.handleChange({ target: { value: '150' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe(150);

    // Switch back to percent mode
    act(() => {
      result.current.handleUnitChange(Units.PERCENT);
    });

    // Value should be capped at 100
    expect(result.current.value).toBe(100);
    expect(result.current.inputValue).toBe('100');
  });

  test('handleUnitChange allows values over 100 in pixel mode', () => {
    const { result } = renderHook(() => useCreateAppFunctions());

    // Switch to pixel mode
    act(() => {
      result.current.handleUnitChange(Units.PIXEL);
    });

    // Set a value greater than 100
    act(() => {
      result.current.handleChange({ target: { value: '200' } } as React.ChangeEvent<HTMLInputElement>);
    });

    // Value should stay at 200
    expect(result.current.value).toBe(200);

    // Increment should still work
    act(() => {
      result.current.handleIncrement();
    });

    expect(result.current.value).toBe(201);
  });
});