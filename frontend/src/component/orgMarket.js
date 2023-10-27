import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import UserProfile from "./userProfile"
import { useDispatch, useSelector } from "react-redux"
import { userProfile } from "../action/action"
import OrgMarket from "./entringOrgMarket"
import { orgsShareMarket } from "../action/requestAction"
import { Alert, Stack } from "@mui/material"

const OrgShareMarket = () => {
  const buyshareMsg = useSelector((state) => state?.usersData?.buyshareMsg)
  console.log("buyshareMsg", buyshareMsg)
  const dispatch = useDispatch()
  const getOrgEnterShareMarket = useSelector(
    (state) => state?.usersData?.getOrgEnterShareMarket?.data
  )
  const organizationName = useSelector(
    (state) => state?.usersData?.profile?.organizationName
  )
  const organizationAmount = useSelector(
    (state) => state?.usersData?.profile?.organization
  )
  console.log("dataStart", getOrgEnterShareMarket)
  React.useEffect(() => {
    dispatch(userProfile())
    dispatch(orgsShareMarket())
  }, [dispatch])
  if (buyshareMsg?.status === 200 && buyshareMsg.message) {
    setTimeout(() => {
      var x = document.getElementById("alrtmsg")
      // window.location.reload()
      x.style.display = "none"
    }, "4000")
  }

  return (
    <>
      {buyshareMsg?.status === 200 && buyshareMsg.message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" id="alrtmsg">
            {buyshareMsg.message}
          </Alert>
        </Stack>
      )}
      <Card sx={{ maxWidth: 345 }} className="card_container">
        <CardContent className="CardContent">
          <Typography gutterBottom variant="h5" component="div">
            Organization:{organizationName}
            <br />
            Amount: {organizationAmount}
          </Typography>
        </CardContent>
      </Card>
      <br />
      <br />
      <OrgMarket data={getOrgEnterShareMarket} />
    </>
  )
}
export default OrgShareMarket
