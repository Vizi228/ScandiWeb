import React, { Component } from 'react';
import styles from '../../styles/Header.module.scss';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as Cart } from '../../images/cart-icon.svg';
import Currency from './Currency';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartCount } from '../../utils';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.getCount = getCartCount.bind(this);
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.items_list}>
          <Categories />
        </div>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.cart_menu}>
          <Currency />
          <div onClick={this.props.onHandleIcon} className={styles.cart}>
            <span className={styles.total}>{this.getCount()}</span>
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onHandleIcon: () => dispatch({ type: 'ON_HANDLE_CART' }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
