import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/Category.module.scss';
import { getCurrentAmount } from '../utils';

export class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.getCurrentAmount = getCurrentAmount.bind(this);
  }

  render() {
    const price = this.getCurrentAmount();
    return (
      <div className={[styles.categoryItem, this.props.inStock ? styles.outHover : ''].join(' ')}>
        {this.props.inStock ? (
          ''
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.outOfStock}></div>
            <p className={styles.outStockTitle}>Out of stock</p>
          </div>
        )}
        <Link to={`/Product/${this.props.id}`}>
          <div className={styles.image}>
            <img src={this.props.gallery[0]} alt="" />
          </div>
          <p>{this.props.name}</p>
          <p className={styles.price}>
            {price.currency.symbol}
            {price.amount}
          </p>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCurrency: state.clothesReducer.activeCurrency,
  };
};

export default connect(mapStateToProps)(CategoryItem);
