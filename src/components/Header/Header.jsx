import React, { Component } from 'react'
import styles from '../../styles/Header.module.scss'
import {ReactComponent as Logo} from '../../images/logo.svg';
import {ReactComponent as Cart} from '../../images/cart-icon.svg';
import Currency from './Currency';
import Categories from './Categories';


export class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.items_list}>
                    <Categories />
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.cart_menu}>
                    <Currency/>
                    <div className={styles.cart}>
                        <Cart/>
                    </div>
                </div>
            </div>
        )
    }
}


export default Header