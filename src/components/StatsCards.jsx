import { DocumentIcon, CheckCircleIcon, XCircleIcon, WarningIcon } from './Icons';

export default function StatsCards({ stats }) {
    const cards = [
        { key: 'total', label: 'Total Plans', icon: DocumentIcon, bgColor: 'bg-blue-50', textColor: 'text-blue-500' },
        { key: 'passed', label: 'Passed', icon: CheckCircleIcon, bgColor: 'bg-emerald-50', textColor: 'text-emerald-500' },
        { key: 'failed', label: 'Failed', icon: XCircleIcon, bgColor: 'bg-red-50', textColor: 'text-red-500' },
        { key: 'blocked', label: 'Blocked', icon: WarningIcon, bgColor: 'bg-amber-50', textColor: 'text-amber-500' },
    ];

    return (
        <div id="stats-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div key={card.key} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center`}>
                                <Icon className={`w-6 h-6 ${card.textColor}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{stats[card.key] || 0}</p>
                                <p className="text-sm text-slate-500">{card.label}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
