/* eslint-disable react/prop-types */
import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Jobs Monthly Application</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
      {/* show the Bar Chart component only when bar chart state is true else show the Area Chart component  */}
    </Wrapper>
  );
};

export default ChartsContainer;
