import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

class EditItems extends Component {
  constructor(props) {
    super(props)
    this.renderItems = this._renderItems.bind(this);
    this.onDragStart = this._onDragStart.bind(this);
    this.onDrag = this._onDrag.bind(this);
    this.onDragStop = this._onDragStop.bind(this);
    this.onResizeStart = this._onResizeStart.bind(this);
    this.onResize = this._onResize.bind(this);
    this.onResizeStop = this._onResizeStop.bind(this);

    this.rndRefs = {};
    this.rndDelayTimeout = undefined;

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
    this.onMouseoverResizeHandler('remove');
  }
  componentDidUpdate(prevProp, prevState) {
    let { layoutSetting } = this.props;
    if (layoutSetting.items !== prevProp.layoutSetting.items) {
      this.setState({ 
        isLoading: false,
        items: layoutSetting.items
      }, () => this.onMouseoverResizeHandler('add'))
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
    let { space, maxWidth, maxcolumn, maxHeight, maxrow, isDragging } = this.state;
    
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
      <BrickContainer key={item.id} isDragging={isDragging} zIndex={item.zIndex}>
        <Rnd
          ref={el => this.rndRefs[item.id] = el}
          className="item-brick"
          default={{
            x: left,
            y: top,
            width: width,
            height: height
          }}
          minWidth={_width}
          minHeight={_height}
          onDragStart={(event, data) => this.onDragStart(event, data, item)}
          onDrag={(event, data) => this.onDrag(event, data, item)}
          onDragStop={(event, data) => this.onDragStop(event, data, item)}
          onResizeStart={(event, dir, ref, delta) => this.onResizeStart(event, dir, ref, item)}
          onResize={(event, dir, ref, delta) => this.onResize(event, dir, ref, delta, item)}
          onResizeStop={(event, dir, ref, delta) => this.onResizeStop(event, dir, ref, delta, item)}
          resizeHandleStyles={resizeHandleStyles}
          resizeHandleClasses={resizeHandleClasses}
        >
          <BrickWrapper padding={space}>
            <Brick imgUrl={imgUrl} />   
          </BrickWrapper>
        </Rnd>
      </BrickContainer>
    );
  }

  _onDragStart(event, data, item) {
    let { items } = this.state;
    for(let i = 0; i < items.length; i++) {
      if(items[i].id === item.id) items[i].zIndex = 2000;
    }
    this.setState({ items })
  }

  _onDrag(event, data, item) {
    let { items, isDragging, maxWidth, maxHeight, maxcolumn, maxrow } = this.state;
    if(!isDragging) this.setState({ isDragging: true });

    clearTimeout(this.rndDelayTimeout);
    this.rndDelayTimeout = setTimeout(() => {
      let _width = maxWidth / maxcolumn,
        _height = maxHeight / maxrow,
        width = _width * item.sizeX,
        height = _height * item.sizeY,
        column = Math.round(data.x / _width),
        row = Math.round(data.y / _height),
        top = row * _height,
        left = column * _width,
        isDraggingItem = {
          row: row,
          column: column,
          sizeX: item.sizeX,
          sizeY: item.sizeY
        },
        isOccupy = false;
        for(let i = 0; i < items.length; i++) {
          if(item.id === items[i].id) {

          }
        }
        this.setState({  })
    }, 100);
  }

  _onDragStop(event, data, item) {
    let { items, maxWidth, maxHeight, maxcolumn, maxrow } = this.state;
    let ref = this.rndRefs[item.id];
    let _width = maxWidth / maxcolumn,
      _height = maxHeight / maxrow,
      width = _width * item.sizeX,
      height = _height * item.sizeY,
      column = Math.round(data.x / _width),
      row = Math.round(data.y / _height),
      top = row * _height,
      left = column * _width,
      isDraggingItem = {
        row: row,
        column: column,
        sizeX: item.sizeX,
        sizeY: item.sizeY
      },
      isOccupy = false;

    if(row < 0 || column < 0 || row + item.sizeY > maxrow || column + item.sizeX > maxcolumn) {
      ref.updatePosition({
        x: item.column * _width,
        y: item.row * _height
      });
    }else {
      for (let i = 0; i < items.length; i++) {
        if (item.id === items[i].id) {
          items[i].row = row;
          items[i].column = column;
          items[i].zIndex = 2;
        }
      }
      ref.updatePosition({ x: left, y: top });
    }

    this.setState({ items, isDragging: false })
  }

  _onResizeStart(event, dir, ref, item) {
    let { items } = this.state;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === item.id) items[i].zIndex = 2000;
    }
    this.setState({ items })
  }

  _onResize(event, dir, ref, delta, item) {
    let { items, isResizing, maxWidth, maxHeight, maxcolumn, maxrow } = this.state;
    if (!isResizing) this.setState({ isResizing: true });

    clearTimeout(this.rndDelayTimeout);
    this.rndDelayTimeout = setTimeout(() => {
      let _width = maxWidth / maxcolumn,
        _height = maxHeight / maxrow,
        sizeX = item.sizeX,
        sizeY = item.sizeY,
        width = sizeX * _width,
        height = sizeY * _height,
        column = item.column,
        row = item.row,
        top = row * _height,
        left = column * _width,
        isResizingItem = {
          row: row,
          column: column,
          sizeX: item.sizeX,
          sizeY: item.sizeY
        },
        isOccupy = false;

      if (dir === 'topLeft' || dir === 'top' || dir === 'topRight') {
        top -= delta.height;
        height += delta.height;

      } else if (dir === 'bottomLeft' || dir === 'bottom' || dir === 'bottomRight') {
        height += delta.height;

      } else if (dir === 'topLeft' || dir === 'left' || dir === 'bottomLeft') {
        left -= delta.width;
        width += delta.width;

      } else if (dir === 'bottomRight' || dir === 'right' || dir === 'topRight') {
        width += delta.width;
      }
        
    }, 100)
  }

  _onResizeStop(event, dir, ref, delta, item) {

  }

  onMouseoverResizeHandler(type) {
    let handles = document.getElementsByClassName('handle');

    if(handles && handles.length > 0) {
      for(let i = 0; i < handles.length; i++){
        if(type === 'add') {
          handles[i].addEventListener('mouseover', event => this.handlesEventListenerIn(event));
          handles[i].addEventListener('mouseout', event => this.handlesEventListenerOut(event));
        }else {
          handles[i].removeEventListener('mouseover', event => this.handlesEventListenerIn(event));
          handles[i].removeEventListener('mouseout', event => this.handlesEventListenerOut(event));
        }
      }
    }
  }

  handlesEventListenerIn(event) {
    let brick = event.currentTarget.parentElement,
      handleNodes = brick.children;
    for (let i = 0; i < handleNodes.length; i++) {
      if (handleNodes[i].classList.contains('handle')) {
        handleNodes[i].style.opacity = 1;
      }
    }
  }

  handlesEventListenerOut(event) {
    let brick = event.currentTarget.parentElement,
      handleNodes = brick.children;
    for (let i = 0; i < handleNodes.length; i++) {
      if (handleNodes[i].classList.contains('handle')) {
        handleNodes[i].style.opacity = 0;
      }
    }
  }
}


const resizeHandleStyles = {
  bottom: { 
    bottom: 0,
    background: 'linear-gradient(90deg, transparent 30%, #fff 30%)',
    backgroundSize: '30px 100%'
  },
  top: { 
    top: 0,
    background: 'linear-gradient(90deg, transparent 30%, #fff 30%)',
    backgroundSize: '30px 100%'
  },
  left: { 
    left: 0,
    background: 'linear-gradient(transparent 30%, #fff 30%)',
    backgroundSize: '100% 30px'
  },
  right: {
    right: 0,
    background: 'linear-gradient(transparent 30%, #fff 30%)',
    backgroundSize: '100% 30px'
  },
  bottomLeft: { left: 0, bottom: 0 },
  bottomRight: { right: 0, bottom: 0 },
  topLeft: { left: 0, top: 0 },
  topRight: { right: 0, top: 0 }
}

const resizeHandleClasses = {
  bottom: 'handle handle-bottom',
  bottomLeft: 'handle handle-bottom-left',
  botttomRight: 'handle handle-bottom-right',
  left: 'handle handle-left',
  right: 'handle handle-right',
  top: 'handle handle-top',
  topLeft: 'handle handle-top-left',
  topRight: 'handle handle-top-right'
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

const BrickWrapper = styled.div`
  position: absolute;
	width: 100%;
	height: 100%;
  padding: ${props => props.padding ? props.padding / 2 + 'px' : 0};
`;

const BrickContainer = styled.div`
  position: absolute;
  z-index: ${props => props.zIndex ? props.zIndex : 2};
  .item-brick:hover ${Brick}{
    box-shadow: ${props => props.isDragging ? '0 8px 20px 0 rgba(0,0,0,.5)' : '0 0 20px 0 rgba(0,0,0,.5)'};
  }

  .handle{
    opacity: 0;
    transition: .25s;
  }
`;


export default EditItems