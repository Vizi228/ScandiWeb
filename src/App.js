import './App.css';
import React from 'react';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import CartOverlay from './components/Cart/CartOverlay';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CartOverlay />
        <AppRouter />
      </div>
    );
  }
}



export default App
