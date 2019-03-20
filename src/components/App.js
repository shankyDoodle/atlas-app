import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/index';
const Tooltip = require('@material-ui/core').Tooltip;


class App extends React.Component {

  constructor(props) {
    super(props);

    let {oSortedData, isPanelCollapsed, sortColumn, sortOrder} = this.props;
    this.state = {
      data: oSortedData,
      isPanelCollapsed: isPanelCollapsed,
      sortColumn: sortColumn,
      sortOrder : sortOrder
    };

    this.updatePanelCollapseState = this.updatePanelCollapseState.bind(this);
    this.updateDataState = this.updateDataState.bind(this);
    this.handleExpandIconClicked = this.handleExpandIconClicked.bind(this);
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  updatePanelCollapseState() {
    let oStore = this.props.store;
    this.setState({
      isPanelCollapsed: oStore.getIsPanelCollapsed()
    });
  }

  updateDataState() {
    let oStore = this.props.store;
    this.setState({
      data: oStore.getSortedData(),
      sortColumn: oStore.getSortColumn(),
      sortOrder: oStore.getSortOrder()
    });
  }

  handleExpandIconClicked() {
    this.props.store.handleExpandIconClicked();
    this.updatePanelCollapseState();
  }

  render() {
    let {oSortedData, isPanelCollapsed, sortColumn, sortOrder} = this.props;
    let data = oSortedData;

    let sPanelExpanderVisibility = isPanelCollapsed ? "show" : "hide";
    return (
      <div className={"appContainer"}>
        <div className={"topDummyHeaderBar"}/>
        <div className={"bottomScreenContainer"}>
          <Panel data={this.state.data}
                 isPanelCollapsed={this.state.isPanelCollapsed}
                 sortColumn={this.state.sortColumn}
                 sortOrder={this.state.sortOrder}
                 fUpdatePanelCollapseState={this.updatePanelCollapseState}
                 fUpdateDataState={this.updateDataState}
                 store={this.props.store}/>
          <div className={"panelExpander " + sPanelExpanderVisibility}>
            <Tooltip title={"Expand"}>
              <div className={"expandCollapseIcon doExpand"} onClick={this.handleExpandIconClicked}/>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

}
function mapStateToProps(state, ownProps) {
  return state;
}

const ConnectedApp = connect(mapStateToProps, actions)(App)
export default ConnectedApp
