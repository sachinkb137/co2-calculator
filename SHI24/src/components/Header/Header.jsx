import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo1.jpg';

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-md py-4 px-6">
            <div className="container mx-auto flex justify-between items-center px-6">
                <ul className='flex gap-4 items-center'>
                    {/* Logo */}
                    <img
                        className='h-16 object-cover object-top rounded-3xl hover:shadow-md hover:shadow-green-500'
                        src={logo}
                        alt="image not found"
                    />

                    {/* Logo or Title */}
                    <div className="text-white text-2xl font-bold">
                        <Link to="/" className="hover:text-gray-200">Carbon Calculator</Link>
                    </div>
                </ul>

                {/* Navigation Links */}
                <nav className="flex space-x-8 items-center">
                    {/* Carbon Emission Dropdown */}
                    <div className="relative">
                        <button
                            className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
                            onClick={toggleDropdown}
                        >
                            Carbon Emission
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 w-48">
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/" onClick={() => setDropdownOpen(false)}>
                                        Carbon Footprint
                                    </Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/electricity" onClick={() => setDropdownOpen(false)}>
                                        Electricity
                                    </Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/transportation" onClick={() => setDropdownOpen(false)}>
                                        Transportation
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Carbon Sequestration */}
                    <Link
                        to="/carbon-sequestration"
                        className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
                    >
                        Carbon Sequestration
                    </Link>

                    {/* Carbon Credits */}
                    <Link
                        to="/carbon-credits"
                        className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
                    >
                        Carbon Credits
                    </Link>
                </nav>

                {/* Sign Up Button */}
                <div className="hidden md:block">
                    <Link
                        to="/signup"
                        className="bg-lime-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-lime-600 transition duration-300"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
