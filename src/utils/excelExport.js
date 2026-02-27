/**
 * Excel export utility.
 * Isolated from UI so it can be tested/replaced independently.
 */
import * as XLSX from 'xlsx';
import { formatDate } from './helpers';

export function exportTestPlanToExcel(plan) {
    if (!plan) return;

    const wb = XLSX.utils.book_new();

    // Header section with plan metadata
    const headerData = [
        ['Test Plan Report'],
        [],
        ['Test Plan Name:', plan.name],
        ['Module:', plan.module],
        ['Tester:', plan.tester],
        ['Execution Date:', plan.executionDate ? formatDate(plan.executionDate) : 'Not set'],
        ['Description:', plan.description],
        ['Prerequisites:', plan.prerequisites],
        ['Environment:', plan.environment],
        [],
        ['Test Cases'],
        [],
    ];

    const testCasesHeader = [
        'ID', 'Name', 'Description', 'Preconditions', 'Test Steps',
        'Input Data', 'Expected Result', 'Actual Result', 'Status', 'Execution Date',
    ];

    const testCasesData = (plan.testCases || []).map((tc) => [
        tc.id, tc.name, tc.description, tc.preconditions, tc.steps,
        tc.inputData, tc.expected, tc.actual, tc.status,
        tc.execDate ? formatDate(tc.execDate) : '',
    ]);

    const wsData = [...headerData, testCasesHeader, ...testCasesData];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws['!cols'] = [
        { wch: 12 }, { wch: 25 }, { wch: 30 }, { wch: 20 },
        { wch: 35 }, { wch: 20 }, { wch: 25 }, { wch: 25 },
        { wch: 12 }, { wch: 15 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Test Plan');
    XLSX.writeFile(wb, `${plan.name.replace(/[^a-z0-9]/gi, '_')}_TestPlan.xlsx`);
}
