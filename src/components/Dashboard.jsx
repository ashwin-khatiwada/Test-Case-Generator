import { useMemo, useState } from 'react';
import { SearchIcon, ClipboardIcon } from './Icons';
import StatsCards from './StatsCards';
import TestPlanCard from './TestPlanCard';
import { getGlobalStats } from '../utils/helpers';

export default function Dashboard({ testPlans, onNavigate, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');

    const stats = useMemo(() => getGlobalStats(testPlans), [testPlans]);

    const filtered = useMemo(
        () =>
            testPlans.filter((plan) =>
                plan.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [testPlans, searchTerm]
    );

    return (
        <div id="dashboard-screen" className="fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Test Plans Dashboard</h2>
                <p className="text-slate-500">Manage and track your test plans and test cases</p>
            </div>

            <div className="mb-6">
                <div className="relative max-w-md">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search by Test Plan Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:border-blue-400 transition-all duration-200"
                    />
                </div>
            </div>

            <StatsCards stats={stats} />

            {testPlans.length === 0 ? (
                <div id="empty-state" className="text-center py-16">
                    <div className="w-32 h-32 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                        <ClipboardIcon className="w-16 h-16 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No Test Plans Yet</h3>
                    <p className="text-slate-500 mb-6">Get started by creating your first test plan</p>
                    <button
                        onClick={() => onNavigate('add')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/20"
                    >
                        Create Your First Test Plan
                    </button>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-500">No test plans match your search</p>
                </div>
            ) : (
                <div id="test-plans-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((plan) => (
                        <TestPlanCard
                            key={plan.id}
                            plan={plan}
                            onView={(id) => onNavigate('view', id)}
                            onEdit={(id) => onNavigate('edit', id)}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
