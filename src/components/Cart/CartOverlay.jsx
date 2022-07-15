import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Cart.module.scss';
import CartBag from './CartBag';

export class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.outsideClickRef = React.createRef();
    this.onClickOutside = this.onClickOutside.bind(this);
  }
  onClickOutside(e) {
    if (
      !e.path.includes(this.outsideClickRef.current) &&
      e.target.parentElement !== this.props.cartRef.current &&
      this.props.isVisible
    ) {
      this.props.onHandleCart();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }
  render() {
    const isVisible = this.props.isVisible;
    return (
      <>
        {
          <div className={[styles.overlay, isVisible ? styles.active : ''].join(' ')}>
            <div
              ref={this.outsideClickRef}
              className={[styles.cart, isVisible ? styles.active : ''].join(' ')}>
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
    cartRef: state.cartReducer.cartRef,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onHandleCart: () => dispatch({ type: 'ON_HANDLE_CART' }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
