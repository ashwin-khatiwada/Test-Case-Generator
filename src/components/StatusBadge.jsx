import { CheckIcon, XIcon, WarningIcon } from './Icons';

export default function StatusBadge({ status }) {
    if (!status) {
        return <span className="text-slate-400 text-sm">Not tested</span>;
    }

    const stylesMap = {
        'Passed': 'bg-[#079046]/5 text-[#079046] border-[#079046]/20',
        'Failed': 'bg-red-50 text-red-700 border-red-200',
        'Blocked': 'bg-amber-50 text-amber-700 border-amber-200'
    };

    const iconsMap = {
        'Passed': CheckIcon,
        'Failed': XIcon,
        'Blocked': WarningIcon
    };

    const Icon = iconsMap[status] || WarningIcon;
    const colorClasses = stylesMap[status] || 'bg-slate-100 text-slate-700 border-slate-200';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses}`}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </span>
    );
}
