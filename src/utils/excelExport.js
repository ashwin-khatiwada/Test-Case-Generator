/**
 * Excel export utility.
 * Isolated from UI so it can be tested/replaced independently.
 */
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { formatDate } from './helpers';
import logoUrl from '../assets/lf-logo.svg';

async function getLogoBase64() {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const scale = 2; // scale for better resolution
            const canvas = document.createElement('canvas');
            canvas.width = (img.width || 195) * scale;
            canvas.height = (img.height || 37) * scale;
            const ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl.split(',')[1]);
        };
        img.onerror = reject;
        img.src = logoUrl;
    });
}

export async function exportTestPlanToExcel(plan) {
    if (!plan) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Test Suite');

    // Header section with plan metadata
    const row1 = worksheet.addRow([]); // Row 1 for logo
    const row2 = worksheet.addRow([]); // Row 2 for logo blanks
    row1.height = 35; // Make logo row bigger
    row2.height = 35;
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
    worksheet.mergeCells('A1:J2');
    worksheet.mergeCells('A3:J3');
    worksheet.mergeCells('A13:J13');

    try {
        const base64Image = await getLogoBase64();
        if (base64Image) {
            const imageId = workbook.addImage({
                base64: base64Image,
                extension: 'png',
            });
            worksheet.addImage(imageId, {
                tl: { col: 0.2, row: 0.5 }, // Left-aligned with slight margin, vertically centered across the 2 rows
                ext: { width: 250, height: 48 } // Slightly larger
            });
        }
    } catch (e) {
        console.error("Failed to add logo to excel", e);
    }

    // Style Main Titles
    const title1 = worksheet.getCell('A3');
    title1.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
    title1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF079046' } }; // Brand green
    title1.alignment = { horizontal: 'center', vertical: 'middle' };

    const title2 = worksheet.getCell('A13');
    title2.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
    title2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF079046' } };
    title2.alignment = { horizontal: 'center', vertical: 'middle' };

    // Styling Metadata Keys (bold + blue background) and Values (borders)
    const metaRows = [5, 6, 7, 8, 9, 10, 11];
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

    const headerRow = worksheet.getRow(15);
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
