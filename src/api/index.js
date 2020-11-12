import axios from "axios";

const URL = "https://covid19.mathdro.id/api";

export const fetchData = (country) => {
  let changealeUrl = URL;
  if (country) {
    changealeUrl = `${URL}/countries/${country}`;
  }
  return axios
    .get(changealeUrl)
    .then((res) => res.data)
    .then((data) => ({
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    }));
};

export const fetchDailyDate = () => {
  return axios
    .get(`${URL}/daily`)
    .then((res) => res.data)
    .then((data) =>
      data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }))
    );
};

export const countries = () => {
  return axios
    .get(`${URL}/countries`)
    .then((res) => res.data.countries)
    .then((data) => data.map((country) => country.name));
};
