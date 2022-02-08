import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "@emotion/styled";
import Header from "../components/Header";
import useGetHorses from "../hooks/useGetHorses";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
ChartJS.defaults.color = "white";
ChartJS.defaults.scale.grid.color = "gray";

const Container = styled.div({
  width: "100vw",
  "@media screen and (min-width: 600px)": {
    width: "70vw",
  },
});
const Graph = () => {
  const { horses } = useGetHorses();

  const horseNames = horses && horses.map((horse) => horse.title);
  const horseAge = horses && horses.map((horse) => horse.wins);

  const labels = horseNames;
  const data = {
    labels: labels,
    datasets: [
      {
        color: "white",
        data: horseAge,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
      },
    ],
  };
  const options = {
    animation: false,
    scaleFontColor: "#FFFFFF",
    responsive: true,
    plugins: {
      font: {
        color: "white",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "( Horse )",
          align: "start",
        },
        stacked: true,
      },
      y: {
        title: {
          display: true,
          text: "( Wins )",
          align: "start",
        },

        stacked: true,
      },
    },
  };
  return (
    <Container>
      <Header title={"STATISTIC"} />
      <Bar height={80} options={options} data={data} />
    </Container>
  );
};

export default Graph;