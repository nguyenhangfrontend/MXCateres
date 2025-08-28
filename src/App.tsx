import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { lazy } from 'react';
import SignIn from '@/pages/AuthPages/SignIn';
import SignUp from '@/pages/AuthPages/SignUp';
import NotFound from '@/pages/OtherPage/NotFound';
import Videos from '@/pages/UiElements/Videos';
import Images from '@/pages/UiElements/Images';
import Alerts from '@/pages/UiElements/Alerts';
import Badges from '@/pages/UiElements/Badges';
import Avatars from '@/pages/UiElements/Avatars';
import Buttons from '@/pages/UiElements/Buttons';
// import LineChart from '@/pages/Charts/LineChart';
// import BarChart from '@/pages/Charts/BarChart';
const UserManagementPage = lazy(() => import('@/pages/UserManagement/UserManagementPage'));
const WaitingTimePage = lazy(() => import('@/pages/WaitingTime/WaittingTimePage'));
const Blank = lazy(() => import('@/pages/Blank'));
import AppLayout from './layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
const Home = lazy(() => import('@/pages/Dashboard/Home'));
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path='/' element={<Home />} />

            {/* Others Page */}
            <Route path='/blank' element={<Blank />} />

            {/* Tables */}
            <Route path='/user-management' element={<UserManagementPage />} />
            <Route path='/store-occupancy' element={<UserManagementPage />} />
            <Route path='/waiting-time' element={<WaitingTimePage />} />

            {/* Ui Elements */}
            <Route path='/alerts' element={<Alerts />} />
            <Route path='/avatars' element={<Avatars />} />
            <Route path='/badge' element={<Badges />} />
            <Route path='/buttons' element={<Buttons />} />
            <Route path='/images' element={<Images />} />
            <Route path='/videos' element={<Videos />} />

            {/* Charts */}
            {/* <Route path='/line-chart' element={<LineChart />} />
            <Route path='/bar-chart' element={<BarChart />} /> */}
          </Route>

          {/* Auth Layout */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Fallback Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
