import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import ListItems from '../containers/list_items';
import ListItemPreview from '../containers/list_item_preview';

const NotFound = () => {
  console.warn('-->NotFound')
  return (
    <div className="preview">
      <h2>Page not found</h2>
      <p>Back to</p>
      <Link to={'/'}>
        <button type="button" className="btn btn-primary">main</button>
      </Link>
    </div>
  );
};

export default NotFound;
