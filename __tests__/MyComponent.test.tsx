import { render, screen } from '@testing-library/react';
import MyComponent from '../src/components/MyComponent';

const killMock = jest.fn();
const fromToMock = jest.fn(() => ({ kill: killMock }));

jest.mock('gsap', () => ({
  __esModule: true,
  default: { fromTo: fromToMock },
}));

describe('MyComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should call gsap animation on mount', () => {
    render(<MyComponent />);
    expect(fromToMock).toHaveBeenCalledWith(
      '.my-element',
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  });

  it('should clean up animation on unmount', () => {
    const { unmount } = render(<MyComponent />);
    unmount();
    expect(killMock).toHaveBeenCalled();
  });
});
