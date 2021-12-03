import React, { useEffect, useState } from "react";

import styles from "./DateSelection.module.css";

const DAYS = [];
const MONTHS = [];
const YEARS = [];

for (let day = 1; day <= 31; day++) {
  DAYS.push(day);
}

for (let month = 1; month <= 12; month++) {
  MONTHS.push(month);
}

for (let year = new Date().getFullYear(); year >= 1970; year--) {
  YEARS.push(year);
}

export default function DateSelection(props) {
  const [day, setDay] = useState(props.day || 1);
  const [month, setMonth] = useState(props.month || 1);
  const [year, setYear] = useState(props.year || 1970);
  const onDayChange = (e) => {
    setDay(e.target.value);
  };

  const onMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const onYearChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    props.setDate &&
      props.setDate(new Date(year, month - 1, day).toUTCString());
  }, [day, month, year]);

  return (
    <div>
      <label className={styles.label}>Sinh nhật</label>
      <div className={styles["date-selection"]}>
        <select id="day" value={day} onChange={onDayChange}>
          {DAYS.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select id="month" value={month} onChange={onMonthChange}>
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              Tháng {month}
            </option>
          ))}
        </select>

        <select id="year" value={year} onChange={onYearChange}>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
