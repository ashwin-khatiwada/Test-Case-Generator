import { UserIcon, CalendarIcon, ClipboardIcon, TrashIcon } from './Icons';
import { formatDate, getPassRate, calculateStats } from '../utils/helpers';

export default function TestPlanCard({ plan, onView, onEdit, onDelete }) {
    const testCases = plan.testCases || [];
    const passRate = getPassRate(testCases);
    const { passed, failed, blocked } = calculateStats(testCases);
    const total = testCases.length;

    const rateColor = passRate >= 70 ? 'text-emerald-600' : passRate >= 40 ? 'text-amber-600' : 'text-red-600';

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 truncate">{plan.name}</h3>
                        <p className="text-sm text-slate-500 truncate">{plan.module}</p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                            <span className={`text-sm font-bold ${rateColor}`}>{passRate}%</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{plan.tester}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        <span>{plan.executionDate ? formatDate(plan.executionDate) : 'Not set'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <ClipboardIcon className="w-4 h-4 text-slate-400" />
                        <span>{total} test case{total !== 1 ? 's' : ''}</span>
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md">{passed} Passed</span>
                    <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md">{failed} Failed</span>
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-md">{blocked} Blocked</span>
                </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex gap-2">
                <button onClick={() => onView(plan.id)} className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    View
                </button>
                <button onClick={() => onEdit(plan.id)} className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Edit
                </button>
                <button onClick={() => onDelete(plan.id)} className="px-3 py-2 bg-white border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
