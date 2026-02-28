import { UserIcon, CalendarIcon, ClipboardIcon, TrashIcon } from './Icons';
import { formatDate, getPassRate, calculateStats } from '../utils/helpers';

export default function TestPlanCard({ plan, onView, onEdit, onDelete }) {
    const testCases = plan.testCases || [];
    const passRate = getPassRate(testCases);
    const { passed, failed, blocked, notTested } = calculateStats(testCases);
    const total = testCases.length;

    const rateColor = passRate >= 70 ? 'text-emerald-600' : passRate >= 40 ? 'text-amber-600' : 'text-red-600';

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden group">
            <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{plan.name}</h3>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-tight">{plan.module}</p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:bg-white transition-colors`}>
                            <span className={`text-base font-black ${rateColor}`}>{passRate}%</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-slate-50/50 p-2 rounded-xl border border-slate-100/50">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <UserIcon className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="truncate font-medium">{plan.tester}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-slate-50/50 p-2 rounded-xl border border-slate-100/50">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <CalendarIcon className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="font-medium">{plan.executionDate ? formatDate(plan.executionDate) : 'Not set'}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge color="emerald" label={`${passed} Passed`} />
                    <Badge color="red" label={`${failed} Failed`} />
                    <Badge color="amber" label={`${blocked} Blocked`} />
                    <Badge color="slate" label={`${notTested} Not Tested`} />
                </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex gap-3 group-hover:bg-white transition-colors">
                <button onClick={() => onView(plan.id)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 shadow-sm">
                    Open Details
                </button>
                <button onClick={() => onEdit(plan.id)} className="px-4 py-2.5 bg-blue-50 border border-blue-100 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
                    Edit
                </button>
                <button onClick={() => onDelete(plan.id)} className="p-2.5 bg-red-50 border border-red-100 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

function Badge({ color, label }) {
    const styles = {
        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        red: 'bg-red-50 text-red-700 border-red-100',
        amber: 'bg-amber-50 text-amber-700 border-amber-100',
        slate: 'bg-slate-100 text-slate-600 border-slate-200'
    };
    return (
        <span className={`px-2.5 py-1 ${styles[color]} text-[10px] font-bold uppercase tracking-wider rounded-lg border`}>
            {label}
        </span>
    );
}
