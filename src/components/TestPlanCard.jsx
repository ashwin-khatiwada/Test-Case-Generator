import { UserIcon, CalendarIcon, ClipboardIcon, TrashIcon } from './Icons';
import { formatDate, getPassRate, calculateStats } from '../utils/helpers';

export default function TestPlanCard({ plan, onView, onEdit, onDelete }) {
    const testCases = plan.testCases || [];
    const passRate = getPassRate(testCases);
    const { passed, failed, blocked, notTested } = calculateStats(testCases);
    const total = testCases.length;

    const rateColor = passRate >= 70 ? 'text-[#079046]' : passRate >= 40 ? 'text-amber-600' : 'text-red-600';

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#079046]/30 transition-all duration-300 flex flex-col h-full group">
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${passRate >= 80 ? 'bg-[#079046]' : passRate >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{plan.module}</span>
                        </div>
                        <div className="min-h-[3.25rem]">
                            <h3 className="text-lg font-extrabold text-slate-800 leading-snug group-hover:text-[#079046] transition-colors line-clamp-2" title={plan.name}>
                                {plan.name}
                            </h3>
                        </div>
                    </div>
                    <div className={`flex-shrink-0 px-3 py-1 rounded-full border text-xs font-black shadow-sm tracking-tight self-start mt-1
                        ${passRate >= 70 ? 'bg-[#079046]/10 text-[#079046] border-[#079046]/20' :
                            passRate >= 40 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                'bg-red-50 text-red-700 border-red-100'}`}>
                        {passRate}%
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span className="truncate font-medium">{plan.tester}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{plan.executionDate ? formatDate(plan.executionDate) : 'Not set'}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                    <Badge color="emerald" label={`${passed} Passed`} />
                    <Badge color="red" label={`${failed} Failed`} />
                    <Badge color="amber" label={`${blocked} Blocked`} />
                    <Badge color="slate" label={`${notTested} Not Tested`} />
                </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex gap-3 group-hover:bg-white transition-colors mt-auto">
                <button onClick={() => onView(plan.id)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 shadow-sm">
                    Open Details
                </button>
                <button onClick={() => onEdit(plan.id)} className="px-4 py-2.5 bg-[#079046]/5 border border-[#079046]/10 rounded-xl text-sm font-bold text-[#079046] hover:bg-[#079046] hover:text-white transition-all duration-200 shadow-sm">
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
        emerald: 'bg-[#079046]/5 text-[#079046] border-[#079046]/10',
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
