import React, { Component } from 'react'
class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  componentDidUpdate(prevProp, prevState) {
  }
  shouldComponentUpdate(newProps, newState) {
    return this.state !== newState
  }
  render() {
    return(
      <div>Content</div>
    );
  }
}
export default MyComponent