import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Search, Calendar } from 'lucide-react';
import NoticeManagementTable from '../components/NoticeManagementTable';

const Home = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        department: '',
        employee: '',
        status: '', 
        publishedOn: '',
    });

    const handleResetFilters = () => {
        setFilters({
            department: '',
            employee: '',
            status: '',
            publishedOn: '',
        });
    };

    return (
        <div>
          
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Notice Management</h1>
                <div className="flex items-center justify-between">
                   
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">
                            <span className="font-semibold text-teal-600">Active Notices: 8</span>
                        </span>
                        <span className="text-sm">
                            <span className="font-semibold text-orange-500">Draft Notice: 4</span>
                        </span>
                    </div>

                 
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => navigate('/create')}
                            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition text-sm"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Create Notice</span>
                        </button>
                        <button className="flex items-center space-x-2 border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition text-sm">
                            <Edit2 className="w-4 h-4" />
                            <span>Draft Notice</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Filter by:</span>
                    
                    <div className="flex items-center space-x-3 flex-1 ml-4">
                      
                        <select
                            value={filters.department}
                            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Departments or individuals</option>
                            <option value="All Department">All Department</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales Team">Sales Team</option>
                            <option value="Database Team">Database Team</option>
                            <option value="HR">HR</option>
                        </select>

                     
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={filters.employee}
                                onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
                                placeholder="Employee Id or Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                        </div>

                     
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Unpublished</option>
                        </select>

                     
                        <div className="relative">
                            <input
                                type="date"
                                placeholder='Publisehed ON'
                                value={filters.publishedOn}
                                onChange={(e) => setFilters({ ...filters, publishedOn: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                        </div>

                  
                        <button
                            onClick={handleResetFilters}
                            className="text-blue-600 text-sm font-medium hover:underline whitespace-nowrap"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>

   
            <NoticeManagementTable filters={filters} />
        </div>
    );
};

export default Home;
