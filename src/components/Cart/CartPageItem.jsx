import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Cart.module.scss';
import { getCurrentAmount } from '../../utils';
import Attribute from '../Attribute';
import { ReactComponent as Arrow } from '../../images/left-arrow.svg';

export class CartPageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: 0,
    };

    this.getCurrentAmount = getCurrentAmount.bind(this);
    this.onHandleArrow = this.onHandleArrow.bind(this);
  }

  onHandleArrow(e) {
    const className = e.target.parentElement.className.baseVal;
    const activeImage = this.state.activeImage;
    if (className === styles.arrowRight) {
      if (activeImage >= this.props.image.length - 1) {
        this.setState((state) => (state.activeImage = 0));
        return;
      }
      this.setState((state) => (state.activeImage += 1));
      return;
    }
    if (className === styles.arrowLeft) {
      if (activeImage <= 0) {
        this.setState((state) => (state.activeImage = this.props.image.length - 1));
        return;
      }
      this.setState((state) => (state.activeImage -= 1));
      return;
    }
  }

  render() {
    const currency = this.getCurrentAmount();
    const isManyImage = this.props.image.length > 1;
    return (
      <div className={styles.cartPage_item}>
        <div className={styles.info}>
          <h3>{this.props.brand}</h3>
          <h3 style={{ fontWeight: 400 }}>{this.props.name}</h3>
          <h3 style={{ fontSize: 24 }}>
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
        <div
          onClick={(e) => this.onHandleArrow(e)}
          className={[styles.image, isManyImage ? styles.imageActive : ''].join(' ')}>
          {this.props.image.map((item, i) => (
            <img
              src={item}
              className={i === this.state.activeImage ? styles.activeImg : styles.unActiveImg}
              key={item}
              alt="icon"
            />
          ))}
          <Arrow className={styles.arrowLeft} />
          <Arrow className={styles.arrowRight} />
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
export default connect(mapStateToProps, mapDispatchToProps)(CartPageItem);
