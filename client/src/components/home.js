import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import ListItems from '../containers/list_items';
import ListItemPreview from '../containers/list_item_preview';

const Home = (props, context) => {
  console.warn('-->Home.props:', props)
  return (
    <div className="home">
      <ListItemPreview />
    </div >
  );
};

export default Home;
