export const TOGGLE_SORT_ORDER = 'TOGGLE_SORT_ORDER';
export const TOGGLE_PANEL_COLLAPSE = 'TOGGLE_PANEL_COLLAPSE';

export const toggleSortOrder = (sortColumn, sCurrentSortOrder) => ({
  type: TOGGLE_SORT_ORDER,
  sortOrder: sCurrentSortOrder,
  sortColumn
});

export const togglePanelCollapse = (bVal) => ({
  type: TOGGLE_PANEL_COLLAPSE,
  isPanelCollapsed: bVal
});
