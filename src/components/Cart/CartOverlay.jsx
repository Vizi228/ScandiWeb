import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Cart.module.scss';
import CartBag from './CartBag';

export class CartOverlay extends Component {
  render() {
    const isVisible = this.props.isVisible;
    return (
      <>
        {
          <div className={[styles.overlay, isVisible ? styles.active : ''].join(' ')}>
            <div className={[styles.cart, isVisible ? styles.active : ''].join(' ')}>
              <CartBag />
            </div>
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isVisible: state.cartReducer.isVisibleOverlay,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
