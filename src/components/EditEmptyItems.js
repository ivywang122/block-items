import React, { Component } from 'react';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';

class EditEmptyItems extends Component {
  constructor(props) {
    super(props);
    this.renderEmptyItems = this._renderEmptyItems.bind(this);

    this.state = {
      maxWidth: this.props.layoutSetting.maxWidth,
      maxHeight: this.props.layoutSetting.maxHeight,
      maxrow: this.props.layoutSetting.maxrow,
      maxcolumn: this.props.layoutSetting.maxcolumn,
      space: this.props.layoutSetting.space,
      emptyItems: this.props.layoutSetting.emptyItems
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
        emptyItems: layoutSetting.emptyItems
      });
    }
  }

  render() {
    const { emptyItems } = this.state;
    return(
      <div>
        { emptyItems && emptyItems.length > 0 ?
          emptyItems.map((item, index) => {
            return this.renderEmptyItems(item, index);
          })
          :
          null
        }
      </div>
 
    );
  }
  _renderEmptyItems(item, index) {
    let { space, maxWidth, maxcolumn, maxHeight, maxrow } = this.state;
    let _width = maxWidth / maxcolumn,
      _height = maxHeight / maxrow,
      width = 0,
      height = 0,
      top = 0,
      left = 0;

    top = _height * item.row;
    left = _width * item.column;
    width = _width * item.sizeX;
    height = _height * item.sizeY;

    return (
      <BlockWrapper key={item.key} top={top} left={left} width={width} height={height} padding={space / 2}>
        <div className="empty-block">
          <div className="empty-icon-wrapper">
            <MdEdit className="fa-icon" />
            <div>Edit</div>
          </div>
        </div>
      </BlockWrapper>

    );
  }
}

const colorSet = {
  gray: '#c3c8d2',
  deepGray: '#737d91',
}

const BlockWrapper = styled.div`
  position: absolute;
	top: ${props => props.top ? props.top + 'px' : '0px'};
  left: ${props => props.left ? props.left + 'px' : '0px'};
  width: ${props => props.width ? props.width + 'px' : 'auto'};
  height: ${props => props.height ? props.height + 'px' : 'auto'};
  padding: ${props => props.padding ? props.padding + 'px' : '0px'};
  box-sizing: border-box;
  padding: 5px;
  z-index: 1;
  .empty-block{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
		width: 100%;
    height: 100%;
    border: 2px dashed ${colorSet.gray};
    cursor: pointer;
    &:hover{
      background-color: rgba(0,0,0,.05);
      .empty-icon-wrapper{
        opacity: 1;
      }
    }
    .empty-icon-wrapper{
      text-align: center;
      opacity: 0;
      color: ${colorSet.deepGray};
      .fa-icon{
        font-size: 22px;
      }
    }
  }
`;

export default EditEmptyItems