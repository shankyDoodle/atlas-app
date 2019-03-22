let OriginalData = require("../constants/data");

export default function getInitialState() {
  let iFrom = 0;
  let iSize = 100;

  let aComm = OriginalData.communities;
  let aPaginatedData = aComm.length < iSize ? aComm : aComm.slice(iFrom, iSize);

  return {
    originalData: OriginalData,
    paginatedData: aPaginatedData,
    city: OriginalData.name,
    totalCount: aComm.length,
    isPanelCollapsed: false,
    isDataChanged: false,
    sortColumn: "", // or name or cases
    sortOrder: "", // or asc or desc
    from: 0,
    size: iSize,
    hasMore: iSize < aComm.length
  }
}