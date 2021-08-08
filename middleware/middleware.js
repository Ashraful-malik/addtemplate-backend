function UserRole(...role) {
  return (req, res, next) => {
    if (!role.includes(req.body.role)) {
      return res.send("you are not allow to access this.");
    }
    next();
  };
}

module.exports = {
  UserRole,
};
