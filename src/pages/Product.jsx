import React, { Component } from 'react';
import { withApollo } from '@apollo/client/react/hoc';
import { GET_PRODUCT } from '../query/product';
import styles from '../styles/Product.module.scss';
import { connect } from 'react-redux';
import { getCurrentAmount, onAddtoCart } from '../utils';
import Attribute from '../components/Attribute';
import { withRouter } from 'react-router-dom';
import { sanitize } from 'dompurify';

export class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeImage: 0,
      activeAttribute: [],
      product: {},
      isLoading: true,
    };

    this.runQuery = this.runQuery.bind(this);
    this.getCurrentAmount = getCurrentAmount.bind(this);
    this.onHandleImage = this.onHandleImage.bind(this);
    this.onHandleAttribute = this.onHandleAttribute.bind(this);
    this.onAddtoCart = onAddtoCart.bind(this);
  }

  async runQuery() {
    try {
      const res = await this.props.client.query({
        query: GET_PRODUCT(this.props.match.params.id),
      });
      const composeAttributes = res.data.product.attributes.map(() => 0);
      this.setState((state) => {
        return {
          ...state,
          product: res.data.product,
          isLoading: res.loading,
          activeAttribute: composeAttributes,
        };
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  onHandleAttribute(id, index) {
    this.setState((state) => {
      const changedAtrributes = state.activeAttribute.map((item, ind) =>
        ind === index ? id : item,
      );
      return {
        ...state,
        activeAttribute: changedAtrributes,
      };
    });
  }
  onHandleImage(id) {
    this.setState((state) => {
      return {
        ...state,
        activeImage: id,
      };
    });
  }

  componentDidMount() {
    this.runQuery();
  }
  render() {
    if (this.state.isLoading) {
      return;
    }
    const productData = this.state.product;
    const currentAmount = this.getCurrentAmount();
    return (
      <div className={styles.wrapper}>
        <div className={styles.images}>
          {this.state.product?.gallery?.map((item, i) => (
            <img
              onClick={() => this.onHandleImage(i)}
              key={item}
              style={{ width: 80 }}
              src={item}
              alt="item"
            />
          ))}
        </div>
        <div className={styles.mainImage}>
          <img src={productData?.gallery[this.state.activeImage]} alt="" />
        </div>
        <div className={styles.description}>
          <h1>{productData.brand}</h1>
          <h1 style={{ fontWeight: 400 }}>{productData.name}</h1>
          {this.state.product.attributes.length > 0 ? (
            <div className={styles.attributes_wrapper}>
              <div className={styles.attributes}>
                {productData?.attributes.map((item, i) => (
                  <Attribute
                    setAttribute={this.onHandleAttribute}
                    styles={styles}
                    index={i}
                    key={item.name}
                    name={item.name}
                    activeAttribute={this.state.activeAttribute[i]}
                    items={item.items}
                  />
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
          <div>
            <h3 className={styles.title}>Price:</h3>
            <h2>
              {currentAmount.currency.symbol} {currentAmount.amount}
            </h2>
          </div>
          <button className={styles.addButton} onClick={this.onAddtoCart}>
            Add to Cart
          </button>
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: sanitize(this.state.product.description) }}></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCategory: state.clothesReducer.activeCategory,
    cartItems: state.cartReducer.items,
    activeCurrency: state.clothesReducer.activeCurrency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch({ type: 'ON_ADD_TO_CART', payload }),
    incrementToCart: (payload) => dispatch({ type: 'ON_INCREMENT', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(withRouter(Product)));
