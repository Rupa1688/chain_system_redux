import "../App.css"
import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Checkbox from "@mui/material/Checkbox"
import Avatar from "@mui/material/Avatar"
import { useDispatch, useSelector } from "react-redux"
import { FormControl, InputLabel, NativeSelect } from "@mui/material"
import { cliendBid } from "../action/requestAction"

const BuyShares = ({ data }) => {
  console.log("datataaa", data)
  const dispatch = useDispatch()
  const [share, setShare] = React.useState([])

  const sailBiding = (index, value) => {
    console.log("value", index, value)
    let a = []
    a[index] = value
    console.log("a", a)
    setShare(a)
  }
  return (
    <>
      <br />
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <ListItem>
          <ListItemButton className="listButton">
            <ListItemText className="listItem" primary="name" />
            <ListItemText className="listItem" primary="email" />
            <ListItemText className="listItem" primary="organizaion" />
            <ListItemText className="listItem" primary="shares" />
            <ListItemText className="listItem" primary="select share" />
            <ListItemText className="listItem" primary="biding" />
          </ListItemButton>
        </ListItem>

        {data &&
          data.map((value) => {
            // const labelId = `checkbox-list-secondary-label-${value}`
            return (
              <ListItem key={value} disablePadding>
                <ListItemButton className="listUserButton">
                  {/* <ListItemText primary={value.name} />
                  <ListItemText primary={value.email} /> */}
                  <ListItemText className="userData">
                    {value.organizaions.map((org) => {
                      return value.stockdata.map((stockdata, index) => {
                        if (org._id === stockdata.org_id) {
                          return (
                            <>
                              <div className="userName">{value.name}</div>
                              <div className="userEmail">{value.email}</div>
                              <div className="org">{org.organizationName}</div>
                              <div className="share">{stockdata.shares}</div>
                              {/* <ListItemText primary={org.organizationName} /> */}
                              {/* <ListItemText primary={stockdata.shares} /> */}
                              <div className="avlAmount">
                                <select
                                  onChange={(e) =>
                                    sailBiding(index, e.target.value)
                                  }
                                >
                                  <option value={-1}>select share</option>
                                  <option value={1}>{1}</option>
                                  <option value={2}>{2}</option>
                                  <option value={3}>{3}</option>
                                  <option value={5}>{5}</option>
                                </select>
                              </div>
                              <div className="biding">
                                <button
                                  type="submit"
                                  onClick={(e) =>
                                    dispatch(
                                      cliendBid(
                                        value._id,
                                        share[index],
                                        org._id,
                                        org.amount
                                      )
                                    )
                                  }
                                >
                                  biding
                                </button>
                              </div>
                              <br />
                              <br />
                            </>
                          )
                        }
                      })
                    })}
                  </ListItemText>
                  <br />
                </ListItemButton>
              </ListItem>
            )
          })}
      </List>
    </>
  )
}
export default BuyShares
