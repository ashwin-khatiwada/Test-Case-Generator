import { DocumentIcon, CheckCircleIcon, XCircleIcon, WarningIcon, ClipboardIcon } from './Icons';

export default function StatsCards({ stats }) {
    const cards = [
        { key: 'total', label: 'Test Suites', sublabel: 'Managed Projects', icon: DocumentIcon, theme: 'indigo' },
        { key: 'passed', label: 'Passed', sublabel: 'Test Cases', icon: CheckCircleIcon, theme: 'emerald' },
        { key: 'failed', label: 'Failed', sublabel: 'Test Cases', icon: XCircleIcon, theme: 'red' },
        { key: 'blocked', label: 'Blocked', sublabel: 'Test Cases', icon: WarningIcon, theme: 'amber' },
        { key: 'notTested', label: 'Not Tested', sublabel: 'Pending Tasks', icon: ClipboardIcon, theme: 'slate' },
    ];

    const themes = {
        indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100', dot: 'bg-indigo-400', gradient: 'from-indigo-50 to-white' },
        emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-400', gradient: 'from-emerald-50 to-white' },
        red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100', dot: 'bg-red-400', gradient: 'from-red-50 to-white' },
        amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-400', gradient: 'from-amber-50 to-white' },
        slate: { bg: 'bg-slate-50', icon: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400', gradient: 'from-slate-50 to-white' },
    };

    return (
        <div id="stats-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {cards.map((card) => {
                const Icon = card.icon;
                const theme = themes[card.theme];
                return (
                    <div key={card.key} className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} rounded-3xl p-6 border ${theme.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 ${theme.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className={`w-6 h-6 ${theme.icon}`} />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-800 tracking-tight">{stats[card.key] || 0}</p>
                            <div className="mt-1">
                                <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">{card.label}</p>
                                <p className="text-xs text-slate-400 font-medium">{card.sublabel}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
