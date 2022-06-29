import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartPageItem from '../components/Cart/CartPageItem';
import styles from '../styles/Cart.module.scss';
import { getCartCount, getCartTotal, getCurrentAmount } from '../utils';

export class Cart extends Component {
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
    const count = this.getCartCount();
    const symbol = this.props.cartItems[0]?.prices.find(
      (item) => item.currency.label === this.props.activeCurrency,
    ).currency.symbol;
    const total = this.getCartTotal();
    const tax = (total / 100) * 21;

    return (
      <div className={styles.mainPage}>
        <h1>Cart</h1>
        {this.props.cartItems.length > 0 ? (
          <>
            <div className={styles.cartItems}>
              {this.props.cartItems?.map((item, i) => (
                <CartPageItem
                  key={[item.name, item.activeAttribute, i]}
                  cartItems={this.props.cartItems}
                  activeCurrency={this.props.activeCurrency}
                  {...item}
                  item={item}
                />
              ))}
            </div>
            <div className={styles.total_item}>
              <h3>
                Tax 21%: {symbol}
                {tax}
              </h3>
              <h3>Quantity: {count}</h3>
              <h3>
                Total: {symbol}
                {total}
              </h3>
              <button
                className={[styles.checkOut, styles.button].join(' ')}
                onClick={() => this.onHandleCheckOut()}>
                Order
              </button>
            </div>
          </>
        ) : (
          <h2 className={styles.emptyCart}>Select product, please!</h2>
        )}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
