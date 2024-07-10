import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadLinks } from './subRedditsSlice';
import './SubReddits.css';
import { setSubreddit, toggleMenu } from '../userUi/userUiSlice';
import { useCallback } from 'react';
import { fetchPosts, resetNextPosts } from '../Posts/postsSlice';

function SubReddits() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.subReddits.isLoading);
  const hasError = useSelector((state) => state.subReddits.hasError);
  const link = useSelector(loadLinks);

  let content = '';

  const handleLinkClick = useCallback(
    (link) => {
      return (e) => {
        e.preventDefault();
        dispatch(fetchPosts(link));

        dispatch(setSubreddit(link));
        dispatch(toggleMenu());
        dispatch(resetNextPosts());
      };
    },
    [dispatch]
  );

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (hasError) {
    content = <p>An error has occurred</p>;
  } else {
    content = (
      <>
        {link.map((link) => (
          <button onClick={handleLinkClick(link.title)} key={link.id}>
            <NavLink to={link.url ? link.url : link.title}>
              {link.title}
            </NavLink>
          </button>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="subReddits">{content}</div>
    </>
  );
}

export default SubReddits;
