import React, { useState, useMemo, useCallback } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  title: {
    text: "Apple vs Orange"
  },
  xAxis: {
    title: {
      text: "Init"
    }
  },
  series: [
    {
      name: "Apple",
      data: [1, 2, 4]
    },
    {
      name: "Orange",
      data: [2, 3]
    }
  ]
};

const useInputXAxis = xAxis => {
  const [name, setName] = useState(xAxis.title.text);
  const onChange = useCallback(e => setName(e.target.value), []);
  const input = useMemo(() => <input type="text" onChange={onChange} />, [
    onChange
  ]);
  const newXAxis = useMemo(
    () => ({
      xAxis: {
        title: {
          text: name
        }
      }
    }),
    [name]
  );
  return { newXAxis, input };
};

const useAddSeriesData = series => {
  const [innerData, setData] = useState(series.data);
  const onClick = useCallback(
    () => setData(innerData.concat([parseInt(Math.random() * 10, 10)])),
    [innerData]
  );
  const button = useMemo(
    () => <button onClick={onClick}>Add {series.name}</button>,
    [onClick, series.name]
  );
  const newSeries = useMemo(
    () => ({
      ...series,
      data: innerData
    }),
    [series, innerData]
  );
  return { newSeries, button };
};

const App = () => {
  const { newXAxis: xAxis, input: xAxisInput } = useInputXAxis(options.xAxis);
  const { newSeries: series1, button: addApple } = useAddSeriesData(
    options.series[0]
  );
  const { newSeries: series2, button: addOrange } = useAddSeriesData(
    options.series[1]
  );

  const series = {
    series: [series1, series2]
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{ ...options, ...xAxis, ...series }}
      />
      {xAxisInput}
      {addApple}
      {addOrange}
    </div>
  );
};

render(<App />, document.getElementById("app"));
