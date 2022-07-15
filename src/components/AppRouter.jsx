import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Cart from '../pages/Cart';
import Category from '../pages/Category';
import Product from '../pages/Product';

export class AppRouter extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/categories/:id">
            <Category />
          </Route>
          <Route exact path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route>
            <Redirect to="/categories/all" />
          </Route>
        </Switch>
      </>
    );
  }
}

export default AppRouter;
