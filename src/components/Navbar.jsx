import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PlusIcon } from './Icons';
import logo from '../assets/lf-logo.svg';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const showAddButton = location.pathname === '/';

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                    </Link>
                    {showAddButton && (
                        <button
                            id="add-plan-btn"
                            onClick={() => navigate('/add')}
                            className="bg-[#079046] hover:bg-[#067c3b] text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#079046]/20 hover:shadow-[#079046]/30 hover:-translate-y-0.5"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Add New Test Suite</span>
                            <span className="sm:hidden">Add</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
