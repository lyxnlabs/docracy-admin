/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";

export default function data() {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    fetch(`https://kisargo.ml/api/getAllVotes`, {})
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((err) => console.log(err));
  }, []);

  return {
    columns: [
      { Header: "Voter Name", accessor: "companies", width: "45%", align: "left" },
      { Header: "Post", accessor: "members", width: "10%", align: "left" },
      { Header: "Candidate Selected", accessor: "budget", align: "center" },
      { Header: "Voted At", accessor: "completion", align: "center" },
    ],

    rows: tableData
      ? tableData.map((row) => {
          return {
            companies: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {row.voter_name}
              </MDTypography>
            ),
            members: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {row.post_name}
              </MDTypography>
            ),
            budget: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {row.candidate_name}
              </MDTypography>
            ),
            completion: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {new Date(row.created_at).toLocaleString(undefined, {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </MDTypography>
            ),
          };
        })
      : [
          {
            companies: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                No Data
              </MDTypography>
            ),
            members: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                Try again
              </MDTypography>
            ),
            budget: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                No Data
              </MDTypography>
            ),
            completion: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                Try again
              </MDTypography>
            ),
          },
        ],
  };
}
