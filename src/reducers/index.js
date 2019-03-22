import {TOGGLE_SORT_ORDER, TOGGLE_PANEL_COLLAPSE, LOAD_MORE} from '../actions'


function compareFunction(x, y, sSortOrder) {
  if (sSortOrder === "asc") {
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  } else {
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  }
}

function handleSortOrderChanged(state, sColName, sCurrentSortOrder) {
  let bColChanged = sColName !== state.sortColumn;
  let newSortColumn = sColName;

  sCurrentSortOrder = bColChanged ? "" : sCurrentSortOrder;
  let sNewSortOrder = (sCurrentSortOrder === "desc") ? "asc" : "desc";

  let oCurrentSortedData = state.originalData;
  let aCurrentData = oCurrentSortedData.communities;

  let newSortedData = {
    name: oCurrentSortedData.name
  };
  if (sColName === "name") {
    newSortedData.communities = aCurrentData.sort(function (a, b) {
      let x = a[sColName].toLowerCase();
      let y = b[sColName].toLowerCase();
      return compareFunction(x, y, sNewSortOrder);
    });
  } else {
    newSortedData.communities = aCurrentData.sort(function (a, b) {
      return compareFunction(a[sColName], b[sColName], sNewSortOrder);
    });
  }


  let iFrom = 0;
  let iSize = state.size;
  let aComm = newSortedData.communities;
  let aPaginatedData = aComm.length < iFrom + iSize ? aComm.slice(iFrom, aComm.length) : aComm.slice(iFrom, iFrom + iSize);


  return {
    ...state,
    originalData: newSortedData,
    sortOrder: sNewSortOrder,
    sortColumn: newSortColumn,
    from: iFrom,
    paginatedData: aPaginatedData
  }
}

function handleLoadMore(state) {
  let iSize = state.size;
  let iNewFrom = state.from + iSize;

  let aComm = state.originalData.communities;
  let aPaginatedData = aComm.length < iNewFrom + iSize ? aComm.slice(iNewFrom, aComm.length) : aComm.slice(iNewFrom, iNewFrom + iSize);

  return{
    ...state,
    paginatedData: aPaginatedData,
    from: iNewFrom
  }

}

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_PANEL_COLLAPSE:
      return {
        ...state,
        isPanelCollapsed: action.isPanelCollapsed
      };


    case TOGGLE_SORT_ORDER:
      return handleSortOrderChanged(state, action.sortColumn, action.sortOrder);

    case LOAD_MORE:
      return handleLoadMore(state);


    default:
      return state
  }
}
