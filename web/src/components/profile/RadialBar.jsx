import Chart from "react-apexcharts";

function RadialBar({ goal, count, title }) {
    const seriesValue = (count / goal) * 100; // Calcula el valor de series en función del objetivo.

    const state = {
      options: {
        plotOptions: {
          radialBar: {
            // startAngle: -180,
            // endAngle: 180,
            hollow: {
                size: '40',
                show: true,
            },
            track: {
              background: "#f2f2f2",
              strokeWidth: "100%",
            },
            dataLabels: {
              show: true,
              value: {
                show: true,
                fontSize: "16px",
                formatter: function(val) {
                    // Aquí puedes retornar el texto que quieras mostrar.
                    // En este caso, estamos mostrando el valor actual en el formato count/goal.
                    return `${Math.round(val / 100 * goal)} / ${goal}`;
                  }
              },
              total: {
                show: true,
                label: `${title}`,
                color: "#373d3f",
                formatter: function(w) {
                    // Aquí puedes retornar el texto que quieras mostrar.
                    // En este caso, solo estamos mostrando el valor total en el formato count/goal.
                    return `${Math.round(w.globals.seriesTotals.reduce((a, b) => a + b, 0) / 100 * goal)} / ${goal}`;
                  }
              }
            }
          }
        }
      },

      series: [seriesValue]
    };
    return (
        <div className="donut">
          <Chart
            options={state.options}
            series={state.series}
            type="radialBar"
            width="380"
          />
        </div>
      );
  }

export default RadialBar;
