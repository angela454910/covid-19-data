import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import headerImg from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    isLoading: false,
  };

  componentDidMount() {
    this.loadData();
  }

  handleCountryChange = (country) => {
    fetchData(country).then((data) => {
      this.setState({
        data,
        country,
      });
    });
  };

  loadData = () => {
    this.setState({ isLoading: true }, () => {
      fetchData().then((data) => {
        this.setState({ isLoading: false, data });
      });
    });
  };

  render() {
    const { data, isLoading, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={headerImg} className={styles.img} alt="Header" />
        <Cards data={data} isLoading={isLoading} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
