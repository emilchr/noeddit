import React from 'react';
import Home from '../Features/Home/Home';
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
        <Route path="/" element={<Home />}>
          {/* <Route path="subreddit" element={<Subreddit />}/>
          <Route path="searchresults" element={<SearchResults />}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

