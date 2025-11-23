export const formatDate = (dateString) => {
  if (dateString.startsWith("0001")) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
