import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import styles from '../styles/Category.module.scss';

export class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.products;
    return (
      <>
        <h1 style={{ textTransform: 'uppercase' }}>{items.name}</h1>
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
export default connect(mapStateToProps)(Category);
