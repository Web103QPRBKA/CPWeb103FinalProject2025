// Shared formatting utilities for puzzle data

export const formatCategoryName = (name) => {
  return name
.replace(/([A-Z])/g, ' $1')
.replace(/^./, (str) => str.toUpperCase())
.trim();
};

export const formatValue = (value) => {
  if (value === null || value === undefined) return '-';
  return String(value);
};
