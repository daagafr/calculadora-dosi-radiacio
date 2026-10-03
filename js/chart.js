Chart.defaults.color = "#fff";
Chart.defaults.borderColorcolor = "#fff";

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  plugins: [ChartDataLabels],
  type: "doughnut",
  data: {
    datasets: [
      {
        label: "Dosis (mSv)",
        data: [
          medrads,
          internalRad,
          cosmicRad,
          travelRad,
          otherRad,
          terrestrialRad,
          radon,
        ],
        backgroundColor: [
          "rgba(50, 171, 231, 0.8)",
          "rgb(40 , 182,  163, 0.8 )",
          "rgba(148, 49, 168, 0.8)",
          "rgb(140,182,63,0.8)",
          "rgba(236, 140, 60, 0.8)",
          "rgb(192,183,61,0.8)",
          "rgba(204, 67, 49, 0.8)",
        ],

        borderWidth: 2,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: "center",

        formatter: (data) => {
          if (
            data >
            0.01 *
              (medrads +
                internalRad +
                cosmicRad +
                travelRad +
                otherRad +
                terrestrialRad +
                radon)
          ) {
            return (
              (
                (data * 100) /
                (medrads +
                  internalRad +
                  cosmicRad +
                  travelRad +
                  otherRad +
                  terrestrialRad +
                  radon)
              ).toFixed(1) + "%"
            );
          } else {
            return "";
          }
        },

        color: "white",

        font: {
          size: (16 / 1920) * window.innerWidth,
        },
      },
      legend: {
        position: "right",
        labels: {
          font: {
            size: (24 / 1920) * window.innerWidth,
          },
        },
      },
    },
  },
});
