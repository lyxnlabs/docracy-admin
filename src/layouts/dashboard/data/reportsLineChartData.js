/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
async function getTotalVotesListPastSevenDays() {
  try {
    const response = await fetch("https://kisargo.ml/api/getTotalVotesListPastSevenDays");
    const data = await response.json();

    const votingDays = data.map((entry) => entry.voting_day);
    const totalVotes = data.map((entry) => entry.total_votes);

    return { votingDays, totalVotes };
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}
var labels = [];
var data = [];
// Usage example:
getTotalVotesListPastSevenDays()
  .then((result) => {
    if (result) {
      const { votingDays, totalVotes } = result;
      console.log("Flag");
      console.log(votingDays);
      console.log(totalVotes);
      labels = votingDays;
      data = totalVotes;
    }
  })
  .catch((error) => console.log("Error:", error));

export default {
  sales: {
    labels: labels,
    datasets: { label: "Mobile apps", data: data },
  },
};
