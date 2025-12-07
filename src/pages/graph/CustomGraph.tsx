import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { SidebarContext } from "./SidebarContext";
import moment from "moment";

const MAX_SERIES_COUNT = 200;

const defaultOption = {
  chart: {
    id: "apexchart-example",
    stacked: false,
    width: "100%",
    animations: {
      enabled: true,
    },
    toolbar: {
      show: false,
      export: {
        svg: {
          filename: "new",
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
    },
  },
  yaxis: {
    decimalsInFloat: 2,
    labels: {
      show: true,
    },
  },
};
const DEFAULT_GRAPH_TYPE = "area";

const CustomGraph = ({
  datum,
  option,
  type = DEFAULT_GRAPH_TYPE,
}: {
  datum: ApexAxisChartSeries;
  option?: ApexOptions;
  type?:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
}) => {
  const { sidebarToggle } = React.useContext(SidebarContext);

  const [options, setOptions] = useState<ApexOptions>({});
  const chartRef = useRef(null);

  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  // const [graphType, setGraphType] = useState(DEFAULT_GRAPH_TYPE);
  useEffect(() => {
    setOptions({
      ...option,
      ...defaultOption,
      stroke: {
        width: 1,
        // curve: new Array(datum.length).fill('straight')
      },
    });
  }, [option, datum]);
  useEffect(() => {
    const result: ApexAxisChartSeries = [];
    datum.map((d) => {
      if (MAX_SERIES_COUNT == null) {
        result.push(d);
      } else if (d?.data?.length < MAX_SERIES_COUNT) {
        result.push(d);
      } else {
        const step = Math.floor(d.data.length / MAX_SERIES_COUNT);
        const r: any[] = [];
        for (let i = 0; i < MAX_SERIES_COUNT; i++) {
          r.push(d.data[i * step]);
        }
        result.push({
          ...d,
          data: r,
        });
      }
    });
    setSeries(result);
  }, [datum]);

  // useEffect(() => {
  //   setGraphType(type);
  // });
  return (
    <div
      className="max-h-[500px] min-h-[70vh]"
      style={{
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: "100%",
        margin: "30px",
      }}
    >
      <Chart
        ref={chartRef}
        type={type}
        options={{
          ...options,
          chart: {
            ...options.chart,
            events: {
              click: (e, chart, options) => {
                if (e.target.className == "apexcharts-menu-item exportSVG") {
                  // console.log('prevent default', e, chart)
                  // e.preventDefault();
                  // chart.exports.exportToCSV({fileName: `svg_${moment().format("yyyy_mm_dd.svg")}`})
                  return true;
                }
              },
            },
            toolbar: { export: { svg: { filename: "New svg file" } } },
          },
        }}
        series={series}
        height="100%"
      />
    </div>
  );
};

export default CustomGraph;
