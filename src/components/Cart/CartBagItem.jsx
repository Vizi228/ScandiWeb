import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Cart.module.scss';
import { getCurrentAmount } from '../../utils';
import Attribute from '../Attribute';

export class CartBagItem extends Component {
  constructor(props) {
    super(props);
    this.getCurrentAmount = getCurrentAmount.bind(this);
  }

  render() {
    const currency = this.getCurrentAmount();
    return (
      <div className={styles.cartBag_item}>
        <div className={styles.info}>
          <h3>{this.props.brand}</h3>
          <h3>{this.props.name}</h3>
          <h3>
            {currency.currency.symbol}
            {String(currency.amount * this.props.count).split('.')[0]}
          </h3>
          <div className={styles.attributes}>
            {this.props.attributes.map((item, i) => (
              <Attribute
                styles={styles}
                key={[item.name, this.props.activeAttribute[i]]}
                activeAttribute={this.props.activeAttribute[i]}
                name={item.name}
                items={item.items}
              />
            ))}
          </div>
        </div>
        <div className={styles.counter}>
          <button onClick={() => this.props.onHandleIncrement(this.props.item)}>+</button>
          <span>{this.props.count}</span>
          <button onClick={() => this.props.onHandleDecrement(this.props.item)}>-</button>
        </div>
        <div className={styles.image}>
          <img src={this.props.image} alt="icon" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    onHandleIncrement: (obj) => dispatch({ type: 'ON_INCREMENT', payload: obj }),
    onHandleDecrement: (obj) => dispatch({ type: 'ON_DECREMENT', payload: obj }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartBagItem);
