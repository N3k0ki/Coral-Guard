import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { routes } from "./_routes";
import './styles/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HashRouter>
  <Routes>
    {routes.map((route) => {
      return <Route path={route.path} element={route.element} />;
    })}
  </Routes>
</HashRouter>
);