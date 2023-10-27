import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allUsers } from "../action/action"
import { Link, useNavigate } from "react-router-dom"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

import { useRef } from "react"
// import Header from "./header"
import { Stack } from "@mui/system"
import { Alert } from "@mui/material"
const columns = [
  { id: "_id", label: "id", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "role",
    label: "Role",
    minWidth: 20,
    align: "right",
  },
  {
    id: "ref_id",
    label: "ReferenceId",
    minWidth: 20,
    align: "right",
  },
  {
    id: "action_id",

    label: "action",

    align: "right",
    format: (value1) => <Link to={`/edit/${value1}`}>Edit</Link>,
  },
]

const UsersAll = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state?.usersData?.view?.data)
  const pageSize = useSelector((state) => state?.usersData?.view?.pageSize)
  const pagesNumber = useSelector((state) => state?.usersData?.view?.page)
  const total = useSelector((state) => state?.usersData?.view?.total)
  console.log("data88888", data)
  // const token = JSON.parse(localStorage.getItem("token"))
  // console.log("data9119", token)
  // // if (token && token == null) {
  //  return navigate("/login")
  //   // window.location.reload()
  // }

  const logout = () => {
    // localStorage.removeItem("token");
    localStorage.clear()
    navigate("/login")
    window.location.reload()
  }
  console.log("data9119", data)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(2)
  const [order, setOrderAsc] = React.useState(0)
  const [search, setSearch] = React.useState(null)
  const ref = useRef(null)
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage)
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    console.log("event", +event.target.value)
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const AscendingOrder = (event) => {
    setOrderAsc(1)
  }
  const DecendingOrder = (event) => {
    setOrderAsc(0)
  }
  const handleSearch = () => {
    const searchData = ref.current.value
    if (searchData) {
      setSearch(searchData)
    } else {
      setSearch(null)
    }
  }
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))

    if (!token) {
      return navigate("/login")
      // window.location.reload()
    } else {
      dispatch(allUsers(rowsPerPage, page, search, order))
    }
    // dispatch(allUsers(rowsPerPage, page, search, order))
  }, [dispatch, rowsPerPage, page, search, order, navigate])

  return (
    <>
      {/* {data?.status === 403 && data.messege && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{data.messege}</Alert>
        </Stack>
      )} */}
      {/* {JSON.stringify(data)} */}
      {data && (
        <React.Fragment key={`${Math.floor(Math.random() * 1000)}-min`}>
          {/* <Header /> */}

          <div>
            <input type="text" name="search" id="search" ref={ref} />
            <button onClick={handleSearch}>search</button>
          </div>
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.length === 0 && (
                    <TableRow className="nodata">
                      {/* <TableCell>No data availavble</TableCell> */}

                      <div className="nodata">No data availavble</div>
                    </TableRow>
                  )}
                  {data &&
                    data.length > 0 &&
                    data
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        console.log("rowww", row)
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                          >
                            {columns.map((column) => {
                              const value = row[column.id]
                              // console.log("value", value)
                              return (
                                <React.Fragment
                                  key={`${Math.floor(
                                    Math.random() * 1000
                                  )}-min`}
                                >
                                  <TableCell
                                    align={column.align}
                                    key={`${Math.floor(
                                      Math.random() * 1000
                                    )}-min`}
                                  >
                                    {column.format
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                </React.Fragment>
                              )
                            })}
                          </TableRow>
                        )
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 15]}
              component="div"
              count={total ? total : 0}
              rowsPerPage={pageSize ? pageSize : 0}
              page={pagesNumber ? pagesNumber : 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <button onClick={AscendingOrder}>Ascending</button>
            <button onClick={DecendingOrder}>Descending</button>
          </Paper>

          <div>
            <button onClick={logout}>logout</button>
          </div>
        </React.Fragment>
      )}
    </>
  )
}
export default UsersAll
