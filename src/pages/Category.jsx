import { withApollo } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import { GET_DATA } from '../query/categories';
import styles from '../styles/Category.module.scss';

export class Category extends Component {
  constructor(props) {
    super(props);

    this.getCategoriesItems = this.getCategoriesItems.bind(this);
  }

  async getCategoriesItems(name) {
    try {
      const resData = await this.props.client.query({
        query: GET_DATA(name),
      });
      this.props.onHandleCategories(resData.data.category);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getCategoriesItems('all');
  }

  render() {
    const items = this.props.products;
    return (
      <>
        <h1 className={styles.name}>{items.name}</h1>
        <div className={styles.container}>
          {items.products?.map((item) => (
            <CategoryItem key={item.id} {...item} product={item} />
          ))}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.clothesReducer.items,
    activeCategory: state.clothesReducer.activeCategory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onHandleCategories: (payload) => dispatch({ type: 'SET_ITEMS', payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Category));
