import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AppRouter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.clothesReducer.items
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
