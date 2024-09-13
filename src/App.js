import Login from './Screens/Authentication/login';
import Verification from './Screens/Authentication/verifcation_code';
import Upload from './Screens/Main/upload_screen';
import Signup from './Screens/Authentication/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './Screens/Authentication/404_not_found';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verification" element={<Verification />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
