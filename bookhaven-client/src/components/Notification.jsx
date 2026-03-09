import { useEffect, useState } from "react";

function Notification({ notification, onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            setVisible(true);  // 👈 fade in
        }
    }, [notification]);

    if (!notification) return null;

    const styles = {
        success: { bar: "bg-green-500", progress: "bg-green-300", icon: "✓" },
        error: { bar: "bg-red-500", progress: "bg-red-300", icon: "✕" },
        warning: { bar: "bg-yellow-500", progress: "bg-yellow-300", icon: "⚠" },
    }

    const current = styles[notification.type] || styles.success;

    return (
        <div className={`fixed top-5 right-5 z-50 w-80 rounded-lg shadow-xl overflow-hidden
            transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
            {/* Main bar */}
            <div className={`${current.bar} flex items-center justify-between px-4 py-3 text-white`}>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{current.icon}</span>
                    <span className="text-sm font-medium">{notification.message}</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white text-xl leading-none"
                >
                    ×
                </button>
            </div>

            {/* Progress bar */}
            <div className={`${current.progress} h-1 animate-[shrink_3s_linear_forwards]`} />
        </div>
    )
}

export default Notification;