import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 flex gap-6">
            <Link to="/" className="text-white font-bold hover:underline">
                Home
            </Link>
            <Link to="/privacy" className="text-white font-bold hover:underline">
                Books
            </Link>
        </nav>
    )
}

export default Navbar