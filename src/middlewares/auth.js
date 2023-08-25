export function isUser(req, res, next) {
    if (req.session.user && req.session.user.role === 'user') {
        return next();
    } else {
        return res.status(403).json({ error: 'Access denied. Only users are allowed.' });
    }
};

export function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ error: 'Access denied. Only admins are allowed.' });
    }
};