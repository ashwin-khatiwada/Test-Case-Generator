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
        <div id="dashboard-screen" className="fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-120px)] overflow-hidden">
            {/* Locked Header & Stats Section */}
            <div className="flex-shrink-0 bg-slate-50 pt-2 pb-8 relative z-20" id="dashboard-fixed-header">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                            Test Plans <span className="text-blue-600">Dashboard</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium">
                            Manage and track your quality assurance workflows.
                        </p>
                    </div>

                    <div className="relative group w-full lg:w-96">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find a test plan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 shadow-sm outline-none font-medium"
                        />
                    </div>
                </div>

                <StatsCards stats={stats} />

                {/* Aesthetic Separator Line - Fixed at the bottom of the header */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            {/* Scrollable Test Plans Grid */}
            <div className="flex-1 overflow-y-auto pr-2 pb-12 custom-scrollbar relative z-10">
                <div className="pt-10">
                    {testPlans.length === 0 ? (
                        <div id="empty-state" className="text-center py-16 bg-white rounded-3xl border border-slate-200">
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
                        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
                            <p className="text-slate-500 font-medium font-lg">No test plans match your search</p>
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
            </div>
        </div>
    );
}
