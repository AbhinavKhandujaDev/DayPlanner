let df = new Intl.DateTimeFormat("US", {
  hour: "2-digit",
  minute: "2-digit",
});

export const getTime = (date?: Date) => {
  if (!date) return "";
  return df.format(date);
};

export function getDifference(date1?: Date, date2?: Date) {
  if (!date1 || !date2) return "";

  let nd1 = date1.getTime() / 1000;
  let nd2 = date2.getTime() / 1000;
  // let secondsAgo = Date.now() / 1000 - unix;

  let diff = Math.abs(nd1 - nd2);

  return Math.round(diff / 60);
}
