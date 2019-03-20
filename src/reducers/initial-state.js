let OriginalData = require("../constants/data");

export default function getInitialState() {
  return {
    oSortedData: OriginalData,
    isPanelCollapsed: false,
    isDataChanged: false,
    sortColumn: "", // or name or cases
    sortOrder: "" // or asc or desc
  }
}