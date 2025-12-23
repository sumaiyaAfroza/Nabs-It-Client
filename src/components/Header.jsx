import { Bell, Search } from 'lucide-react';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Left - Greeting */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Good Afternoon Asif</h2>
        <p className="text-sm text-gray-500">{currentDate}</p>
      </div>

      {/* Right - Icons and Profile */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Asif Raj</span>
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;