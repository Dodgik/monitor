import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import ListItems from '../containers/list_items';
import ListItemPreview from '../containers/list_item_preview';

const Home = (props, context) => {
  console.warn('-->home.props:', props)
  return (
    <div className="home">
      { props.user.loggedIn ? (
        <a href="/logout"><button type="button" className="btn btn-primary btn-block">Logout</button></a>
      ) : (
        <Login />
      )}
      <ListItems />
      <ListItemPreview />
    </div >
  );
};

export default Home;
