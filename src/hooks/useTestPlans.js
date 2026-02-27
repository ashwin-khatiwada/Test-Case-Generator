/**
 * Custom hook: useTestPlans
 *
 * Single source of truth for all test plan CRUD operations.
 * Components consume this hook instead of managing state directly,
 * keeping business logic decoupled from presentation.
 */
import { useState, useCallback } from 'react';
import { loadPlans, savePlans } from '../utils/storage';
import { generateId } from '../utils/helpers';

export function useTestPlans() {
    const [testPlans, setTestPlans] = useState(() => loadPlans());

    // Persist to storage whenever plans change
    const persist = useCallback((updated) => {
        setTestPlans(updated);
        savePlans(updated);
    }, []);

    const addPlan = useCallback((planData) => {
        const newPlan = {
            ...planData,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        persist([...testPlans, newPlan]);
        return newPlan;
    }, [testPlans, persist]);

    const updatePlan = useCallback((id, planData) => {
        const updated = testPlans.map((p) =>
            p.id === id ? { ...planData, id, updatedAt: new Date().toISOString() } : p
        );
        persist(updated);
    }, [testPlans, persist]);

    const deletePlan = useCallback((id) => {
        persist(testPlans.filter((p) => p.id !== id));
    }, [testPlans, persist]);

    const getPlanById = useCallback(
        (id) => testPlans.find((p) => p.id === id) || null,
        [testPlans]
    );

    return { testPlans, addPlan, updatePlan, deletePlan, getPlanById };
}
