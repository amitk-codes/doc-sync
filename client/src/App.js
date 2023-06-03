import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DocPage } from './components/doc-page';
import { Header } from './components/header';
import { Login } from './components/login';
import { MainContent } from './components/main-content';
import { Signup } from './components/signup';
import LoadingBar from 'react-top-loading-bar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { setProgress } from './store';
import PublicRoutes from './components/public-routes';
import ProtectedRoutes from './components/protected-routes';

function App() {
  return (
    <>
      <Provider store={store}>
        <ProgressLoader />
        <Routes>
        
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<MainContent />} />
            <Route path="/document/:id" element={<DocPage />} />
          </Route>

          <Route path='login' element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path='signup' element={<PublicRoutes />}>
          <Route path="/signup" element={<Signup />} />
          </Route>

        </Routes>
      </Provider>
    </>
  );
}

function ProgressLoader() {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress);

  return (
    <LoadingBar
      color="#f11946"
      height={4}
      progress={progress}
      onLoaderFinished={() => dispatch(setProgress(0))}
    />
  );
}

export default App;
