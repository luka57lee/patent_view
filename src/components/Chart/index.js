import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import axios from "axios";
import { dateTimeToDate } from "../../utils/date";
import { getSeries, getCategories } from "../../utils/chart";

const Chart = ({ organization }) => {
  const [categories, setCategories] = useState();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (organization) {
      const now = new Date();
      const firstDay = new Date(now.getFullYear() - 5, now.getMonth(), 1);
      const newCategories = getCategories(now);
      setCategories(newCategories);

      axios
        .post("https://api.patentsview.org/patents/query", {
          method: "POST",
          data: {
            q: {
              _and: [
                {
                  _gte: {
                    patent_date: dateTimeToDate(firstDay),
                  },
                },
                { assignee_organization: organization },
              ],
            },
            f: ["patent_number", "patent_date", "cpc_section_id"],
            s: { patent_date: "asc" },
            o: { page: 1, per_page: 10000000 },
          },
        })
        .then((res) => {
          if (res && res.data && res.data.data) {
            const newSeries = getSeries(now, res.data.data);
            setSeries(newSeries);
          }
        })
        .catch((e) => {});
    }
  }, [organization]);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
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
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div>
      {categories.length > 0 && series.length > 0 && (
        <ApexChart
          options={options}
          series={series}
          width="100%"
          height="450px"
          type="bar"
        />
      )}
    </div>
  );
};

Chart.propTypes = {
  organization: PropTypes.string,
};

export default Chart;
