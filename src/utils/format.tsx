export const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export const formatDate = (dateString?: string) =>
  dateString ? new Date(dateString).toLocaleDateString() : null;

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
};
