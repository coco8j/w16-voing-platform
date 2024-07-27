const formatDateTime = function (dateString) {
  const date = new Date(dateString);
  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = weekdays[date.getDay()];

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const amPm = hours < 12 ? "오전" : "오후";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${year}.${month}.${day}.(${weekday}) ${amPm}${hours}:${minutes}`;
}

module.exports = formatDateTime
