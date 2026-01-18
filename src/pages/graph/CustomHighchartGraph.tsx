import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mouseWheelZoom from "highcharts/modules/mouse-wheel-zoom";
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";
import exportData from "highcharts/modules/export-data";

mouseWheelZoom(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
offline(Highcharts);

type ChartSeries = {
  name: string;
  data: number[][];
};

type ChartComponentProps = {
  title: string;
  yAxis?: string;
  height?: string;
  series: ChartSeries | ChartSeries[];
};

export const CustomHighchartsGraph: React.FC<ChartComponentProps> = ({
  title,
  yAxis,
  height,
  series,
}) => {
  const seriesArray = Array.isArray(series) ? series : [series];

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "spline",
      height: height ? null : "50%",
      zooming: {
        singleTouch: true,
        type: "x",
        mouseWheel: {
          enabled: true,
        },
      },
    },
    boost: {
      useGPUTranslations: true,
      usePreallocated: true,
      seriesThreshold: 1,
    },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333333",
      },
    },
    credits: {
      text: "NatPower Financial Modelling",
    },
    colors: [
      "#6366F1",
      "#F79006",
      "red",
      "green",
      "blue",
      "purple",
      "orange",
      "cyan",
      "magenta",
      "yellow",
    ],
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: yAxis ?? "Number of Cycles",
      },
      startOnTick: false,
      endOnTick: false,
      min: Math.min(
        ...seriesArray.flatMap((data) => data.data.map((point) => point[1]))
      ),
    },
    series: seriesArray.map((data) => ({
      name: data.name,
      data: data.data,
      marker: {
        enabled: false,
        shape: "circle",
      },
      type: "spline",
    })),
    tooltip: {
      enabled: true,
      shared: true,
      useHTML: true,
      formatter: function () {
        let dateLabel =
          typeof this.x === "number"
            ? Highcharts.dateFormat("%d/%m/%Y", this.x)
            : "Invalid Date";
        let tooltipHtml = `<div style="font-size: 16px; ">${dateLabel}</div><br/>`;
        this.points.forEach((point) => {
          tooltipHtml +=
            `<div style="display: flex; justify-content: space-between; width: 250px; margin-bottom: 5px; white-space: normal;">` +
            `<span style="color:${point.series.color}; font-size: 14px; width: 150px;">${point.series.name}:</span>` +
            `<strong style="font-size: 14px;">${point.y.toFixed(2)}</strong>` +
            `</div>`;
        });
        return tooltipHtml;
      },
      style: {
        padding: "10px",
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
      floating: false,
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ["downloadPNG", "downloadJPEG", "downloadCSV"],
        },
      },
      csv: {
        dateFormat: "%d-%m-%Y %H:%M:%S",
      },
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{
        style: {
          width: "100%",
          height: height ? height : "100%",
          borderRadius: "0.5rem"
        },
      }}
    />
  );
};
