import { PassportStatic } from 'passport';
import { Request } from 'express';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/userModel.js';

const passportSetup = (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: cookieExtractor,
                secretOrKey: process.env.JWT_SECRET,
            },
            async function (jwt_payload, done) {
                try {
                    const foundUser = await User.findOne({
                        _id: jwt_payload.userId,
                    })
                        .select('-password')
                        .exec();
                    if (foundUser) {
                        return done(null, foundUser as any); // req.user <= foundUser
                    } else {
                        return done(null, false, {
                            message: '未授權 token failed',
                        });
                    }
                } catch (e) {
                    return done(e, false, {
                        message: '未授權 no token',
                    });
                }
            }
        )
    );
};

const cookieExtractor = (req: Request): null | string => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

export default passportSetup;
