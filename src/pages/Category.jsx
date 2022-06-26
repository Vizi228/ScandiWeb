import React, { Component } from 'react'
import { connect } from 'react-redux';
import { graphql } from '@apollo/client/react/hoc';
import { GET_DATA } from '../query/categories';
import CategoryItem from '../components/CategoryItem';
import styles from '../styles/Category.module.scss'

export class Category extends Component {

    constructor(props) {
        super(props)
        this.getCurrentCategory = this.getCurrentCategory.bind(this)
    }

    getCurrentCategory() {
        return this.props.data.categories?.find(item => item.name === this.props.activeCategory)
    }

    render() {
        if(this.props.data.loading){
            return 
        }
        return (
            <>
            <h1 style={{textTransform: 'uppercase'}}>
                {this.getCurrentCategory().name}
            </h1>
            <div className={styles.container}>
                {
                   this.getCurrentCategory().products
                    ?.map(item => (
                        <CategoryItem key={item.id} {...item} />
                    ))
                }
            </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      activeCategory: state.clothesReducer.activeCategory
    }
}
  const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(GET_DATA)(Category))