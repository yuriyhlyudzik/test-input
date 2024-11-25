import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Input } from './Input';

afterEach(cleanup);

describe('Input Component', () => {
    test('renders correctly with props', () => {
        const { container } = render(
            <Input
                type="text"
                loading
                error={false}
                placeholder="Enter text"
            />
        );

        const inputElement = screen.getByPlaceholderText('Enter text');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass('input');
        expect(container.querySelector('.loader')).toBeInTheDocument();
    });

    test('renders loader when `loading` prop is true', () => {
        render(<Input loading />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    test('does not render loader when `loading` prop is false', () => {
        const { container } = render(<Input loading={false} />);
        expect(container.querySelector('.loader')).not.toBeInTheDocument();
    });

    test('renders error message when `error` is true', () => {
        render(<Input error={true} errorMessage="This is an error" />);
        expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    test('focuses and blurs correctly', () => {
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
        const inputElement = screen.getByTestId('input');

        fireEvent.focus(inputElement);
        expect(handleFocus).toHaveBeenCalled();

        fireEvent.blur(inputElement);
        expect(handleBlur).toHaveBeenCalled();
    });

    test('calls onChange when typing', () => {
        const handleChange = jest.fn();

        render(<Input onChange={handleChange} />);
        const inputElement = screen.getByTestId('input');

        fireEvent.change(inputElement, { target: { value: 'New text' } });
        expect(handleChange).toHaveBeenCalled();
        expect(inputElement.value).toBe('New text');
    });

    test('cleans up touchmove event listener on unmount', () => {
        const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

        const { unmount } = render(<Input />);
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'touchmove',
            expect.any(Function)
        );

        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'touchmove',
            expect.any(Function)
        );

        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    test('synchronizes inner and outer refs correctly', () => {
        const ref = React.createRef();

        render(<Input ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

});
