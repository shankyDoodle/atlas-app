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
    let {
      paginatedData,
      name,
      totalCount,
      size,
      isPanelCollapsed,
      sortColumn,
      sortOrder
    } = this.props;

    let sPanelExpanderVisibility = isPanelCollapsed ? "show" : "hide";
    return (
      <div className={"appContainer"}>
        <div className={"topDummyHeaderBar"}/>
        <div className={"bottomScreenContainer"}>
          <Panel paginatedData={paginatedData}
                 isPanelCollapsed={isPanelCollapsed}
                 name={name}
                 totalCount={totalCount}
                 size={size}
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

function mapStateToProps(state) {
  return state;
}

const ConnectedApp = connect(mapStateToProps, actions)(App);
export default ConnectedApp
