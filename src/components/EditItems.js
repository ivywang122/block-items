import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

class EditItems extends Component {
  constructor(props) {
    super(props)
    this.renderItems = this._renderItems.bind(this);

    this.state = {
      isLoading: false,
      
      maxWidth: this.props.layoutSetting.maxWidth,
      maxHeight: this.props.layoutSetting.maxHeight,
      maxrow: this.props.layoutSetting.maxrow,
      maxcolumn: this.props.layoutSetting.maxcolumn,
      space: this.props.layoutSetting.space,

      items: this.props.layoutSetting.items,

      isDragging: false,
      isResizing: false,

      helperX: 0,
      helperY: 0,
      helperWidth: 0,
      helperHeight: 0,
      isHelperOver: false,
      isOccupy: false, 
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true });
  }
  componentWillUnmount() {
  }
  componentDidUpdate(prevProp, prevState) {
    let { layoutSetting } = this.props;
    if (layoutSetting.items !== prevProp.layoutSetting.items) {
      this.setState({ 
        isLoading: false,
        items: layoutSetting.items
      })
    }
  }

  render() {
    const { isLoading, items } = this.state;
    if (isLoading) {
      return (
        <LoadingConatiner>Loading...</LoadingConatiner>
      );
    }else {
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
          z={2}
          minWidth={_width}
          minHeight={_height}
        >
          <BrickWrapper padding={space}>
            <Brick imgUrl={imgUrl} />   
          </BrickWrapper>
        </Rnd>
      </BrickContainer>
    );
  
    
  }
}

const LoadingConatiner = styled.div`
  position: relative;
  z-index: 20;
  width: 1080px;
  height: 540px;
  text-align: center;
  line-height: 540px;
  font-size: 120px;
  color: #fefefe;
  background-color: rgba(0,0,0,0.2);
`;

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