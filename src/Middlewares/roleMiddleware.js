function authorize(requiredRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const hasRole = requiredRoles.some(r => req.user.roles?.includes(r));
    if (!hasRole) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}
