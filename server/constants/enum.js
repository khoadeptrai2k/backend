const RequestSTT = {
  PENDING: "Pending",
  APPROVE: "Approve",
  REJECT: "Reject",
  CANCEL: "Cancel",
  CHANGE_REQUEST: "Change Request",
  UPDATE: "Update",
};

const Role = {
  STAFF: "Staff",
  ADMIN: "Admin",
  MANAGER: "Manager",
};

const TypeHistory = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  APPROVE: "APPROVE",
  REJECT: "REJECT",
  CHANGE_REQUEST: "CHANGE_REQUEST",
  CANCEL: "CANCEL",
};

module.exports = { RequestSTT, Role, TypeHistory };
