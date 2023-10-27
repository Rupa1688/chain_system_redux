const User = require("../model/user")
const Organization = require("../model/organization")
const Commission = require("../model/commission")
const RequestUser = require("../model/reqRelease")
const OrgShareMarket = require("../model/orgShareMarket")
const SharesUser = require("../model/buyerShare")
const Biding = require("../model/biding")
const HighestBiding = require("../model/highestBiding")
const PurchaseTiming = require("../model/purchaseTiming")
const RolesAmount = require("../rolesAmount")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

exports.add = async (req, res) => {
  try {
    encryptedPassword = await bcrypt.hash(req.body.password, 10)
    const superUser = await User.findOne({ role: "0" })
    console.log("superUser", superUser)

    let referenceId
    const superUserId = superUser._id
    if (req.body.userRole == "1") {
      referenceId = superUserId
    } else {
      referenceId = req.body.referenceBy
    }

    userData = {
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,

      role: req.body.userRole,
      ref_id: referenceId,
    }
    console.log("hgdfsdh", userData)

    const user = await new User(userData).save()
    let userAmount
    if (req.body.userRole == "1") {
      userAmount = RolesAmount.userRole.admin
    }
    if (req.body.userRole == "2") {
      userAmount = RolesAmount.userRole.agent
    }
    if (req.body.userRole == "3") {
      userAmount = RolesAmount.userRole.user
    }
    console.log("userAmount", userAmount)
    prizeAmount = parseInt(userAmount.prize)
    console.log("prizeAmount", prizeAmount)
    const commission_amount = (prizeAmount * userAmount.commission) / 100

    const reamining_amount = prizeAmount - commission_amount
    let org_id = ""
    let ref_orgId = ""
    if (user.role === "1") {
      org_id = user._id
    }
    if (user.role === "2") {
      ref_orgId = user.ref_id
    }
    if (user.role === "3") {
      const agent = await User.findOne({ _id: user.ref_id })
      console.log("agent", agent)
      const admin_id = agent.ref_id
      ref_orgId = admin_id
    }

    let organization = ""

    if (user.role === "1") {
      const organizationData = {
        organizationName: req.body.organization,
        amount: reamining_amount,
        admin_id: org_id,
      }
      console.log("organizationData", organizationData)
      organization = await new Organization(organizationData).save()
    }

    if (user.role === "2") {
      let orgRemainingAmount = ""
      const orgData = await Organization.findOne({ admin_id: ref_orgId })
      // if (orgData.agentAmount == null) {
      //   orgRemainingAmount = reamining_amount
      // } else {
      const agentAmount = parseInt(orgData.amount)
      console.log("agentAmount", agentAmount, "hi", reamining_amount)
      orgRemainingAmount = agentAmount + reamining_amount
      //  }
      organization = await Organization.findOneAndUpdate(
        { admin_id: ref_orgId },
        { $set: { amount: orgRemainingAmount } },
        { new: true }
      )
    }
    if (user.role === "3") {
      let orgRemainingAmount = ""
      const orgData = await Organization.findOne({ admin_id: ref_orgId })
      // if (orgData.userAmount == null) {
      //   orgRemainingAmount = reamining_amount
      // } else {
      const userDataAmount = parseInt(orgData.amount)
      orgRemainingAmount = userDataAmount + reamining_amount
      // }
      organization = await Organization.findOneAndUpdate(
        { admin_id: ref_orgId },
        { $set: { amount: orgRemainingAmount } },
        { new: true }
      )
    }

    commissiondata = {
      user_reference_Id: user.ref_id,
      commision: commission_amount,

      organization_id: organization._id,
    }
    const commission = await new Commission(commissiondata).save()
    const arr = []
    if (user && organization && commission) {
      arr.push(user, organization, commission)

      res
        .status(200)
        .json({ data: arr, message: "data register successfully", status: 200 })
    } else {
      res.status(201).json({ error: "data not register" })
    }
  } catch (e) {
    res.status(500).json({ status: 500, message: "data not register", e: e })
    console.log(e)
  }
}

/*
 function: get User data 
*/
module.exports.getdata = async (req, res) => {
  try {
    // const data = await User.find({}).where("role").equals("0");
    const data = await User.find({})

    console.log("dataaaa", data)
    res.status(200).json({ data: data })
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports.login = async (req, res) => {
  try {
    console.log("hgh", req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email })
    console.log("user", user)
    if (user && (await bcrypt.compare(password, user.password))) {
      // console.log("tokenn", user.id)
      // const token=await user.generateToken();

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )
      console.log("token", token)
      const user2 = user.toObject()
      delete user2.password

      //   res.status(200).json({ data: user2 });

      //res.status(200).json({ data: user2, token: token });

      res.status(200).json({ data: user2, token: token, status: 200 })
    } else {
      res.status(400).json({ messege: "Invalid Credentials", status: 500 })
    }
  } catch (e) {
    res.status(500).json({ messege: "Invalid Credentials", status: 500 })
  }
}

module.exports.getProfile = async (req, res) => {
  try {
    const id = req.params.id
    const role = req.query.role
    console.log("id111", id, role)

    let user = await User.findById(id)
    console.log("user", user)

    let commisionData = 0
    let commisionDetail = []

    //  if (role === "0" || role === "1" || role === "2" || role) {
    commisionDetail = await Commission.find({
      user_reference_Id: user._id,
    })
    console.log("commisionDetail", commisionDetail)
    commisionDetail.forEach((amountCommision) => {
      console.log("amountCommision", amountCommision)
      if (amountCommision.commision) {
        var commisionData1 = amountCommision.commision
        var commisionData2 = parseInt(commisionData1)
        commisionData += commisionData2
        console.log("commision11", commisionData)
      }
    })
    // }
    let orgShareMarketData = ""
    let organizations = ""
    let organization = ""
    let organizationName = ""
    let releaseAgent = ""
    let releaseAgentData = ""
    let releaseUser = ""
    let releaseUserData = ""
    if (role === "1") {
      organizations = await Organization.findOne({ admin_id: user._id })
      organizationName = organizations.organizationName
      organization = organizations.amount ? parseInt(organizations.amount) : 0
      console.log("organization11", organization)
      orgShareMarketData = await OrgShareMarket.findOne({
        org_id: organizations._id,
      })
      console.log("orgMarket", orgShareMarketData)
    }
    if (role === "2") {
      console.log("userss", user)
      organizations = await Organization.findOne({ admin_id: user.ref_id })
      organizationName = organizations.organizationName
      organization = organizations.amount ? parseInt(organizations.amount) : 0
      console.log("organization12", organization)
    }
    if (role === "3") {
      console.log("userss", user)
      let agent = await User.findOne({ _id: user.ref_id })
      organizations = await Organization.findOne({ admin_id: agent.ref_id })
      organizationName = organizations.organizationName
      organization = organizations.amount ? parseInt(organizations.amount) : 0
      console.log("organization12", organization)
    }
    const requestUserData = await RequestUser.find({ user_id: id })
    console.log("requestUserData", requestUserData)

    if (role == "1") {
      releaseAgent = await RequestUser.find({
        role: "2",
        org_id: organizations._id,
        req_status: false,
      }).count()
      // releaseAgent = await RequestUser.aggregate([
      //   {
      //     $match: {
      //       $and: [{ role: "2" }, { org_id: organizations._id }],
      //     },
      //   },
      //   { $count: "myCount" },
      // ])
      console.log("releaseAgent", releaseAgent)

      releaseAgentData = await RequestUser.find({
        role: "2",
        org_id: organizations._id,
        req_status: false,
      })
      releaseUserData = await RequestUser.find({
        role: "3",
        org_id: organizations._id,
        req_status: false,
      })
      releaseUser = await RequestUser.find({
        role: "3",
        org_id: organizations._id,
        req_status: false,
      }).count()
      console.log("releaseAgent", releaseAgent)
    }

    if (role == "2") {
      console.log("userRefe", user.ref_id)
      const organizationsId = await Organization.findOne({
        admin_id: user.ref_id,
      })
      releaseAgent = await RequestUser.find({
        role: "2",
        org_id: organizationsId,
        req_status: false,
      }).count()
      console.log("releaseAgent", releaseAgent)
    }
    if (role == "3") {
      agentId = await User.findOne({ _id: user.ref_id })
      console.log("agentId", agentId)
      const organizationsId = await Organization.findOne({
        admin_id: agentId.ref_id,
      })
      releaseUser = await RequestUser.find({
        role: "3",
        org_id: organizationsId,
        req_status: false,
      }).count()
      console.log("releaseUser", releaseUser)
    }

    res.status(200).json({
      status: 200,
      data: user,
      commisionData: commisionData,
      organization: organization,
      organizationName: organizationName,
      requestUserData: requestUserData,
      releaseAgent: releaseAgent,
      releaseAgentData: releaseAgentData,
      releaseUser: releaseUser,
      releaseUserData: releaseUserData,
      orgShareMarketData: orgShareMarketData,
    })
  } catch (e) {
    res.status(500).json({ status: 500 })
  }
}
module.exports.getALLData = async (req, res) => {
  try {
    const id = req.params.id
    console.log("id", id)
    const user = await User.findById(id)
    console.log("role", user)

    let usersData = ""
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
    const page = req.query.page ? parseInt(req.query.page) : 0

    const asc = req.query.asc
    console.log("ascending", asc)
    // const limitValue = req.query.limit || 2
    // const skipValue = req.query.skip || 0
    // await User.createIndex({ name: "text" })
    // let searchKeyword = req.query.search

    const searchText = req.query.search
    console.log("filter", searchText)
    let superAdminData = ""
    if (user.role === "0") {
      if (searchText && !searchText.includes(null)) {
        superAdminData = usersData = await User.aggregate([
          { $match: { $text: { $search: searchText } } },
          { $match: { role: { $ne: "0" } } },
        ])
      } else {
        superAdminData = await User.find({ role: { $ne: "0" } })
      }
    } else {
      if (searchText && !searchText.includes(null)) {
        superAdminData = usersData = User.find({
          $or: [{ $text: { $search: searchText } }],
        })
        // await User.aggregate([
        //   { $match: { $text: { $search: searchText } } },
        //   { $match: { role: { $ne: "0" } } },
        //   // { $match: { role: { $nin: ["1", "2"] } } },
        // ])
      } else {
        // superAdminData = await User.find({ $or: [{ _id: id }, { ref_id: id }] })
        superAdminData = await User.find({
          ref_id: id,
        })
      }
    }

    if (user.role === "0") {
      if (asc == true) {
        if (searchText && !searchText.includes(null)) {
          usersData = await User.aggregate([
            { $match: { $text: { $search: searchText } } },
            { $match: { role: { $ne: "0" } } },
          ])
            .sort({ name: 1 })
            .limit(pageSize)
            .skip(pageSize * page)
        } else {
          usersData = await User.find({ role: { $ne: "0" } })
            .sort({ name: 1 })
            .limit(pageSize)
            .skip(pageSize * page)
        }
      } else if (asc == false) {
        if (searchText && !searchText.includes(null)) {
          // $or: [{ $text: { $search: searchText } }],
          usersData = await User.aggregate([
            { $match: { $text: { $search: searchText } } },
            { $match: { role: { $ne: "0" } } },
          ])
            .sort({ name: -1 })
            .limit(pageSize)
            .skip(pageSize * page)
        } else {
          usersData = await User.find({ role: { $ne: "0" } })
            .sort({ name: -1 })
            .limit(pageSize)
            .skip(pageSize * page)
        }
      } else {
        if (searchText && !searchText.includes(null)) {
          usersData = await User.aggregate([
            { $match: { $text: { $search: searchText } } },
            { $match: { role: { $ne: "0" } } },
          ])
            .sort({ name: 1 })
            .limit(pageSize)
            .skip(pageSize * page)
        } else {
          usersData = await User.find({ role: { $ne: "0" } })
            .sort({ name: 1 })
            .limit(pageSize)
            .skip(pageSize * page)
        }
        //   usersData = await User.find(
        //     // { $text: { $search: searchText } },
        //     { role: { $ne: "0" } }
        //   )
        //     .limit(pageSize)
        //     .skip(pageSize * page)
        // }
      }
    } else {
      usersData = await User.find({
        ref_id: id,
        // $or: [
        //   {
        //     _id: id,
        //   },
        //   {
        //     ref_id: id,
        //   },
        // ],
      })
        .limit(pageSize)
        .skip(pageSize * page)
    }
    console.log("usersData", usersData)

    res.status(200).json({
      data: usersData,
      pageSize: pageSize,
      page: page,
      status: 200,
      total: superAdminData.length,
      profile: user,
    })
  } catch (e) {
    res.status(500).send(e)
  }
}
module.exports.editUser = async (req, res) => {
  try {
    const id = req.params.id
    console.log("id", id)
    const user = await User.findById(id)
    // const user = await User.aggregate([
    //   {
    //     $match: { _id: mongoose.Types.ObjectId(id) },
    //   },

    //   {
    //     $lookup: {
    //       from: "organizations",
    //       localField: "_id",
    //       foreignField: "admin_id",
    //       as: "organization_data",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "commisions",
    //       localField: "organization_data._id",
    //       foreignField: "organization_id",
    //       as: "commision_data",
    //     },
    // },
    // ])
    console.log("data", user)
    // const user = await User.findById(id)

    res.status(200).json({ status: 200, data: user })
  } catch (e) {
    res.status(500).json({ status: 500 })
  }
}
module.exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id
    console.log("body", req.body, req.params)
    const data = {
      name: req.body.name,
      email: req.body.email,
    }
    // const updatedData = await User.findByIdAndUpdate(id, data, { new: true })
    const updatedData = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      },
      { new: true }
    )

    console.log("updatedData", updatedData)
    res.status(200).json({
      status: 200,
      data: updatedData,
      message: "data updated successfully",
    })
  } catch (e) {
    res.status(500).json({ status: 500, message: "data  not updated" })
  }
}
module.exports.deleteUser = async (req, res) => {
  try {
    console.log("hello delete", req.params.id)
  } catch (e) {
    res.status(500).json({ status: 500 })
  }
}
module.exports.sendRequest = async (req, res) => {
  try {
    console.log("bodyyyy", req.body)
    //  const
    let referenceAdmin = ""
    if (req.body.role === "3") {
      const agent = await User.findOne({ _id: req.body.ref_id })
      console.log("agent", agent)
      referenceAdmin = agent.ref_id
      console.log("admin_id", referenceAdmin)
    } else {
      referenceAdmin = req.body.ref_id
    }

    organization = await Organization.findOne({ admin_id: referenceAdmin })
    console.log("organization", organization)
    const data = {
      org_id: organization._id,
      org_name: organization.organizationName,
      user_id: req.body._id,
      user_name: req.body.name,
      role: req.body.role,
      req_status: false,
    }

    const sendRequest = await new RequestUser(data).save()
    res.status(200).json({
      status: 200,
      requestData: sendRequest,
      message: "request send successfully",
    })
  } catch (e) {
    res.status(500).json({ status: 500 })
  }
}
// module.exports.getRequest = async (req, res) => {
//   try {
//     console.log("hello")
//     // const requestUser = await RequestUser.find({ role: "2" })
//     // const requestUser = await RequestUser.find({ role: "2" }).count()

//     ///console.log("request", requestUser)
//     res.status(200).json({ data: requestUser })
//   } catch (e) {
//     res.status(500).json({ status: 500 })
//   }
// }

module.exports.realeasesUser = async (req, res) => {
  try {
    console.log("hello")

    if (req.body.role == "2") {
      const organizations = await Organization.findOne({
        _id: req.body.org_id,
      })
      console.log("organizationById", organizations)
      const organizationTotalAmount = organizations.amount
        ? parseInt(organizations.amount)
        : 0

      console.log("organization11", organizationTotalAmount)
      const superAdminAmount = (organizationTotalAmount * 5) / 100
      const adminAmount = (organizationTotalAmount * 5) / 100
      const agentAmount = (organizationTotalAmount * 40) / 100
      console.log(
        "superAdminAmount",
        superAdminAmount,
        "adminAmount",
        adminAmount,
        "agentAmount",
        agentAmount
      )
      const amountRemove = superAdminAmount + adminAmount + agentAmount
      const reamainAmount = organizationTotalAmount - amountRemove
      console.log("percentRemove", amountRemove, reamainAmount)

      const OrganizationUpdateAmount = await Organization.findOneAndUpdate(
        { _id: organizations._id },
        { $set: { amount: reamainAmount } }
      )
      const user = await User.findOne({ _id: organizations.admin_id })
      console.log("user", user)
      let superAdminCommision = {
        user_reference_Id: user.ref_id,
        commision: superAdminAmount,
        organization_id: organizations._id,
      }
      superAdminCommision = await new Commission(superAdminCommision).save()

      console.log("superAdminCommision", superAdminCommision)
      let adminCommision = {
        user_reference_Id: organizations.admin_id,
        commision: adminAmount,
        organization_id: organizations._id,
      }
      adminCommision = await new Commission(adminCommision).save()
      console.log("adminCommision", adminCommision)

      const releaseUserData = await RequestUser.find({
        role: "2",
        org_id: organizations._id,
        //status:false
      })
      const agentAmountData = agentAmount / 3
      console.log("releaseUserData", releaseUserData, agentAmountData)
      releaseUserData.forEach(async (data) => {
        console.log(data.user_id)
        let agentCommision = {
          user_reference_Id: data.user_id,
          commision: agentAmountData,
          organization_id: organizations._id,
        }
        agentCommision = await new Commission(agentCommision).save()
        console.log("agentCommision", agentCommision)
        const releaseRequestData = await RequestUser.findOneAndUpdate(
          { _id: data._id },
          { $set: { req_status: true } }
        )
      })
      res.json({
        message: "request released successfully",
        status: 200,
        adminCommision: adminCommision,
      })
    }
    if (req.body.role == "3") {
      const organizations = await Organization.findOne({
        _id: req.body.org_id,
      })
      console.log("organizationById", organizations)
      const organizationTotalAmount = organizations.amount
        ? parseInt(organizations.amount)
        : 0

      console.log("organization11", organizationTotalAmount)
      const superAdminAmount = (organizationTotalAmount * 5) / 100
      const agentAmount = (organizationTotalAmount * 10) / 100
      const userAmount = (organizationTotalAmount * 40) / 100
      console.log(
        "superAdminAmount",
        superAdminAmount,
        "agentAmount",
        agentAmount,
        "userAmount",
        userAmount
      )
      const amountRemove = superAdminAmount + agentAmount + userAmount
      const reamainAmount = organizationTotalAmount - amountRemove
      console.log("percentRemove", amountRemove, reamainAmount)

      const OrganizationUpdateAmount = await Organization.findOneAndUpdate(
        { _id: organizations._id },
        { $set: { amount: reamainAmount } }
      )
      const user = await User.findOne({ _id: organizations.admin_id })
      console.log("user", user)
      let superAdminCommision = {
        user_reference_Id: user.ref_id,
        commision: superAdminAmount,
        organization_id: organizations._id,
      }
      superAdminCommision = await new Commission(superAdminCommision).save()

      console.log("superAdminCommision", superAdminCommision)
      const releaseUserData = await RequestUser.find({
        role: "3",
        org_id: organizations._id,
      })
      const userAmountData = userAmount / 3
      console.log("releaseUserData", releaseUserData)
      releaseUserData.forEach(async (data) => {
        console.log(data.user_id)
        let userCommision = {
          user_reference_Id: data.user_id,
          commision: userAmountData,
          organization_id: organizations._id,
        }
        userCommision = await new Commission(userCommision).save()
        console.log("userCommision", userCommision)
        let agentData = await User.findOne({ _id: data.user_id })
        const agentCommisionData = agentAmount / 3

        let agentCommision = {
          user_reference_Id: agentData.ref_id,
          commision: agentCommisionData,
          organization_id: organizations._id,
        }

        agentCommision = await new Commission(agentCommision).save()
        console.log("agentCommision", agentCommision)
        const releaseRequestData = await RequestUser.findOneAndUpdate(
          { _id: data._id },
          { $set: { req_status: true } }
        )
      })
      res.json({ message: "request released successfully", status: 200 })
    }
  } catch (e) {
    res.status(500).json({ status: 500 })
  }
}

module.exports.deleteReleaseUser = async (req, res) => {
  try {
    const id = req.params.id
    const role = req.query.role
    if (role == "2") {
      userAmount = RolesAmount.userRole.agent
    }
    if (role == "3") {
      userAmount = RolesAmount.userRole.user
    }
    console.log("userAmount", userAmount)
    prizeAmount = parseInt(userAmount.prize)
    console.log("prizeAmount", prizeAmount)
    const commission_amount = (prizeAmount * userAmount.commission) / 100
    const reamining_amount = prizeAmount - commission_amount

    let ref_orgId = ""
    let organization = ""
    const user = await User.findOne({ _id: id })
    if (role === "2") {
      ref_orgId = user.ref_id
      let orgRemainingAmount = ""
      const orgData = await Organization.findOne({ admin_id: ref_orgId })
      const agentAmount = parseInt(orgData.amount)
      console.log("agentAmount", agentAmount, "hi", reamining_amount)
      orgRemainingAmount = agentAmount + reamining_amount
      organization = await Organization.findOneAndUpdate(
        { admin_id: ref_orgId },
        { $set: { amount: orgRemainingAmount } },
        { new: true }
      )
    }
    if (role === "3") {
      const agent = await User.findOne({ _id: user.ref_id })
      console.log("agent", agent)
      ref_orgId = agent.ref_id

      let orgRemainingAmount = ""
      const orgData = await Organization.findOne({ admin_id: ref_orgId })

      const userDataAmount = parseInt(orgData.amount)
      orgRemainingAmount = userDataAmount + reamining_amount

      organization = await Organization.findOneAndUpdate(
        { admin_id: ref_orgId },
        { $set: { amount: orgRemainingAmount } },
        { new: true }
      )
      console.log("organization", organization)
    }
    const commissiondata = {
      user_reference_Id: user.ref_id,
      commision: commission_amount,

      organization_id: organization._id,
    }
    const commission = await new Commission(commissiondata).save()
    console.log("commission", commission)
    let arr = []
    const requestDelete = await RequestUser.findOneAndDelete({ user_id: id })
    console.log("requestDelete", requestDelete)
    if (organization && commission && requestDelete) {
      arr.push(organization, commission, requestDelete)

      res.status(200).json({
        data: arr,
        message: "open renew request successfully",
        status: 200,
      })
    } else {
      res.status(201).json({ error: "renew request not open " })
    }
    // res.json({
    //   message: "open renew request successfully",
    //   status: 200,
    //   // requestDelete,
    // })
  } catch (error) {
    res.status(500).json({ status: 500, error: "renew request not open " })
  }
}

module.exports.shareMarketOrg = async (req, res) => {
  try {
    console.log("bodyyy", req.body)

    const organization = await Organization.findOne({
      organizationName: req.body.org,
    })
    console.log("organizaion", organization)
    // const organizationAmount = parseInt(organization.amount)

    // const tenPercent = (organizationAmount * 10) / 100
    // const orgAvailableAmount = organizationAmount - tenPercent
    // console.log("tenPercent", tenPercent, orgAvailableAmount)
    // const organizationUpdate = await Organization.findOneAndUpdate(
    //   {
    //     organizationName: req.body.org,
    //   },
    //   { amount: orgAvailableAmount },
    //   {
    //     new: true,
    //   }
    // )

    const orgInMarketExist = await OrgShareMarket.findOne({
      orgName: req.body.org,
    })
    console.log("orgInMarketExist", orgInMarketExist)
    let orgShareMarket
    if (orgInMarketExist) {
      orgShareMarket = await OrgShareMarket.findOneAndUpdate(
        { orgName: req.body.org },
        { user_share_amount: 10, status: false },
        { new: true }
      )
    } else {
      const data = {
        org_share_price: req.body.orgAmount,
        org_id: organization._id,
        orgName: organization.organizationName,
        user_id: organization.admin_id,
        status: false,
      }
      console.log("data", data)

      orgShareMarket = await new OrgShareMarket(data).save()
    }
    console.log("orgShareMarket", orgShareMarket)
    res.status(200).json({
      data: orgShareMarket,
      message: "Entering the organization in the stock market successfully",
    })
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, error: "bring org not available in shareMarket" })
  }
}
module.exports.getShareMarketOrg = async (req, res) => {
  try {
    const orgShareMarket = await OrgShareMarket.find({})
    res.status(200).json({
      data: orgShareMarket,
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}

module.exports.buySharesByUser = async (req, res) => {
  try {
    console.log("reqasdasd", req.body)
    const shares = parseInt(req.body.shares)
    const orgShareMarket = await OrgShareMarket.findOne({
      org_id: req.body.org_id,
    })
    console.log("orgShareMarket", orgShareMarket)
    if (orgShareMarket.user_share_amount > 0) {
      const availableShares = orgShareMarket.user_share_amount - shares
      let shareUpdate = ""
      if (availableShares == 0) {
        shareUpdate = await OrgShareMarket.findOneAndUpdate(
          { org_id: req.body.org_id },
          { user_share_amount: availableShares, status: true },
          { new: true }
        )
      } else {
        shareUpdate = await OrgShareMarket.findOneAndUpdate(
          { org_id: req.body.org_id },
          { user_share_amount: availableShares },
          { new: true }
        )
      }

      console.log("shareUpdate", shareUpdate)
    }

    const SharesUserData = await SharesUser.find({
      org_id: req.body.org_id,
      user_id: req.body.login_id,
    })
    console.log("SharesUserData", SharesUserData)
    let sharesAmount = 0
    let sharesUser = ""
    if (SharesUserData.length > 0) {
      SharesUserData.forEach((sharesData) => {
        console.log("ss", sharesData, shares)
        sharesAmount = sharesData.shares + shares
      })
      console.log("sharesAmount", sharesAmount)
      shareUpdate = await SharesUser.findOneAndUpdate(
        { _id: SharesUserData[0]._id },
        { shares: sharesAmount },
        { new: true }
      )
    } else {
      // console.log("SharesUserData", SharesUserData)

      const data = {
        // user_share_amount: req.body.amount,
        shares: shares,
        org_id: req.body.org_id,
        admin_id: req.body.admin_id,
        user_id: req.body.login_id,
      }
      console.log("data", data)

      sharesUser = await new SharesUser(data).save()
    }

    res.status(200).json({
      data: sharesUser,
      sharesAmount: sharesAmount,
      message: "buy shares successfully",
      status: 200,
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
module.exports.getbuySharesByUser = async (req, res) => {
  try {
    console.log("idd", req.query)
    // const id = req.query.id
    const id = mongoose.Types.ObjectId(req.query.id)
    // const sharesUser = await SharesUser.find({})
    const sharesUser = await User.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "sharesuserschemas",
          // from: "users",
          localField: "_id",
          foreignField: "user_id",
          // let: { userid: id },
          // pipeline: [
          //   { $match: { $expr: { $and: [{ $eq: ["$$userid", "$id"] }] } } },
          //   //  { $project: { stock_item: 0, _id: 0 } }
          // ],
          as: "stockdata",
        },
      },
      {
        $lookup: {
          from: "organizations",
          localField: "stockdata.org_id",
          foreignField: "_id",
          // let: { userid: id },
          // pipeline: [
          //   { $match: { $expr: { $and: [{ $eq: ["$$userid", "$id"] }] } } },
          //   //  { $project: { stock_item: 0, _id: 0 } }
          // ],
          as: "organizaions",
        },
      },
    ])
    console.log("sharesUser1111", sharesUser)
    res.status(200).json({
      data: sharesUser,
      status: 200,
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
module.exports.sharebiding1 = async (req, res) => {
  try {
    console.log("reqq", req.body)
    const amount = parseInt(req.body.amount)
    let share = ""
    share = parseInt(req.body.share)
    const sharesUser = await SharesUser.findOne({
      org_id: req.body.org,
      user_id: req.body.userId,
    })
    console.log("sharesUser", sharesUser)
    if (share) {
      const avlshare = sharesUser.shares - share
      console.log("avlshare", avlshare)
      const sharesUpdate = await SharesUser.findOneAndUpdate(
        { _id: sharesUser._id },
        { $set: { shares: avlshare } },
        { new: true }
      )
      console.log("amount", amount, share)
      const data = {
        amount: amount,
        shares: share,
        user_id: req.body.userId,
        org_id: req.body.org,
      }

      const bidingShare = await Biding.findOne({
        org_id: req.body.org,
        user_id: req.body.userId,
      })

      let sharesOfBiding = 0
      let biding = ""
      if (bidingShare) {
        sharesOfBiding = bidingShare.shares + share
        console.log("bidingShare", bidingShare, sharesOfBiding)
        biding = await Biding.findOneAndUpdate(
          { _id: bidingShare._id },
          { $set: { shares: sharesOfBiding } }
        )
      } else {
        biding = await new Biding(data).save()
        console.log("bid", biding)
      }

      res.status(200).json({
        status: 200,
        message: "biding successfully",
        data: biding,
      })
    } else {
      res.status(201).json({ status: 201, message: "select the share" })
    }
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
module.exports.getShareBiding = async (req, res) => {
  try {
    // const biding = await Biding.find({})
    const biding = await Biding.aggregate([
      {
        $lookup: {
          from: "users",
          // from: "users",
          localField: "user_id",
          foreignField: "_id",

          as: "usersData",
        },
      },
      {
        $lookup: {
          from: "organizations",
          // from: "users",
          localField: "org_id",
          foreignField: "_id",

          as: "orgData",
        },
      },
    ])
    res.status(201).json({ status: 200, data: biding })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}

module.exports.addHighestBiding = async (req, res) => {
  try {
    console.log("hghhh", req.body)
    let currentDate = new Date()
    // const count = currentDate.setHours(currentDate.getHours() + 2)
    let count = currentDate.setMinutes(currentDate.getMinutes() + 1)
    // let count = currentDate.setSeconds(currentDate.getSeconds() + 1)
    // let minute = new Date(currentDate).getMinutes() + 2
    // minute = new Date(count).toISOString()
    minute = new Date(count).toString()

    console.log("minute", minute)

    const bid = parseInt(req.body.bid)
    const HighestBidingData = await HighestBiding.findOne({
      holder_id: req.body.holder_id,
      org_id: req.body.org_id,
      user_id: req.body.user_id,
    })
    let highestBiding
    let data = {
      shares: req.body.buyshare,
      user_id: req.body.user_id,
      holder_id: req.body.holder_id,
      org_id: req.body.org_id,
      amount: req.body.amount,
      bid: bid,
      status: 1,
    }
    const AllHighestBiding = await HighestBiding.find({})
    // console.log("HighestBidingData", HighestBidingData)
    if (AllHighestBiding.length == 0) {
      data.time = minute
    } else {
      data.time = AllHighestBiding[0].time
    }
    if (HighestBidingData) {
      highestBiding = await HighestBiding.findOneAndUpdate(
        { _id: HighestBidingData._id },
        { $set: { bid: bid } },
        {
          new: true,
        }
      )
    } else {
      highestBiding = await new HighestBiding(data).save()
    }

    console.log("data", data, highestBiding)
    res.status(200).json({
      status: 200,
      data: highestBiding,
      message: "highest bid is send successfully",
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
module.exports.getHighestBiding = async (req, res) => {
  try {
    // const AllHighestBiding = await HighestBiding.find({})
    // console.log("hello")
    const AllHighestBiding = await HighestBiding.aggregate([
      {
        $group: { _id: null, max: { $max: "$bid" } },
      },
    ])
    const allData = await HighestBiding.find({})

    console.log("allData", allData)
    const dateTime = allData[0].time
    console.log("AllHighestBiding", AllHighestBiding)
    res.status(200).json({
      status: 200,
      data: AllHighestBiding,
      dateTime: dateTime,
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
module.exports.getWinner = async (req, res) => {
  try {
    const AllHighestBiding = await HighestBiding.aggregate([
      {
        $group: { _id: null, max: { $max: "$bid" } },
      },
    ])
    //const winner = await HighestBiding.findOne({ bid: AllHighestBiding[0].max })
    const winner = await HighestBiding.aggregate([
      { $match: { bid: AllHighestBiding[0].max } },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",

          as: "userdata",
        },
      },
      {
        $project: {
          _id: 1,
          bid: 1,
          "userdata._id": 1,
          "userdata.name": 1,
          "userdata.email": 1,
        },
      },
    ])
    console.log("winner", winner)
    res.status(200).json({
      status: 200,
      data: winner,
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}

module.exports.winerCountDown = async (req, res) => {
  try {
    console.log("reqqq", req.body)
    const currentDate = new Date()
    console.log("currentDate", currentDate)
    // const minute = currentDate.setHours(currentDate.getHours() + 2)
    const minute = currentDate.setMinutes(currentDate.getMinutes() + 1)
    console.log("minute", minute)
    const date = new Date(minute).toString()
    console.log("date", date)

    req.body.time = date
    console.log("reqqq", req.body)
    bid = req.body.bid_id

    const highestBiding = await HighestBiding.deleteMany({ _id: { $ne: bid } })
    console.log("highestBiding", highestBiding)

    // const highestBidder = await HighestBiding.findById(bid)
    // console.log("highestBidder", highestBidder)
    // const updateTime = await HighestBiding.updateOne(
    //   { _id: bid },
    //   { $set: { time: date } }
    // )
    const purchaseTiming = await new PurchaseTiming(req.body).save()
    console.log("purchaseTiming", purchaseTiming)
    res.status(200).json({
      status: 200,
      data: purchaseTiming,
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}

module.exports.purchaseAvlTiming = async (req, res) => {
  try {
    const avlTime = await PurchaseTiming.find({})
    // const avlTime = await HighestBiding.find({})
    res.status(200).json({
      status: 200,
      data: avlTime,
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
module.exports.purchaseBid = async (req, res) => {
  try {
    bid = req.body.bid_id
    const highestBiding = await HighestBiding.findById(bid)
    // console.log("highestBiding>>>>", highestBiding)
    const SharesUserData = await SharesUser.find({
      org_id: highestBiding.org_id,
      user_id: highestBiding.user_id,
    })
    console.log("SharesUserData", SharesUserData)
    let sharesAmount = 0
    let sharesUser = ""
    if (SharesUserData.length > 0) {
      SharesUserData.forEach((sharesData) => {
        console.log("ss", sharesData)
        sharesAmount = sharesData.shares + highestBiding.shares
      })
      console.log("sharesAmount", sharesAmount)
      sharesUser = await SharesUser.findOneAndUpdate(
        { _id: SharesUserData[0]._id },
        { shares: sharesAmount },
        { new: true }
      )
    } else {
      const organization = await Organization.findById(highestBiding.org_id)
      const data = {
        shares: highestBiding.shares,
        org_id: highestBiding.org_id,
        admin_id: organization.admin_id,
        user_id: highestBiding.user_id,
      }
      console.log("data", data)
      sharesUser = await new SharesUser(data).save()
      console.log("sharesUser", sharesUser)
    }

    const bidingShare = await Biding.findOne({
      org_id: highestBiding.org_id,
      user_id: highestBiding.holder_id,
    })
    console.log("bidingShare", bidingShare)
    let sharesOfBiding = 0
    let biding = ""
    if (bidingShare) {
      sharesOfBiding = bidingShare.shares - highestBiding.shares
      console.log("bidingShare", bidingShare, sharesOfBiding)
      if (sharesOfBiding > 0) {
        biding = await Biding.findOneAndUpdate(
          { _id: bidingShare._id },
          { $set: { shares: sharesOfBiding } }
        )
      } else {
        biding = await Biding.deleteOne({ _id: bidingShare._id })
        //   console.log("bid", biding)
      }
    }
    if (sharesUser && biding) {
      const deleteHighestBiding = await HighestBiding.deleteOne({ _id: bid })
      const deletePurchaseTiming = await PurchaseTiming.deleteMany({
        bid_id: bid,
      })
    }
    console.log("biding", biding)
    res.status(200).json({
      status: 200,
      data: { sharesUser, biding },
      message: "bid purchase successfully",
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
module.exports.removeAllBids = async (req, res) => {
  try {
    bid = req.body.bid_id
    const deleteHighestBiding = await HighestBiding.deleteOne({ _id: bid })
    const deletePurchaseTiming = await PurchaseTiming.deleteMany({
      bid_id: bid,
    })
    res.status(200).json({
      status: 200,
      data: { deleteHighestBiding, deletePurchaseTiming },
    })
  } catch (e) {
    res.status(500).json({ status: 500, error: "no data found" })
  }
}
