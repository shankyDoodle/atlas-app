import React from 'react';
import Panel from './Panel';
import {connect} from 'react-redux'
import * as actions from '../actions/index';

const Tooltip = require('@material-ui/core').Tooltip;


class App extends React.Component {

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  handleExpandIconClicked = (oEvent) => {
    oEvent.stopPropagation();
    this.props.togglePanelCollapse(false);
  };

  render() {
    let {oSortedData, isPanelCollapsed, sortColumn, sortOrder} = this.props;

    let sPanelExpanderVisibility = isPanelCollapsed ? "show" : "hide";
    return (
      <div className={"appContainer"}>
        <div className={"topDummyHeaderBar"}/>
        <div className={"bottomScreenContainer"}>
          <Panel data={oSortedData}
                 isPanelCollapsed={this.state.isPanelCollapsed}
                 sortColumn={sortColumn}
                 sortOrder={sortOrder}/>
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

const ConnectedApp = connect(mapStateToProps, actions)(App);
export default ConnectedApp
