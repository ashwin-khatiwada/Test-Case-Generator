import { ChevronLeftIcon, DownloadIcon, EditIcon } from './Icons';
import StatusBadge from './StatusBadge';
import { formatDate, calculateStats } from '../utils/helpers';
import { exportTestPlanToExcel } from '../utils/excelExport';

export default function ViewScreen({ plan, onBack, onEdit, onExportSuccess }) {
    if (!plan) return null;

    const testCases = plan.testCases || [];
    const { passed, failed, blocked } = calculateStats(testCases);

    const handleExport = () => {
        exportTestPlanToExcel(plan);
        onExportSuccess?.();
    };

    return (
        <div className="fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                        <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Test Plan Details</h2>
                        <p className="text-slate-500">View test plan information and test cases</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExport} className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                        <DownloadIcon className="w-5 h-5" /> Export Excel
                    </button>
                    <button onClick={() => onEdit(plan.id)} className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20">
                        <EditIcon className="w-5 h-5" /> Edit Plan
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-blue-100 mt-1">Module: {plan.module}</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailItem label="Tester" value={plan.tester || 'Not specified'} />
                    <DetailItem label="Execution Date" value={plan.executionDate ? formatDate(plan.executionDate) : 'Not set'} />
                    <DetailItem label="Test Case Prefix" value={plan.idPrefix || 'TC'} />
                    <div className="md:col-span-2 lg:col-span-3">
                        <DetailItem label="Description" value={plan.description || 'No description provided'} />
                    </div>
                    <DetailItem label="Prerequisites" value={plan.prerequisites || 'None specified'} pre />
                    <DetailItem label="Environment" value={plan.environment || 'Not specified'} pre />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <SummaryCard value={passed} label="Passed" color="bg-emerald-50 border-emerald-200 text-emerald-600" labelColor="text-emerald-700" />
                <SummaryCard value={failed} label="Failed" color="bg-red-50 border-red-200 text-red-600" labelColor="text-red-700" />
                <SummaryCard value={blocked} label="Blocked" color="bg-amber-50 border-amber-200 text-amber-600" labelColor="text-amber-700" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">Test Cases</h3>
                </div>
                <div className="table-container overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead className="bg-slate-50">
                            <tr>
                                {['ID', 'Name', 'Description', 'Test Steps', 'Expected', 'Actual', 'Status'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {testCases.map((tc) => (
                                <tr key={tc.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{tc.id}</span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-800">{tc.name}</td>
                                    <td className="px-4 py-3 text-slate-600 text-sm">{tc.description}</td>
                                    <td className="px-4 py-3 text-slate-600 text-sm whitespace-pre-line">{tc.steps}</td>
                                    <td className="px-4 py-3 text-slate-600 text-sm">{tc.expected}</td>
                                    <td className="px-4 py-3 text-slate-600 text-sm">{tc.actual}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={tc.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, pre }) {
    return (
        <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
            <p className={`text-slate-800 font-medium ${pre ? 'whitespace-pre-line' : ''}`}>{value}</p>
        </div>
    );
}

function SummaryCard({ value, label, color, labelColor }) {
    return (
        <div className={`${color} border rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-sm ${labelColor}`}>{label}</p>
        </div>
    );
}
