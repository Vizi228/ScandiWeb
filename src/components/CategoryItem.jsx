import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../styles/Category.module.scss'

export class CategoryItem extends Component {

  constructor(props) {
    super(props)
    this.getCurrentAmount = this.getCurrentAmount.bind(this)
  }

  getCurrentAmount() {
    return this.props.prices.find(item => item.currency.label === this.props.activeCurrency)
  }

  render() {
    return (
        <div className={[styles.categoryItem, this.props.inStock ? styles.outHover : ''].join(' ')}>
            {
              this.props.inStock ? '' : 
              <div className={styles.wrapper}>
                <div className={styles.outOfStock}>
                </div>
                <p className={styles.outStockTitle}>Out of stock</p>
              </div>
            }
            <Link to={`/Product/${this.props.id}`}>
              <img src={this.props.gallery[0]} alt="" />
              <p>{this.props.name}</p>
              <p className={styles.price}>{this.getCurrentAmount().currency.symbol}{this.getCurrentAmount().amount}</p>
            </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      activeCurrency: state.clothesReducer.activeCurrency
    }
}

export default connect(mapStateToProps)(CategoryItem)