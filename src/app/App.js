import React from 'react';
import Home from '../Features/Home/Home';
import Posts from '../Features/Posts/Posts';
import NotFound from '../Features/NotFound/NotFound';
import AppLayout from './AppLayout';
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />}/>
          <Route path="posts" element={<Posts />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

