import { TOGGLE_SORT_ORDER, TOGGLE_PANEL_COLLAPSE } from '../actions'


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

  let oCurrentSortedData = state.oSortedData;
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

  return{
    ...state,
    oSortedData: newSortedData,
    sortOrder: sNewSortOrder,
    sortColumn: newSortColumn
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


    default:
      return state
  }
}
