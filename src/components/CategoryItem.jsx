import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/Category.module.scss';
import { getCurrentAmount, onAddtoCart } from '../utils';
import { ReactComponent as Cart } from '../images/circle-icon.svg';

export class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.getCurrentAmount = getCurrentAmount.bind(this);
    this.onAddToCart = onAddtoCart.bind(this);
    this.onHandleCart = this.onHandleCart.bind(this);
  }

  onHandleCart(e) {
    e.preventDefault();
    if (this.props.product.attributes.length === 0) {
      this.onAddToCart();
    } else {
      alert('Choose the attribute');
    }
    return;
  }

  render() {
    const price = this.getCurrentAmount();
    const inStock = this.props.inStock;
    return (
      <div className={[styles.categoryItem, inStock ? styles.outHover : ''].join(' ')}>
        {inStock ? (
          ''
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.outOfStock}></div>
            <p className={styles.outStockTitle}>Out of stock</p>
          </div>
        )}
        <Link to={inStock ? `/Product/${this.props.id}` : ''}>
          <div className={styles.image}>
            <img src={this.props.gallery[0]} alt="" />
          </div>
          <p>{this.props.name}</p>
          <p className={styles.price}>
            {price.currency.symbol}
            {price.amount}
          </p>
          <span onClick={(e) => this.onHandleCart(e)} className={styles.cartIcon}>
            <Cart />
          </span>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.clothesReducer.activeCurrency,
    cartItems: state.cartReducer.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch({ type: 'ON_ADD_TO_CART', payload }),
    incrementToCart: (payload) => dispatch({ type: 'ON_INCREMENT', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
