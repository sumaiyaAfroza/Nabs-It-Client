import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
          
            <Sidebar />

           
            <div className="flex-1 ml-64">
             
                <Header />

               
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;