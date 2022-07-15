import './App.css';
import React from 'react';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import CartOverlay from './components/Cart/CartOverlay';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className={`App ${this.props.isVisibleOverlay ? 'active' : ''}`}>
        <Header />
        <CartOverlay />
        <AppRouter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isVisibleOverlay: state.cartReducer.isVisibleOverlay,
  };
};

export default connect(mapStateToProps)(withRouter(App))
