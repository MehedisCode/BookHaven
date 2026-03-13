import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

function Navbar() {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    function handleClickOutside(e) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className="bg-blue-600 p-4 flex gap-6 items-center">
            <Link to="/" className="text-white font-bold hover:underline">
                Home
            </Link>

            {/* Content Management Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="text-white hover:text-gray-200 font-bold flex items-center gap-1 focus:outline-none"
                >
                    Content Management
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
                        <Link
                            to="/category"
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                            onClick={() => setOpen(false)}
                        >
                            Category
                        </Link>
                        <Link
                            to="/product"
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                            onClick={() => setOpen(false)}
                        >
                            Products
                        </Link>
                    </div>
                )}
            </div>

            <Link to="/privacy" className="text-white font-bold hover:underline">
                Privacy
            </Link>
        </nav>
    )
}

export default Navbar