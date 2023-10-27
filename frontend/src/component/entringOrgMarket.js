import * as React from "react"
import PropTypes from "prop-types"
import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from "@mui/icons-material/FilterList"
import { visuallyHidden } from "@mui/utils"
import { useDispatch, useSelector } from "react-redux"
import {
  Alert,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material"
import { buyShares } from "../action/requestAction"
import { Stack } from "@mui/system"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
let loginUser = JSON.parse(localStorage.getItem("data"))
let headCells = []
loginUser && loginUser.role !== "1" && loginUser.role !== "0"
  ? (headCells = [
      {
        id: "Org_share_price",
        numeric: true,
        disablePadding: false,
        label: "org_share_price",
      },
      {
        id: "OrgName",
        numeric: true,
        disablePadding: false,
        label: "orgName",
      },

      {
        id: "Share_amount",
        numeric: true,
        disablePadding: false,
        label: "share_amount",
      },

      {
        id: "AvailableAmount",
        numeric: true,
        disablePadding: false,
        label: "AvailableAmount",
      },

      {
        id: "totalAmount",
        numeric: true,
        disablePadding: false,
        label: "totalAmount",
      },
      {
        id: "buyUser",
        numeric: true,
        disablePadding: false,
        label: "buyShare",
      },
      {
        id: "action",
        numeric: true,
        disablePadding: false,
        label: "action",
      },
    ])
  : (headCells = [
      {
        id: "Org_share_price",
        numeric: true,
        disablePadding: false,
        label: "org_share_price",
      },
      {
        id: "OrgName",
        numeric: true,
        disablePadding: false,
        label: "orgName",
      },

      {
        id: "Share_amount",
        numeric: true,
        disablePadding: false,
        label: "share_amount",
      },

      {
        id: "AvailableAmount",
        numeric: true,
        disablePadding: false,
        label: "AvailableAmount",
      },
    ])

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              <br />

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          OrgShareMarket
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

const OrgMarket = ({ data }) => {
  console.log("loginUserloginUser", loginUser)
  const dispatch = useDispatch()
  const [share, setbuyShare] = React.useState([])
  const [options, setOptions] = React.useState([1, 2, 3, 5, 10])
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("org_share_price")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  console.log("share", share)
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n._id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const buyShsre = (index, value) => {
    console.log("eee", index, value)
    let a = []
    a[index] = value
    setbuyShare(a)
  }
  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data ? data.length : 0}
              />
              <TableBody>
                {/* {stableSort(data, getComparator(order, orderBy)) */}
                {data &&
                  data.length > 0 &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id)
                      const labelId = `enhanced-table-checkbox-${index}`
                      console.log("share[index]", share[index])
                      const buyPercentAmount = share[index]
                        ? (row.org_share_price * share[index]) / 100
                        : 0
                      const onePercent = (row.org_share_price * 1) / 100
                      console.log("tenPercent", buyPercentAmount, onePercent)
                      return (
                        <>
                          {row && row.user_share_amount > 0 && (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row._id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row._id}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </TableCell>
                              {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.org_share_price}
                      </TableCell> */}

                              <TableCell align="right">{onePercent}</TableCell>
                              <TableCell align="right">{row.orgName}</TableCell>

                              <TableCell align="right">
                                {row.share_amount}%
                              </TableCell>

                              <TableCell align="right">
                                {row.user_share_amount}%
                              </TableCell>
                              {loginUser &&
                                loginUser.role !== "1" &&
                                loginUser.role !== "0" && (
                                  <>
                                    <TableCell align="right">
                                      <TextField
                                        type="text"
                                        name="totalAmount"
                                        value={buyPercentAmount}
                                      />
                                    </TableCell>
                                    <TableCell align="right">
                                      <Box>
                                        <FormControl>
                                          <InputLabel
                                            variant="standard"
                                            htmlFor="uncontrolled-native"
                                          ></InputLabel>
                                          <NativeSelect
                                            // defaultValue={1}
                                            // id={index}
                                            inputProps={{
                                              name: "buyShare",
                                              id: "uncontrolled-native",
                                            }}
                                            onChange={(e) =>
                                              // setbuyShare([(index) => e.target.value])
                                              // setbuyShare(e.target.value)
                                              buyShsre(index, e.target.value)
                                            }
                                            value={share[index]}
                                            // value={share}
                                          >
                                            <option value={-1}>
                                              select share
                                            </option>
                                            {options &&
                                              options.map((element, index) => (
                                                <>
                                                  {options}
                                                  {element <=
                                                    row.user_share_amount && (
                                                    <option
                                                      key={index}
                                                      value={element}
                                                    >
                                                      {element}
                                                    </option>
                                                  )}
                                                </>
                                              ))}
                                          </NativeSelect>
                                        </FormControl>
                                      </Box>
                                    </TableCell>

                                    <TableCell align="right">
                                      <button
                                        type="submit"
                                        onClick={(e) =>
                                          dispatch(
                                            buyShares(
                                              share[index],
                                              row.org_id,
                                              row.user_id,
                                              buyPercentAmount
                                            )
                                          )
                                        }
                                      >
                                        Buy
                                      </button>
                                    </TableCell>
                                  </>
                                )}
                            </TableRow>
                          )}
                        </>
                      )
                    })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data ? data.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </Box>
    </>
  )
}

export default OrgMarket
