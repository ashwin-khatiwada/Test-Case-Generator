/**
 * Custom hook: useToast
 *
 * Manages toast notification state and lifecycle.
 * Each toast auto-dismisses after a configurable duration.
 */
import { useState, useCallback, useRef } from 'react';

export function useToast(duration = 3000) {
    const [toasts, setToasts] = useState([]);
    const idCounter = useRef(0);

    const showToast = useCallback((message, type = 'success') => {
        const id = ++idCounter.current;
        setToasts((prev) => [...prev, { id, message, type, exiting: false }]);

        // Begin exit animation, then remove
        setTimeout(() => {
            setToasts((prev) =>
                prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
            );
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 300);
        }, duration);
    }, [duration]);

    return { toasts, showToast };
}
