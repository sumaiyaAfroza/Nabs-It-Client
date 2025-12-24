import { Bell, Search } from 'lucide-react';
import man from '../../public/man.png';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
 
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Good Afternoon Asif</h2>
        <p className="text-sm text-gray-500">{currentDate}</p>
      </div>

    
      <div className="flex items-center space-x-4">
        
        <button className="p-2 hover:bg-gray-100 border-r-1 border-gray-400 transition relative">
          <div className=''>
            <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className='flex flex-col'>
            <span className="text-sm font-medium text-gray-700">Asif Raj</span>
            <h1>hr</h1>
          </div>
          <img src={man} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;