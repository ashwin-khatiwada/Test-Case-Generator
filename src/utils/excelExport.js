/**
 * Excel export utility.
 * Isolated from UI so it can be tested/replaced independently.
 */
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { formatDate } from './helpers';

export async function exportTestPlanToExcel(plan) {
    if (!plan) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Test Suite');

    // Header section with plan metadata
    worksheet.addRow(['Test Suite Report']);
    worksheet.addRow([]);
    worksheet.addRow(['Test Suite Name:', plan.name]);
    worksheet.addRow(['Module:', plan.module]);
    worksheet.addRow(['Tester:', plan.tester]);
    worksheet.addRow(['Execution Date:', plan.executionDate ? formatDate(plan.executionDate) : 'Not set']);
    worksheet.addRow(['Description:', plan.description]);
    worksheet.addRow(['Prerequisites:', plan.prerequisites]);
    worksheet.addRow(['Environment:', plan.environment]);
    worksheet.addRow([]);
    worksheet.addRow(['Test Cases']);
    worksheet.addRow([]);

    // Merge Cells for Headers
    worksheet.mergeCells('A1:J1');
    worksheet.mergeCells('A11:J11');

    // Style Main Titles
    const title1 = worksheet.getCell('A1');
    title1.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
    title1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF079046' } }; // Brand green
    title1.alignment = { horizontal: 'center', vertical: 'middle' };

    const title2 = worksheet.getCell('A11');
    title2.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
    title2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF079046' } };
    title2.alignment = { horizontal: 'center', vertical: 'middle' };

    // Styling Metadata Keys (bold + blue background) and Values (borders)
    const metaRows = [3, 4, 5, 6, 7, 8, 9];
    metaRows.forEach((rowIdx) => {
        const keyCell = worksheet.getCell(`A${rowIdx}`);
        keyCell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // White text
        keyCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1E3A8A' } // Tailwind blue-900
        };

        // Apply borders and wrap to both Key and Value cells
        [worksheet.getCell(`A${rowIdx}`), worksheet.getCell(`B${rowIdx}`)].forEach(cell => {
            cell.border = {
                top: { style: 'thin' }, left: { style: 'thin' },
                bottom: { style: 'thin' }, right: { style: 'thin' }
            };
            cell.alignment = { wrapText: true, vertical: 'top' };
        });

        // Merge value across remaining columns for better readability
        worksheet.mergeCells(`B${rowIdx}:J${rowIdx}`);
    });

    // Test Cases Header
    const testCasesHeader = [
        'ID', 'Name', 'Description', 'Preconditions', 'Test Steps',
        'Input Data', 'Expected Result', 'Actual Result', 'Status', 'Execution Date',
    ];
    worksheet.addRow(testCasesHeader);

    const headerRow = worksheet.getRow(13);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1E3A8A' } // Blue background for table headers
        };
        cell.border = {
            top: { style: 'thin' }, left: { style: 'thin' },
            bottom: { style: 'thin' }, right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    });

    // Test Cases Row Data
    (plan.testCases || []).forEach((tc) => {
        const rowData = [
            tc.id, tc.name, tc.description, tc.preconditions, tc.steps,
            tc.inputData, tc.expected, tc.actual, tc.status,
            tc.execDate ? formatDate(tc.execDate) : '',
        ];

        const row = worksheet.addRow(rowData);

        // Style cells specifically for the columns that exist implicitly
        for (let i = 1; i <= testCasesHeader.length; i++) {
            const cell = row.getCell(i);

            // Add border
            cell.border = {
                top: { style: 'thin' }, left: { style: 'thin' },
                bottom: { style: 'thin' }, right: { style: 'thin' }
            };
            cell.alignment = { wrapText: true, vertical: 'top' };

            // Bold the Status column
            if (i === 9) {
                cell.font = { bold: true };
            }

            // Determine background color based on status
            let bgColor = 'FFFFFFFF'; // Default white
            if (tc.status === 'Passed') bgColor = 'FFE6F4EA'; // Faint green
            else if (tc.status === 'Failed') bgColor = 'FFFCE8E6'; // Faint red
            else if (tc.status === 'Blocked') bgColor = 'FFFFF0D4'; // Faint amber
            else if (tc.status === 'Not Tested') bgColor = 'FFF1F3F4'; // Faint grey

            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: bgColor }
            };
        }
    });

    // Set Column Widths
    worksheet.columns = [
        { width: 14 }, // ID
        { width: 25 }, // Name
        { width: 35 }, // Description
        { width: 25 }, // Preconditions
        { width: 40 }, // Steps
        { width: 25 }, // Input Data
        { width: 35 }, // Expected
        { width: 35 }, // Actual
        { width: 15 }, // Status
        { width: 15 }, // Exec Date
    ];

    // Export file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `${plan.name.replace(/[^a-z0-9]/gi, '_')}_TestSuite.xlsx`);
}
