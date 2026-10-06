import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Repository from '../pages/Repository/Repository';
import User from '../pages/User/User';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:username" element={<User />} />
      <Route
        path="/repository/:owner/:repo"
        element={<Repository />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;