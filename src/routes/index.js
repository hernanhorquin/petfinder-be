const express = require('express');
const authRoute = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
    { path: '/auth', route: authRoute },
];

// const authRoutes = [
//     { path: '/user', route: userRoute },
//     { path: '/company', route: companyRoute }
// ]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

// authRoutes.forEach((route) => {
//     router.use(route.path, passport.authenticate('jwt', { session: false }), route.route);
// });

module.exports = router;