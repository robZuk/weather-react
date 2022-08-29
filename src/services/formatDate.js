function formatDate(date) {
  const weekDay = new Date(date)
    .toLocaleString("en-us", {
      weekday: "long",
    })
    .slice(0, 3);
  const monthDay = new Date(date).getUTCDate();
  const month = new Date(date)
    .toLocaleString("en-us", {
      month: "long",
    })
    .slice(0, 3);

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return { weekDay, monthDay, month, tomorrow };
}

export { formatDate };
