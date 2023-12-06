export const getRemainSpaceColor = (remainSpace = 0) =>
  remainSpace <= 10
    ? "text-danger"
    : remainSpace <= 20
    ? "text-warning"
    : "text-safe";
