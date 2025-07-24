import dayjs from "dayjs";

function formatDate(rawDate) {
  return dayjs(rawDate).format("YYYY-MM-DD");
}

export default formatDate;
