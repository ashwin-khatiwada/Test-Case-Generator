import { CheckIcon, XIcon, InfoIcon } from './Icons';

export default function ToastContainer({ toasts }) {
    return (
        <div id="toast-container" className="fixed top-20 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => {
                const isSuccess = toast.type === 'success';
                const isError = toast.type === 'error';
                const isInfo = toast.type === 'info';

                let bgColor = 'bg-blue-500';
                let Icon = InfoIcon;

                if (isSuccess) {
                    bgColor = 'bg-emerald-500';
                    Icon = CheckIcon;
                } else if (isError) {
                    bgColor = 'bg-red-500';
                    Icon = XIcon;
                }

                return (
                    <div
                        key={toast.id}
                        className={`${bgColor} text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 ${toast.exiting ? 'toast-exit' : 'toast-enter'
                            }`}
                    >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{toast.message}</span>
                    </div>
                );
            })}
        </div>
    );
}
