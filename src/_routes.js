import { Home } from './pages/home/home'
import Login from './pages/login/login';
import { Register } from './pages/register/register';

export const routes = [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login />}
];