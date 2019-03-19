import React, { Component } from 'react';
import './scss/styles.scss';
import EditEmptyItems from './components/EditEmptyItems';
import EditItems from './components/EditItems';
import dataItems from './data/dataItems'
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);
    this.buildEmptyItems = this._buildEmptyItems.bind(this);
    this.getItems = this._getItems.bind(this);
 
    this.state = {
      maxWidth: 1080,
      maxHeight: 540,
      maxrow: 3,
      maxcolumn: 6,
      space: 10,
      items: [],
      emptyItems: []
    }

  }
  componentDidMount() {
    this.buildEmptyItems();
  }
  render() {
    const { maxWidth, maxHeight, maxrow, maxcolumn, space, items, emptyItems } = this.state;
    const layoutSetting = {
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      maxrow: maxrow,
      maxcolumn: maxcolumn,
      space: space,
    };
    const emptyItemsLayoutSetting = { ...layoutSetting, emptyItems: emptyItems };
    const itemsLayoutSetting = { ...layoutSetting, items: items }
    return (
      <AppContainer>
        <BlockContainer>
          <EditEmptyItems layoutSetting={emptyItemsLayoutSetting} />
          <EditItems layoutSetting={itemsLayoutSetting} />
        </BlockContainer>
      </AppContainer>
    );
  }

  _buildEmptyItems() {
    let emptyItems = [];
    let { maxrow, maxcolumn } = this.state;
    for (let row = 0; row < maxrow; row++) {
      for (let col = 0; col < maxcolumn; col++) {
        let emptyItem = {
          key: row + '-' + col,
          row: row,
          column: col,
          sizeX: 1,
          sizeY: 1
        };
        emptyItems = [...emptyItems, emptyItem];
      }
    }
    this.setState({ emptyItems }, () => setTimeout(() => this.getItems(), 300) );
  }

  _getItems() {
    let items = [];
    items = JSON.parse(JSON.stringify(dataItems));
    this.setState({ items });
  }


}


const AppContainer = styled.div`
  padding: 40px 0;
`;

const BlockContainer = styled.div`
  margin: auto;
  width: 1080px;
  height: 540px;
  position: relative;
`;




export default App;
