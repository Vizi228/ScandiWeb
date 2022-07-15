export function getCurrentAmount() {
    if (this.props.prices) {
        return this.props.prices.find(item => item.currency.label === this.props.activeCurrency)
    }
    if (this.state.product) {
        return this.state.product.prices.find(item => item.currency.label === this.props.activeCurrency)
    }
    
}

export function getCartCount() {
    const count = this.props.cartItems.reduce((prev,next) => prev + next.count , 0);
    return count
}

export function getCartTotal() {
    const total = this.props.cartItems
    .map(item => item.prices?.find(item => item.currency.label === this.props.activeCurrency).amount * item.count)
    .reduce((prev,next) => prev + next , 0);
    return String(total).split('.')[0]
}

export function onAddtoCart() {
    let compareItem
    let object
    if(this.props.product) {
      const activeAttribute = this.props.attributes.map(() => 0)
      compareItem = this.props.cartItems.find(item => 
        item.name === this.props.product.name &&
        item.activeAttribute.every((item, i) => item === activeAttribute[i])
      )
      object = {
        brand: this.props.product.brand,
        name: this.props.product.name,
        image: this.props.product?.gallery,
        attributes: this.props.product.attributes,
        activeAttribute: activeAttribute,
        prices: this.props.product.prices,
        count: 1,
      };
    }
    if(this.state?.product) {
      if(!this.state?.product.inStock) {
        alert('Product out of stock')
        return
      }
      compareItem = this.props.cartItems.find(item => 
        item.name === this.state.product.name &&
        item.activeAttribute.every((item, i) => item === this.state.activeAttribute[i])
      )
       object = {
        brand: this.state.product.brand,
        name: this.state.product.name,
        image: this.state.product?.gallery,
        attributes: this.state.product.attributes,
        prices: this.state.product.prices,
        activeAttribute: this.state.activeAttribute || [],
        count: 1,
      };
    }
    console.log(compareItem)
    if (compareItem) {
      this.props.incrementToCart(compareItem);
    } else {
      this.props.addToCart(object);
    }
  }


  export const getReducerItem = (state, action, value) => {
    const currentItem = state.items.map(item => {
      const compareValues = item.name === action.payload.name && item.activeAttribute === action.payload.activeAttribute
      if(compareValues) {
          return {
              ...item,
              count: item.count + value
          }
      } else {
          return item
      }
  })
  return currentItem.filter(item => item.count > 0)
  }