import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppStore from 'stores/domain/AppStore';
import RequireAuth from 'components/RequireAuth';
import Main from 'pages/Main';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';

export const AppContext = createContext<AppStore>({} as AppStore);

const App: React.FC = () => {
    const appStore = new AppStore();

    const router = createBrowserRouter([
        { path: '/', element: <RequireAuth><Main /></RequireAuth> },
        { path: '/sign-in', element: <SignIn returnPath='/' />},
        { path: '/sign-up', element: <SignUp returnPath='/' />},
    ]);
    
    return (
        <AppContext.Provider value={appStore}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    );
};

export default App;