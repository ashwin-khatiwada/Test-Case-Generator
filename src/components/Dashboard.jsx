import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, ClipboardIcon } from './Icons';
import StatsCards from './StatsCards';
import TestPlanCard from './TestPlanCard';
import { getGlobalStats } from '../utils/helpers';
import logo from '../assets/lf-logo.svg';

export default function Dashboard({ testPlans, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const stats = useMemo(() => getGlobalStats(testPlans), [testPlans]);

    const filtered = useMemo(
        () =>
            testPlans.filter((plan) =>
                plan.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [testPlans, searchTerm]
    );

    return (
        <div id="dashboard-screen" className="fade-in max-w-7xl mx-auto flex flex-col lg:h-[calc(100vh-140px)] lg:overflow-hidden pb-20 lg:pb-0">
            {/* Header & Stats Section */}
            <div className="relative z-20 px-1 bg-[#f9fafb] lg:bg-transparent pt-2 pb-8 flex-shrink-0" id="dashboard-fixed-header">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 lg:mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                            Quality Assurance <span className="text-[#079046]">Dashboard</span>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-500 font-medium">
                            Manage and track your quality assurance workflows.
                        </p>
                    </div>

                    <div className="relative group w-full lg:w-96 shadow-sm">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#079046] transition-colors" />
                        <input
                            type="text"
                            placeholder="Find a test suite..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:border-[#079046] focus:ring-4 focus:ring-[#079046]/5 transition-all duration-300 outline-none font-medium"
                        />
                    </div>
                </div>

                <StatsCards stats={stats} />

                {/* Separator for Locked Header */}
                <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-px bg-slate-200/60"></div>
            </div>

            {/* Test Plans Grid */}
            <div className="relative z-10 pt-8 lg:pt-10 px-1 lg:flex-1 lg:overflow-y-auto lg:pr-2 custom-scrollbar">
                {testPlans.length === 0 ? (
                    <div id="empty-state" className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm mb-12">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                            <ClipboardIcon className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No Test Suites Yet</h3>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto px-4">Get started by creating your first test suite to begin tracking your quality assurance metrics.</p>
                        <button
                            onClick={() => navigate('/add')}
                            className="bg-[#079046] hover:bg-[#067c3b] text-white px-8 py-3.5 rounded-2xl font-black transition-all duration-200 shadow-xl shadow-[#079046]/20 active:scale-95"
                        >
                            Create Your First Test Suite
                        </button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm mb-12">
                        <p className="text-slate-500 font-bold text-lg">No test suites match your search</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-[#079046] font-bold hover:underline"
                        >
                            Clear search filter
                        </button>
                    </div>
                ) : (
                    <div id="test-plans-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12">
                        {filtered.map((plan) => (
                            <TestPlanCard
                                key={plan.id}
                                plan={plan}
                                onView={(id) => navigate(`/view/${id}`)}
                                onEdit={(id) => navigate(`/edit/${id}`)}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
