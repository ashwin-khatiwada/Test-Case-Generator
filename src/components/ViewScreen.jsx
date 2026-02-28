import { ChevronLeftIcon, DownloadIcon, EditIcon } from './Icons';
import StatusBadge from './StatusBadge';
import { formatDate, calculateStats } from '../utils/helpers';
import { exportTestPlanToExcel } from '../utils/excelExport';

export default function ViewScreen({ plan, onBack, onEdit, onExportSuccess }) {
    if (!plan) return null;

    const testCases = plan.testCases || [];
    const { passed, failed, blocked, notTested } = calculateStats(testCases);

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
                    <button onClick={handleExport} className="px-5 py-2.5 bg-[#079046] hover:bg-[#067c3b] text-white rounded-xl font-bold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#079046]/20">
                        <DownloadIcon className="w-5 h-5" /> Export Excel
                    </button>
                    <button onClick={() => onEdit(plan.id)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-slate-900/20">
                        <EditIcon className="w-5 h-5" /> Edit Plan
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-[#079046] to-[#056d35] px-6 py-5">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-white/80 mt-1">Module: {plan.module}</p>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <SummaryCard value={passed} label="Passed" color="bg-[#079046]/5 border-[#079046]/10 text-[#079046]" labelColor="text-[#079046]" />
                <SummaryCard value={failed} label="Failed" color="bg-red-50 border-red-200 text-red-600" labelColor="text-red-700" />
                <SummaryCard value={blocked} label="Blocked" color="bg-amber-50 border-amber-200 text-amber-600" labelColor="text-amber-700" />
                <SummaryCard value={notTested} label="Not Tested" color="bg-slate-50 border-slate-200 text-slate-600" labelColor="text-slate-700" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">Test Cases</h3>
                </div>
                <div className="table-container overflow-x-auto">
                    <table className="w-full min-w-[2600px] border-collapse">
                        <thead className="bg-slate-50">
                            <tr>
                                {[
                                    { label: 'ID', width: '80px' },
                                    { label: 'Name', width: '250px' },
                                    { label: 'Description', width: '250px' },
                                    { label: 'Preconditions', width: '250px' },
                                    { label: 'Test Steps', width: '300px' },
                                    { label: 'Input Data', width: '250px' },
                                    { label: 'Expected', width: '250px' },
                                    { label: 'Actual', width: '250px' },
                                    { label: 'Status', width: '150px' },
                                    { label: 'Date', width: '150px' }
                                ].map((h) => (
                                    <th key={h.label} style={{ width: h.width, minWidth: h.width }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                                        {h.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {testCases.map((tc) => {
                                const rowColorClass =
                                    tc.status === 'Passed' ? 'bg-[#079046]/[0.02]' :
                                        tc.status === 'Failed' ? 'bg-red-50/50' :
                                            tc.status === 'Blocked' ? 'bg-amber-50/50' :
                                                'bg-slate-50/50';

                                return (
                                    <tr key={tc.id} className={`${rowColorClass} hover:brightness-95 transition-all`}>
                                        <td className="px-4 py-4 align-middle text-center">
                                            <span className="font-mono text-sm font-bold text-[#079046] bg-[#079046]/5 px-2 py-1 rounded border border-[#079046]/10">{tc.id}</span>
                                        </td>
                                        <td className="px-4 py-4 align-middle text-slate-800 font-medium whitespace-pre-line text-sm">{tc.name}</td>
                                        <td className="px-4 py-4 align-middle text-slate-600 whitespace-pre-line text-sm">{tc.description}</td>
                                        <td className="px-4 py-4 align-middle text-slate-600 whitespace-pre-line text-sm">{tc.preconditions}</td>
                                        <td className="px-4 py-4 align-middle text-slate-600 whitespace-pre-line text-sm">{tc.steps}</td>
                                        <td className="px-4 py-4 align-middle text-slate-600 whitespace-pre-line text-sm min-w-[250px]">{tc.inputData}</td>
                                        <td className="px-4 py-4 align-middle text-slate-600 whitespace-pre-line text-sm">{tc.expected}</td>
                                        <td className="px-4 py-4 align-middle text-slate-600 whitespace-pre-line text-sm">{tc.actual}</td>
                                        <td className="px-4 py-4 align-middle">
                                            <StatusBadge status={tc.status} />
                                        </td>
                                        <td className="px-4 py-4 align-middle text-slate-600 text-sm">{tc.execDate ? formatDate(tc.execDate) : '-'}</td>
                                    </tr>
                                );
                            })}
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
