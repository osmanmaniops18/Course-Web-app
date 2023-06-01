import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About';
import AdminCourses from './components/Admin/adminCourses/AdminCourses';
import CreateCourse from './components/Admin/createCourse/CreateCourse';
import Dashboard from './components/Admin/dashboard/Dashboard';
import Users from './components/Admin/users/Users';
import ForgetPassword from './components/auth/ForgetPassword';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import Contact from './components/contact/Contact';
import CoursePages from './components/coursePage/CoursePages';
import Courses from './components/courses/Courses';
import Home from './components/Home/Home';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import NotFound from './components/layout/notfound/NotFound';
import PaymentFail from './components/payments/PaymentFail';
import PaymentSucess from './components/payments/PaymentSucess';
import Subscribe from './components/payments/Subscribe';
import ChangePassword from './components/Profile/ChangePassword';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import Request from './components/request/Request';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/actions/user';
import ProtectedRoute from './ProtectedRoute';
import Loader from './components/layout/loader/Loader';

function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  const { isAutenticated, user, error, message, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAutenticated={isAutenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CoursePages />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={<Login isAutenticated={isAutenticated} />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isAutenticated={isAutenticated}
                  redirect="/login"
                >
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />

            <Route path="/updateprofile" element={<UpdateProfile user={user} />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/request" element={<Request />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/register"
              element={<Register isAutenticated={isAutenticated} />}
            />
            <Route path="/forgetpassword" element={<ForgetPassword  isAutenticated={isAutenticated} />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/paymentsucess" element={<PaymentSucess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/createcourse" element={<CreateCourse />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/users" element={<Users />} />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
