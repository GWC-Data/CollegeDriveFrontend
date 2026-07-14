import React, { useState } from 'react';
import StudentRegister from './Components/Students/Register';
import UnifiedLogin from './Components/Students/LoginPage';
import StudentDashboard from './Components/Students/Dashboard';
import AdminDashboard from './Components/Admin/Dashboard';
import { GraduationCapIcon, SettingsIcon } from './Components/Icons';

function App() {
  // Session Recovery
  const [studentToken, setStudentToken] = useState(localStorage.getItem('studentToken') || '');
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('studentProfile') || 'null');
    } catch {
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminProfile') || 'null');
    } catch {
      return null;
    }
  });

  // Determine initial view based on active sessions
  const [view, setView] = useState(() => {
    if (studentToken && studentProfile) {
      return 'student-dashboard';
    }
    if (adminToken && adminProfile) {
      return 'admin-dashboard';
    }
    return 'login';
  });


  // Auth Setters
  const handleSetStudentAuth = (token, profile) => {
    setStudentToken(token);
    setStudentProfile(profile);
    localStorage.setItem('studentToken', token);
    localStorage.setItem('studentProfile', JSON.stringify(profile));
  };

  const handleSetAdminAuth = (token, user) => {
    setAdminToken(token);
    setAdminProfile(user);
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminProfile', JSON.stringify(user));
  };

  // Auth Logouts
  const handleStudentLogout = () => {
    setStudentToken('');
    setStudentProfile(null);
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentProfile');
    setView('login');
  };

  const handleAdminLogout = () => {
    setAdminToken('');
    setAdminProfile(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminProfile');
    setView('login');
  };

  // State-Based Router
  const renderView = () => {
    switch (view) {
      case 'student-register':
        return <StudentRegister setView={setView} />;

      case 'login':
        return (
          <UnifiedLogin
            setView={setView}
            setStudentAuth={handleSetStudentAuth}
            setAdminAuth={handleSetAdminAuth}
          />
        );

      case 'student-dashboard':
        return studentToken ? (
          <StudentDashboard token={studentToken} student={studentProfile} logout={handleStudentLogout} />
        ) : (
          <UnifiedLogin setView={setView} setStudentAuth={handleSetStudentAuth} setAdminAuth={handleSetAdminAuth} />
        );

      case 'admin-dashboard':
        return adminToken ? (
          <AdminDashboard token={adminToken} user={adminProfile} logout={handleAdminLogout} />
        ) : (
          <UnifiedLogin setView={setView} setStudentAuth={handleSetStudentAuth} setAdminAuth={handleSetAdminAuth} />
        );

      default:
        return <div className="text-slate-800 text-center py-20 font-bold">View Not Found</div>;
    }
  };

  return (
    <div className="App min-h-screen text-slate-800 selection:bg-indigo-500 selection:text-white bg-white">
      {renderView()}
    </div>
  );
}

export default App;
