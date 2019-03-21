import * as actions from "../actions";
import connect from "react-redux/es/connect/connect";

const React = require('react');
const Tooltip = require('@material-ui/core').Tooltip;

// const ListNode = require("./ListNode");

class Panel extends React.Component {

  handleCollapseIconClicked= (oEvent) => {
    oEvent.stopPropagation();
    this.props.togglePanelCollapse(true);
  };

  getPanelHeaderDOM() {
    let oData = this.props.data;
    return (
      <div className={"panelHeaderWrapper"}>
        <div className={"panelHeader"}>List of Communities</div>
        <div className={"communityCount"}>{oData.communities.length || 0}</div>
        <div className={"orgNameWrapper"}>
          <span className={"orgName"}>Communities</span> in <span className={"orgName"}>{oData.name}</span>
        </div>
        <Tooltip title={"Collapse"}>
          <div className={"expandCollapseIcon doCollapse"} onClick={this.handleCollapseIconClicked}/>
        </Tooltip>
      </div>
    );
  }

  /*getAllListNodesDOM() {
    let aCommunities = this.props.data.communities || [];
    let aListNodesDom = [];
    aCommunities.forEach((oCom, iIndex) => {
      aListNodesDom.push(<ListNode name={oCom.name} cases={oCom.cases} key={iIndex}/>);
    });

    return (
      <div className={"listNodesWrapper"}>
        {aListNodesDom}
      </div>
    );
  }*/

  handleSortOrderChanged(sColName, oEvent) {
    oEvent.stopPropagation();
    let sCurrentSortOrder = this.props.sortOrder;
    this.props.toggleSortOrder(sColName, sCurrentSortOrder);
  }

  getListContainerDOM() {
    let sCurrentSortColumn = this.props.sortColumn;
    let sCurrentSortOrder = this.props.sortOrder;

    let sNameSortOrder = sCurrentSortColumn === "name" ? sCurrentSortOrder + " active" : "desc";
    let sCasesSortOrder = sCurrentSortColumn === "cases" ? sCurrentSortOrder + " active" : "desc";

    return (
      <div className={"listNodesContainer"}>
        <div className={"listTableHeaderRow"}>
          <div className={"lhName listCell"}>
            <span className={"lhCol"}>Name</span>
            <Tooltip title={"Toggle Sort Order"}>
              <div className={"sortIcon nameSort " + sNameSortOrder}
                   onClick={this.handleSortOrderChanged.bind(this, "name")}/>
            </Tooltip>
          </div>
          <div className={"lhCases listCell"}>
            <span className={"lhCol"}>Number Of Cases</span>
            <Tooltip title={"Toggle Sort Order"}>
              <div className={"sortIcon casesSort " + sCasesSortOrder}
                   onClick={this.handleSortOrderChanged.bind(this, "cases")}/>
            </Tooltip>
          </div>
        </div>
        {/*{this.getAllListNodesDOM()}*/}
      </div>
    );

  }

  render() {
    let oHeaderDOM = this.getPanelHeaderDOM();
    let oListContainer = this.getListContainerDOM();

    let sCollapseExpand = this.props.isPanelCollapsed ? "collapsed" : "expanded";
    return (
      <div className={"panelContainer " + sCollapseExpand}>
        {oHeaderDOM}
        {oListContainer}
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return state;
}

const ConnectedPanel = connect(mapStateToProps, actions)(Panel);
export default ConnectedPanel;