/**
 * localStorage abstraction layer.
 * Centralizes storage access so the persistence strategy can change
 * (e.g. to IndexedDB or an API) without touching any component.
 */

const STORAGE_KEY = 'testCaseManager_plans';

export function loadPlans() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function savePlans(plans) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}
