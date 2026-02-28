/**
 * Pure utility functions used across the application.
 * These are stateless and have no side effects.
 */

/** Generate a unique ID for test plans */
export function generateId() {
    return 'plan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/** Format an ISO date string to a human-readable format */
export function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/** Escape HTML entities to prevent XSS in rendered content */
export function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Calculate test case statistics from a list of test cases.
 * Returns counts for each status type.
 */
export function calculateStats(testCases = []) {
    return testCases.reduce(
        (acc, tc) => {
            if (tc.status === 'Passed') acc.passed++;
            else if (tc.status === 'Failed') acc.failed++;
            else if (tc.status === 'Blocked') acc.blocked++;
            else acc.notTested++;
            return acc;
        },
        { passed: 0, failed: 0, blocked: 0, notTested: 0 }
    );
}

/** Calculate pass rate percentage from test cases */
export function getPassRate(testCases = []) {
    const total = testCases.length;
    if (total === 0) return 0;
    const passed = testCases.filter((tc) => tc.status === 'Passed').length;
    return Math.round((passed / total) * 100);
}

/**
 * Aggregate stats across all test plans.
 * Used by the dashboard stats cards.
 */
export function getGlobalStats(testPlans = []) {
    let passed = 0, failed = 0, blocked = 0, notTested = 0, totalCases = 0;
    testPlans.forEach((plan) => {
        const cases = plan.testCases || [];
        totalCases += cases.length;
        cases.forEach((tc) => {
            if (tc.status === 'Passed') passed++;
            else if (tc.status === 'Failed') failed++;
            else if (tc.status === 'Blocked') blocked++;
            else notTested++;
        });
    });
    return { total: testPlans.length, totalCases, passed, failed, blocked, notTested };
}
