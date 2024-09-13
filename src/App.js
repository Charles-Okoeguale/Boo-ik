import Login from './screens/Authentication/login';
import Verification from './screens/Authentication/verifcation_code';
import Upload from './screens/Main/upload_screen';
import Signup from './screens/Authentication/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './screens/Authentication/404_not_found';

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
