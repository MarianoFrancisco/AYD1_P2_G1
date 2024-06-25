import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import AppointmentsTable from '../components/AppointmentsTableByMedic';
import AppointmentsHistoryTable from '../components/AppointmentsHistoryByMedic';
import EditDoctorProfile from '../components/EditDoctorProfile';

export function DoctorHome({ onLogout }) {
  useEffect(() => {
    document.title = 'Doctor Home | MediCare';
  }, []);

  const getUserData = () => {
    const token = Cookies.get('token');
    if (token) {
      const decodedUser = decodeToken(token);
      return decodedUser;
    } else {
      console.log('No se encontró ningún token en las cookies.');
      return null;
    }
  };

  const userData = getUserData();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#user-menu-button') && !event.target.closest('#user-menu')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <AppointmentsTable userId={userData.id} />;
      case 'history':
        return <AppointmentsHistoryTable userId={userData.id} />;
      case 'horarios':
        return <div>Horarios Content</div>; // Reemplaza con tu componente real
      case 'nuevo-horario':
        return <div>Nuevo Horario Content</div>; // Reemplaza con tu componente real
      case 'edit-profile':
        return <EditDoctorProfile userData={userData} />;
      default:
        return <AppointmentsTable userId={userData.id} />;
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  if (!userData) {
    return null; // O muestra algún tipo de mensaje de error o redirecciona
  }

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button onClick={() => setActiveTab('appointments')} className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === 'appointments' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    Citas
                  </button>
                  <button onClick={() => setActiveTab('history')} className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === 'history' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    Historial
                  </button>
                  <button onClick={() => setActiveTab('horarios')} className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === 'horarios' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    Horarios
                  </button>
                  <button onClick={() => setActiveTab('nuevo-horario')} className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === 'nuevo-horario' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    Nuevo Horario
                  </button>
                  <button onClick={() => setActiveTab('edit-profile')} className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === 'edit-profile' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <div>
                    <button type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded={isOpen ? 'true' : 'false'} aria-haspopup="true" onClick={toggleMenu}>
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={`${import.meta.env.VITE_API_URL}/photo/${userData.photo}`} alt="" />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" id="user-menu">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Perfil</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2" onClick={handleLogout}>Cerrar sesión</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded={isOpen ? 'true' : 'false'} onClick={toggleMenu}>
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <button onClick={() => setActiveTab('appointments')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'appointments' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              Citas
            </button>
            <button onClick={() => setActiveTab('history')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'history' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              Historial
            </button>
            <button onClick={() => setActiveTab('horarios')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'horarios' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              Horarios
            </button>
            <button onClick={() => setActiveTab('nuevo-horario')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'nuevo-horario' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              Nuevo Horario
            </button>
            <button onClick={() => setActiveTab('edit-profile')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'edit-profile' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              Editar Perfil
            </button>
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Perfil</a>
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" onClick={handleLogout}>Cerrar sesión</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
}
