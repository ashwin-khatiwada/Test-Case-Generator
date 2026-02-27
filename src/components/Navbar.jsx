import { PlusIcon, ClipboardCheckIcon } from './Icons';

/**
 * Navbar — exact same markup/classes as the original index.html
 */
export default function Navbar({ onNavigate, showAddButton }) {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ClipboardCheckIcon className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800">Test Case Manager</h1>
                    </div>
                    {showAddButton && (
                        <button
                            id="add-plan-btn"
                            onClick={() => onNavigate('add')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Add New Test Plan</span>
                            <span className="sm:hidden">Add</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
