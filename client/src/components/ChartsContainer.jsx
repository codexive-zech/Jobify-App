import { useState } from "react";

import AreaChart from "./AreaChartComponent";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useLoaderData } from "react-router-dom";
import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { data } = useLoaderData();
  return (
    <Wrapper>
      <h4>Jobs Monthly Application</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data.monthlyJobApp} />
      ) : (
        <AreaChartComponent data={data.monthlyJobApp} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
