import * as actions from "../actions";
import connect from "react-redux/es/connect/connect";

import ListNode from "./ListNode";

import React from 'react'
import PropTypes from 'prop-types';
import {Tooltip} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';


class Panel extends React.Component {
  constructor(props) {
    super(props);

    let oProps = this.props;
    this.state = {
      communities: oProps.paginatedData,
      city: oProps.city,
      totalCount: oProps.totalCount,
      from: oProps.from
    }
  }

  componentWillReceiveProps(oNewProps, oNewState) {
    console.log("jshgfjsdhgfjs");
    if (oNewProps.from === 0) {
      this.setState({
        communities: oNewProps.paginatedData,
        from: oNewProps.from
      })
    } else if (oNewProps.from !== this.state.from) {
      this.setState({
        communities: this.state.communities.concat(oNewProps.paginatedData),
        from: oNewProps.from
      })
    }
  }

  handleLoadMoreItems = () => {
    this.props.handleLoadMore();
  };

  handleCollapseIconClicked = (oEvent) => {
    oEvent.stopPropagation();
    this.props.togglePanelCollapse(true);
  };

  getPanelHeaderDOM() {
    return (
      <div className={"panelHeaderWrapper"}>
        <div className={"panelHeader"}>List of Communities</div>
        <div className={"communityCount"}>{this.state.totalCount || 0}</div>
        <div className={"orgNameWrapper"}>
          <span className={"orgName"}>Communities</span> in <span className={"orgName"}>{this.state.city}</span>
        </div>
        <Tooltip title={"Collapse"}>
          <div className={"expandCollapseIcon doCollapse"} onClick={this.handleCollapseIconClicked}/>
        </Tooltip>
      </div>
    );
  }

  getAllListNodesDOM() {
    let aCommunities = this.state.communities || [];
    let aListNodesDom = aCommunities.map((oCom, iIndex) => {
      return (<ListNode name={oCom.name} cases={oCom.cases} key={iIndex} myKey={iIndex}/>);
    });

    let oLoaderDOM = <div className="loader" key={0}>Loading ...</div>;

    let bHasMore = this.state.from + this.props.size < this.state.totalCount;

    return (
      <div className={"listNodesWrapper"}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleLoadMoreItems}
          hasMore={bHasMore}
          loader={oLoaderDOM}
          useWindow={false}
          key={Math.random()}
          initialLoad={true}
        >
          {aListNodesDom}
        </InfiniteScroll>
      </div>
    );
  }

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
        {this.getAllListNodesDOM()}
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

Panel.propTypes = {
  data: PropTypes.object,
  isPanelCollapsed: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortOrder: PropTypes.string,
};

function mapStateToProps(state) {
  return state;
}

const ConnectedPanel = connect(mapStateToProps, actions)(Panel);
export default ConnectedPanel;