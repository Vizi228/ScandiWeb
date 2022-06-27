export function getDescription() {
    let tempNode = document.createElement('div');
    tempNode.innerHTML = this.state.product.description;
    return tempNode.innerText
}

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
    const compareItem = this.props.cartItems.find(item => 
      item.name === this.state.product.name &&
      item.activeAttribute === this.state.activeAttribute
    )
    const object = {
      brand: this.state.product.brand,
      name: this.state.product.name,
      image: this.state.product?.gallery[0],
      attributes: this.state.product.attributes,
      prices: this.state.product.prices,
      activeAttribute: this.state.activeAttribute,
      count: 1,
    };
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