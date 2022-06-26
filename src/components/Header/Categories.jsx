import React, { Component } from 'react'
import styles from '../../styles/Header.module.scss'
import { connect } from 'react-redux';
import { graphql } from '@apollo/client/react/hoc';
import { GET_CATEGORIES_DATA } from '../../query/categories';


export class Categories extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                {this.props.data.categories?.map((item, i) => (
                    <span 
                    onClick={() => this.props.onChangeCategory(item.name)} 
                    key={item.name} 
                    className={[styles.categories_item, item.name === this.props.activeCategory ? styles.active : ''].join(' ')}>
                        {item.name}
                    </span>
                ))}
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
        onChangeCategory: (payload) => dispatch({type: 'SET_ACTIVE_CATEGORY', payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(GET_CATEGORIES_DATA)(Categories))