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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data

import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useContext, useEffect, useState } from "react";
import { VotesReportGetPostContext } from "context/VotesReportGetPostContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { useVotesReportGetPostContext } from "context/VotesReportGetPostContext";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [reportsBarChartData, setReportsBarChartData] = useState({});
  const [reportsLinearChartData, setReportsLinearChartData] = useState({});
  const [selectedPostID, setSelectedPostID] = useVotesReportGetPostContext();
  const [selectedPostIDState, setSelectedPostIDState] = useState(1);
  const [showBackdropForAnything, setShowBackdropForAnything] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [VPVotes, setVPVotes] = useState(0);
  const [HSVotes, setHSVotes] = useState(0);
  const [HTVotes, setHTVotes] = useState(0);
  const [HJSVotes, setHJSVotes] = useState(0);
  const [HJTVotes, setHJTVotes] = useState(0);
  const [ECCVotes, setECCVotes] = useState(0);
  const [ECEVotes, setECEVotes] = useState(0);
  const [percentageChanges, setPercentageChanges] = useState(null);
  const [totalPercentageChanges, setTotalPercentageChanges] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setShowBackdropForAnything(true);
    const votingData = {};
    fetch(`https://lyxnlabsapi.online/api/getVotesByPost/${selectedPostID ? selectedPostID : 1}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const votedCountsList = data;
        const no_of_votes_list = data.map((candidate) => candidate.no_of_votes);
        console.log(no_of_votes_list);
        var reportsBarChartDataTemp = {};
        reportsBarChartDataTemp.datasets = { label: "Votes", data: no_of_votes_list };
        fetch(`https://lyxnlabsapi.online/api/getAllNamesByCandidateIdList`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            candidate_id_list: votedCountsList.map((item) => item.candidate_id),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            reportsBarChartDataTemp.labels = data.map((item) => {
              return item.first_name + " " + item.last_name;
            });
            console.log(reportsBarChartDataTemp);
            setReportsBarChartData(reportsBarChartDataTemp);
            setShowBackdropForAnything(false);
          });
      })
      .catch((error) => {
        console.error("Failed to fetch candidates", error);
      });
  }, [selectedPostID]);

  useEffect(() => {
    async function getTotalVotesListPastSevenDays() {
      try {
        const response = await fetch("https://lyxnlabsapi.online/api/getTotalVotesListPastSevenDays");
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
          setReportsLinearChartData({
            labels: labels,
            datasets: { label: "Votes", data: data },
          });
        }
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTotalVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes/1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setHJSVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes/2`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setECCVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes/3`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setECEVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes/4`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setECEVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes/5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setECEVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes/6`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setECEVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/getTotalVotes/7`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setECEVotes(data.no_of_votes))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`https://lyxnlabsapi.online/api/totalVotesPercentageFromYday`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalPercentageChanges(parseInt(data.percentage_change.percentage_difference));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    var post_id_percentages = [
      { post_id: 1, percentage_change: 0 },
      { post_id: 2, percentage_change: 0 },
      { post_id: 3, percentage_change: 0 },
      { post_id: 4, percentage_change: 0 },
      { post_id: 5, percentage_change: 0 },
      { post_id: 6, percentage_change: 0 },
      { post_id: 7, percentage_change: 0 },
      
    ];
    var post_ids = post_id_percentages.map(function (item) {
      return item.post_id;
    });
    post_ids.map(async (post_id, i) => {
      fetch(`https://lyxnlabsapi.online/api/getPercentageChangeFromYday/${post_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data = " + JSON.stringify(data));
          post_id_percentages[i].percentage_change = parseInt(data.percentage_difference);
        })
        .then(() => {
          setPercentageChanges(post_id_percentages);
          console.log("percent = " + JSON.stringify(post_id_percentages));
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total Votes"
                count={totalVotes}
                percentage={{
                  amount: totalPercentageChanges
                    ? totalPercentageChanges > 0
                      ? `+${totalPercentageChanges}%`
                      : `${totalPercentageChanges}%`
                    : 0,
                  color: totalPercentageChanges
                    ? totalPercentageChanges > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title={"Vice President"}
                count={VPVotes}
                percentage={{
                  amount: percentageChanges
                    ? percentageChanges[0].percentage_change > 0
                      ? `+${percentageChanges[0].percentage_change}%`
                      : `${percentageChanges[0].percentage_change}%`
                    : 0,
                  color: percentageChanges
                    ? percentageChanges[0].percentage_change > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title={"Hon Secretary"}
                count={HSVotes}
                percentage={{
                  amount: percentageChanges
                    ? percentageChanges[1].percentage_change > 0
                      ? `+${percentageChanges[1].percentage_change}%`
                      : `${percentageChanges[1].percentage_change}%`
                    : 0,
                  color: percentageChanges
                    ? percentageChanges[1].percentage_change > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title={"Hon Treasurer"}
                count={HTVotes}
                percentage={{
                  amount: percentageChanges
                    ? percentageChanges[2].percentage_change > 0
                      ? `+${percentageChanges[2].percentage_change}%`
                      : `${percentageChanges[2].percentage_change}%`
                    : 0,
                  color: percentageChanges
                    ? percentageChanges[2].percentage_change > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderbaord"
                title="Hon Joint Secretary"
                count={HJSVotes}
                percentage={{
                  amount: percentageChanges
                    ? percentageChanges[3].percentage_change > 0
                      ? `+${percentageChanges[3].percentage_change}%`
                      : `${percentageChanges[3].percentage_change}%`
                    : 0,
                  color: percentageChanges
                    ? percentageChanges[3].percentage_change > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderbaord"
                title="Hon Joint Treasurer"
                count={HJTVotes}
                percentage={{
                  amount: percentageChanges
                    ? percentageChanges[4].percentage_change > 0
                      ? `+${percentageChanges[4].percentage_change}%`
                      : `${percentageChanges[4].percentage_change}%`
                    : 0,
                  color: percentageChanges
                    ? percentageChanges[4].percentage_change > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderbaord"
                title="Clinician "
                count={ECCVotes}
                percentage={{
                  amount: percentageChanges
                    ? percentageChanges[5].percentage_change > 0
                      ? `+${percentageChanges[5].percentage_change}%`
                      : `${percentageChanges[5].percentage_change}%`
                    : 0,
                  color: percentageChanges
                    ? percentageChanges[5].percentage_change > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderbaord"
                title="Embryologist "
                count={ECEVotes}
                percentage={{
                  amount: percentageChanges
                    ? percentageChanges[6].percentage_change > 0
                      ? `+${percentageChanges[6].percentage_change}%`
                      : `${percentageChanges[6].percentage_change}%`
                    : 0,
                  color: percentageChanges
                    ? percentageChanges[6].percentage_change > 0
                      ? `success`
                      : `error`
                    : "success",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Leading Candidates"
                  description="Last Campaign Performance"
                  date="updated 2 seconds ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Number of Votes"
                  description={
                    <>
                      (
                      <strong>{`${
                        totalPercentageChanges
                          ? totalPercentageChanges < 0
                            ? totalPercentageChanges * -1
                            : totalPercentageChanges
                          : 0
                      }%`}</strong>
                      ){" "}
                      {totalPercentageChanges
                        ? totalPercentageChanges > 0
                          ? `increase `
                          : `decrease `
                        : "increase"}
                      in today votes.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={reportsLinearChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdropForAnything}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Dashboard;
