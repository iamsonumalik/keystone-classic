module.exports = function initList (req, res, next) {
	var keystone = req.keystone;
	var backUrl = keystone.get('back url');
	if (backUrl === undefined) {
		backUrl = '/';
	}
	const roles = req.user.roles;
	const listItem = (roles || []).find(item => item.name == req.params.list);
	if (listItem && (listItem.canRead || listItem.canWrite)) {
		return next();
	}else {
		req.flash('error', 'You do not  have access to' + req.params.list);
		return res.status(400).json({ error: 'Yo do not have access', id: "-1" });
	}
};
