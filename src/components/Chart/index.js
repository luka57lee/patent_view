import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getSeries, getCategories } from "../../utils/chart";
import { getPatent } from "../../service";

const Loader = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const Chart = ({ organization }) => {
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (organization) {
      const now = new Date();
      const firstDay = new Date(now.getFullYear() - 5, now.getMonth(), 1);
      const newCategories = getCategories(now);
      setCategories(newCategories);
      
      setLoading(true);
      getPatent(firstDay, organization)
        .then((data) => {
          if (data) {
            const newSeries = getSeries(now, data);
            setSeries(newSeries);
          } else {
            setSeries([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          setSeries([]);
          setLoading(false);
        });
    }
  }, [organization]);

  const options = {
    colors: [
      // There are 8 CPC codes, so added one more color for patents has no CPC.
      "#f44336",
      "#9c27b0",
      "#3f51b5",
      "#03a9f4",
      "#009688",
      "#8bc34a",
      "#ffeb3b",
      "#ff9800",
      "#ff3d00",
    ],
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    tooltip: {
      marker: false,
      x: {
        show: true,
        format: "MMM yyyy",
        formatter: undefined,
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          let total = 0;
          for (let i = 0; i < series.length; i++) {
            total += series[i][dataPointIndex];
          }
          return `${value} / ${total}`;
        },
        title: {
          formatter: (seriesName) => {
            return `${seriesName} / Total: `;
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
      },
    },
    xaxis: {
      type: "datetime",
      categories,
    },
    legend: {
      position: "right",
      offsetY: 40,
      formatter: function (seriesName, opts) {
        return seriesName === "R" ? `R(No CPC)` : seriesName;
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <>
      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <>
          {categories.length > 0 && series.length > 0 ? (
            <ApexChart
              options={options}
              series={series}
              width="100%"
              height="100%"
              type="bar"
            />
          ) : (
            <>
              {organization && (
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ marginBottom: 1 }}
                >
                  Chart is not available
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

Chart.propTypes = {
  organization: PropTypes.string,
};

export default Chart;
