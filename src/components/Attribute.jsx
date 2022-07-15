import React, { Component } from 'react';

export class Attribute extends Component {
  render() {
    const onHandleAttribute = this.props.setAttribute;
    const active = this.props.activeAttribute;
    const isColor = this.props.name === 'Color';
    return (
      <div className={this.props.attribute_body}>
        <h3 className={this.props.styles.title}>{this.props.name}:</h3>
        <ul>
          {this.props.items?.map((item, i) => (
            <button
              style={{
                backgroundColor: isColor ? item.value : '',
                border: active === i && isColor ? '2px solid #5ECE7B' : '',
              }}
              disabled={!onHandleAttribute}
              onClick={() => onHandleAttribute(i, this.props.index)}
              className={active === i ? this.props.styles.active : ''}
              key={item.value}>
              {!isColor && item.value}
            </button>
          ))}
        </ul>
      </div>
    );
  }
}

export default Attribute;
