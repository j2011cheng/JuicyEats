const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const Users = require('../data/users');

const accessExp = '15m';
const refreshExp = '1m';

exports.login = asyncHandler(async (req, res) => {

    const { username, password } = req.body;
    // check both fields filled
    if (!username || !password) {
        return res.status(400).send('Username and Password required');
    }

    // check username
    const user = await Users.findOne({ username }).exec();
    if (!user) {
        return res.status(401).send('Username does not exist');
    }

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).send('Incorrect password');
    }

    const accessToken = jwt.sign(
        {
            'UserInfo': {
                'username': user.username,
                'roles': user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: accessExp }
    );

    const refreshToken = jwt.sign(
        { 'username': user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: refreshExp }
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken, id: user._id });
});

exports.refresh = (req, res) => {
    // check for jwt cookie
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).send();
    }
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).send();
            }

            // check for user
            const user = await Users.findOne({ username: decoded.username });
            if (!user) {
                return res.status(401).send();
            }

            const accessToken = jwt.sign(
                {
                    'UserInfo': {
                        'username': user.username,
                        'roles': user.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: accessExp }
            );

            res.status(200).json({ accessToken });
        })
    )
};

exports.logout = (req, res) => {
    // check for jwt cookie
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(204).send();
    }
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });
    res.status(200).send('Cookie cleared');
};

exports.check = (req, res, next) => {
    // check valid authheader
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).send;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).send();
            }
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
};