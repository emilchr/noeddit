import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import ROUTES from './routes';

export default function AppLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to={ROUTES.home()}>Home</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.posts()}>Posts</NavLink>
          </li>
          {/* This is where all the links to the different subReddits will get mapped. */}
        </ul>
      </nav>
      <Outlet />
      <p>Base</p>
    </div>
  );
}
