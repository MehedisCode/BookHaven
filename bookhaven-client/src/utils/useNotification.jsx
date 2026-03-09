import { useState } from "react";

export function useNotification() {
    const [notification, setNotification] = useState(null)

    function showNotification(message, type = "success") {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000)
    }
    return { notification, setNotification, showNotification }
}