import { WarningIcon } from './Icons';

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm" onClick={onCancel}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden slide-up" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <WarningIcon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{title}</h3>
                    <p className="text-slate-600 text-center">{message}</p>
                </div>
                <div className="bg-slate-50 px-6 py-4 flex gap-3 justify-end">
                    <button onClick={onCancel} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
