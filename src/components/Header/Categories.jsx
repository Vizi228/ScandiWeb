import React, { Component } from 'react';
import styles from '../../styles/Header.module.scss';
import { connect } from 'react-redux';
import { withApollo } from '@apollo/client/react/hoc';
import { GET_CATEGORIES_DATA, GET_DATA } from '../../query/categories';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true,
      categories: [],
    };
    this.getCategoriesItems = this.getCategoriesItems.bind(this);
    this.getMountItems = this.getMountItems.bind(this);
    this.onHandleCategory = this.onHandleCategory.bind(this);
  }

  async getCategoriesItems(name) {
    try {
      const resData = await this.props.client.query({
        query: GET_DATA(name),
      });
      this.props.onHandleCategories(resData.data.category);
      this.props.onChangeCategory(name);
    } catch (error) {
      console.log(error);
    }
  }

  async getMountItems() {
    try {
      const resData = await this.props.client.query({
        query: GET_DATA(this.props.activeCategory),
      });
      const resCategories = await this.props.client.query({
        query: GET_CATEGORIES_DATA,
      });
      this.setState((state) => {
        return {
          ...state,
          isLoading: resCategories.loading,
          categories: resCategories.data.categories,
        };
      });
      this.props.onHandleCategories(resData.data.category);
    } catch (error) {
      console.log(error);
    }
  }

  onHandleCategory(name) {
    this.getCategoriesItems(name);
  }

  componentDidMount() {
    this.getMountItems();
  }
  render() {
    if (this.state.isLoading) {
      return;
    }
    const categories = this.state.categories;
    return (
      <>
        {categories?.map((item, i) => (
          <span
            onClick={() => this.onHandleCategory(item.name)}
            key={item.name}
            className={[
              styles.categories_item,
              item.name === this.props.activeCategory ? styles.active : '',
            ].join(' ')}>
            {item.name}
          </span>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCategory: state.clothesReducer.activeCategory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCategory: (payload) => dispatch({ type: 'SET_ACTIVE_CATEGORY', payload }),
    onHandleCategories: (payload) => dispatch({ type: 'SET_ITEMS', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Categories));
