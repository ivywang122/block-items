import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

class EditItems extends Component {
  constructor(props) {
    super(props)
    this.renderItems = this._renderItems.bind(this);

    this.state = {
      maxWidth: this.props.layoutSetting.maxWidth,
      maxHeight: this.props.layoutSetting.maxHeight,
      maxrow: this.props.layoutSetting.maxrow,
      maxcolumn: this.props.layoutSetting.maxcolumn,
      space: this.props.layoutSetting.space,
      items: this.props.layoutSetting.items
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  componentDidUpdate(prevProp, prevState) {
    let { layoutSetting } = this.props;
    if (this.props.layoutSetting !== prevProp.layoutSetting) {
      this.setState({
        maxWidth: layoutSetting.maxWidth,
        maxHeight: layoutSetting.maxHeight,
        maxrow: layoutSetting.maxrow,
        maxcolumn: layoutSetting.maxcolumn,
        space: layoutSetting.space,
        items: layoutSetting.items
      });
    }
  }

  render() {
    const { items } = this.state;
    return(
      <div>
        {items && items.length > 0 ?
          items.map((item, index) => {
            return this.renderItems(item, index);
          })
          :
          null
        }
      </div>
    );
  }

  _renderItems(item, index) {
    let { space, maxWidth, maxcolumn, maxHeight, maxrow } = this.state;
    
    let _width = maxWidth / maxcolumn,
      _height = maxHeight / maxrow,
      width = 0,
      height = 0,
      top = 0,
      left = 0,
      imgUrl = item.imgUrl;

    top = _height * item.row;
    left = _width * item.column;
    width = _width * item.sizeX;
    height = _height * item.sizeY;
    
    return (
      <BrickContainer key={item.id}>
        <Rnd
          className="item-brick"
          default={{
            x: left,
            y: top,
            width: width,
            height: height
          }}
        >
          <BrickWrapper padding={space}>
            <Brick imgUrl={imgUrl} />
          </BrickWrapper>
        </Rnd>
      </BrickContainer>
    );
  }
}

const BrickContainer = styled.div`
  position: absolute;
  z-index: 2;

`;
const BrickWrapper = styled.div`
  position: absolute;
	width: 100%;
	height: 100%;
  padding: ${props => props.padding ? props.padding / 2 +'px' : 0 };
`;
const Brick = styled.div`
  position: relative;
  height: 100%;
	width: 100%;
  background-color: #EEE;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image: url(${props => props.imgUrl ? props.imgUrl : null});
`;
export default EditItems