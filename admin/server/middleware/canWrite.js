module.exports = function initList (req, res, next) {
	const roles = req.user.roles;
	const listItem = (roles || []).find(item => item.name == req.params.list);
	if (listItem && listItem.canWrite) {
		return next();
	}
	req.flash('error', 'You do not  have access to' + req.params.list);
	return res.status(400).json({ error: 'Yo do not have access', id: "-1" });
};
