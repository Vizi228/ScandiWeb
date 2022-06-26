import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../styles/Header.module.scss'
import {ReactComponent as Arrow} from '../../images/arrow.svg';
import { GET_CURRENCIES_DATA } from '../../query/categories';
import { graphql } from '@apollo/client/react/hoc';

export class Currency extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisibleCurrency: false,
        }
        this.onHadleVisible = this.onHadleVisible.bind(this);
        this.onHadleCurrency = this.onHadleCurrency.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.outsideClickRef = React.createRef();
    }

    
    onHadleVisible() {
        this.setState(state => {
           return {
            ...state,
            isVisibleCurrency: !state.isVisibleCurrency
           } 
        })
    }
    onHadleCurrency(label) {
        this.props.onChangeCurrency(label);
        this.onHadleVisible()
    }

    onClickOutside(e) {
      if((e.target !== this.outsideClickRef.current) && this.state.isVisibleCurrency) {
        this.setState(state => {
          return {
           ...state,
           isVisibleCurrency: false,
          } 
       })
      }
    }

    
    componentDidMount() {
      document.addEventListener('click', this.onClickOutside)
    }
  render() {
    if(this.props.data.loading) {
        return
    }
    return (
      <div onClick={(e) => this.onClickOutside(e)} className={styles.currency_wrapper}>
        <span ref={this.outsideClickRef}  onClick={this.onHadleVisible} className={styles.currency_button}>
            {this.props.data?.currencies.find(item => item.label === this.props.activeCurrency).symbol}
            <Arrow className={this.state.isVisibleCurrency ? styles.currency_icon : ''}/>
        </span>
        <div className={[styles.currency, this.state.isVisibleCurrency ? styles.currency_active : ''].join(' ')}>
            {this.props.data.currencies?.map(item => (
                <span onClick={() => this.onHadleCurrency(item.label)} key={item.symbol}>{item.symbol} {item.label}</span>
            ))}
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      activeCurrency: state.clothesReducer.activeCurrency
    }
  }
      const mapDispatchToProps = (dispatch) => {
        return {
          onChangeCurrency: (id) => dispatch({ type: 'SET_ACTIVE_CURRENCY', payload: id }),
        }
      }
export default connect(mapStateToProps, mapDispatchToProps)(graphql(GET_CURRENCIES_DATA)(Currency))