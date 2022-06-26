import React, { Component } from 'react'
import { graphql, withApollo } from '@apollo/client/react/hoc';
import { GET_PRODUCT } from '../query/product';
import styles from '../styles/Product.module.scss'
import { connect } from 'react-redux';

export class Product extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeImage: 0,
            product: {},
            isLoading: true,
        }

        this.runQuery = this.runQuery.bind(this);
        this.getDescription = this.getDescription.bind(this);
    }

    async runQuery() {
        const res = await this.props.client.query({
          query: GET_PRODUCT(window.location.pathname.split('/')[2]),
        })
        this.setState(state => {
            return {
                ...state,
                product: res.data.product,
                isLoading: res.loading,
            }
        }); 
        return res
      }


    getDescription() {
        let tempNode = document.createElement('div');
        tempNode.innerHTML = this.state.product.description;
        return tempNode.innerText
    }

    componentDidMount() {
        this.runQuery()
    }

    render() {
        if(this.state.isLoading) {
            return
        }
        console.log(this.state.product)
        return (
            <div className={styles.wrapper}>
                <div className={styles.images}>
                    {
                    this.state.product?.gallery?.map(item => (
                        <img key={item} style={{ width: 80 }} src={item} alt="item" />
                    ))
                    }
                </div>
                <div className={styles.mainImage}>
                    <img src={this.state.product?.gallery[this.state.activeImage]} alt="" />
                </div>
                <div className={styles.description}>
                    <h1>
                        {this.state.product.name}
                    </h1>
                    <p>{this.getDescription()}</p>
                    {
                        this.state.product.attributes.length > 0 ? 
                            <div className={styles.attributes}>
                                <h3>{this.state?.product?.attributes[0]?.name}:</h3>
                                {this.state.product?.attributes[0]?.items.map(item => (
                                    <div key={item.id} >{item.displayValue}</div>
                                ))}
                            </div> :
                        ''
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      activeCategory: state.clothesReducer.activeCategory,
      activeCurrency: state.clothesReducer.activeCurrency,
    }
}
  const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Product))