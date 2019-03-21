import connect from "react-redux/es/connect/connect";

const React = require('react');
const PropTypes = require('prop-types');
const Tooltip = require('@material-ui/core').Tooltip;

class ListNode extends React.Component {

  render() {
    return (
      <div className={"listNodeContainer"}>
        <div className={"listName listCell"}>
          <Tooltip title={this.props.name} enterDelay={500}>
            <div className={"actualCell"}>{this.props.name}</div>
          </Tooltip>
        </div>
        <div className={"listCases listCell"}>{this.props.cases}</div>
      </div>
    );
  }

}

ListNode.propTypes = {
  name: PropTypes.string,
  cases: PropTypes.number
};

function mapStateToProps(state) {
  return state;
}
const ConnectedListNode = connect(mapStateToProps)(ListNode);
export default ConnectedListNode;