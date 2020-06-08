module.exports = function initList (req, res, next) {
	var keystone = req.keystone;
	var backUrl = keystone.get('back url');
	if (backUrl === undefined) {
		backUrl = '/';
	}
	const roles = req.user.roles;
	req.list = keystone.list(req.params.list);
	const listItem = roles.find(item => item.name = req.list);
	if (!listItem ||listItem.canWrite) {
		return next();
	}
	req.flash('error', 'You do not  have access to' + req.params.list);
	return res.redirect(backUrl);
};
