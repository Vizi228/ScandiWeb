import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../styles/Cart.module.scss';
import { getCartCount, getCartTotal, getCurrentAmount } from '../../utils';
import CartBagItem from './CartBagItem';

export class CartBag extends Component {
  constructor(props) {
    super(props);

    this.getCartCount = getCartCount.bind(this);
    this.getCurrentAmount = getCurrentAmount.bind(this);
    this.getCartTotal = getCartTotal.bind(this);
    this.onHandleCheckOut = this.onHandleCheckOut.bind(this);
  }

  onHandleCheckOut() {
    if (this.props.cartItems.length > 0) {
      this.props.onCheckOut();
      alert('Check out successful');
    } else {
      alert('Choose the product');
    }
  }

  render() {
    const symbol = this.props.cartItems[0]?.prices.find(
      (item) => item.currency.label === this.props.activeCurrency,
    ).currency.symbol;
    const count = this.getCartCount();
    const total = this.getCartTotal();
    return (
      <div className={styles.cartBag}>
        <div className={styles.cartBag_title}>
          <span>My Bag.</span> {count} items
        </div>
        <div className={styles.cartBag_items}>
          {this.props.cartItems?.map((item, i) => (
            <CartBagItem
              key={[item.name, item.activeAttribute, i]}
              cartItems={this.props.cartItems}
              activeCurrency={this.props.activeCurrency}
              {...item}
              item={item}
            />
          ))}
        </div>
        <div className={styles.cartBag_total}>
          <div className={styles.total_item}>
            <h2>Total</h2>
            <p>
              {symbol}
              {total}
            </p>
          </div>
          <div className={styles.total_item}>
            <Link to="/Cart">
              <button
                className={[styles.link, styles.button].join(' ')}
                onClick={this.props.onHandleIcon}>
                View bag
              </button>
            </Link>
            <button
              className={[styles.checkOut, styles.button].join(' ')}
              onClick={() => this.onHandleCheckOut()}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.items,
    activeCurrency: state.clothesReducer.activeCurrency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckOut: () => dispatch({ type: 'CLEAR_CART' }),
    onHandleIcon: () => dispatch({ type: 'ON_HANDLE_CART' }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartBag);
