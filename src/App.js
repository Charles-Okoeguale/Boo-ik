import Login from './screens/Authentication/login';
import Verification from './screens/Authentication/verifcation_code';
import Upload from './screens/Main/upload_screen';
import Signup from './screens/Authentication/signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './screens/Authentication/404_not_found';
import UseAuth from './hook/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PDFViewer from './screens/Main/pdf';

function App() {
  const { currentUser, loading } = UseAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Router>
          <Routes>
          <Route
              path="/"
              index
              element={currentUser ? <Upload /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/upload"
              index
              element={currentUser ? <Upload /> : <Navigate to="/auth/login" />}
            />
            <Route
                path="/pdf_viewer/:pdfName"
                element={currentUser ? <PDFViewer /> : <Navigate to="/auth/login" />}
            />
            <Route 
              path="/auth/login" 
              element={<Login />} 
            />
            <Route 
              path="/auth/verification" 
              element={<Verification />} 
            />
            <Route 
              path="/auth/signup" 
              element={<Signup />} 
            />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </Router>
        <ToastContainer />
    </div>
  );
}

export default App;
