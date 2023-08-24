import { Request, Response } from 'express';
import { User } from '../entities/User';
import { ds } from '../data-source';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import bcrypt from 'bcryptjs';

class UserController {
    login = async (req: Request, res: Response) => {
        // check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send("Please provide username and password");
        }

        // get user from database
        const userRepository = ds.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
            // check if encrypted password match
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(401).send("Incorrect password");
                return;
            }

            // sign JWT, valid for 1 hour
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            // send the jwt in the response
            res.send({
                "token": token,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                }
            });
        } catch (error) {
            res.status(401).send("User not found");
        }
    }

    signup = async (req: Request, res: Response) => {
        // get parameters from the body
        let { username, password, role, email } = req.body;
        let user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;

        // validate if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //check if username already exists
        const userRepository = ds.getRepository(User);
        let userExists = await userRepository.findOne({ where: { username: user.username } });
        if (userExists) {
            res.status(409).send("Username already exists");
            return;
        }

        //check if email already exists
        userExists = await userRepository.findOne({ where: { email: user.email } });
        if (userExists) {
            res.status(409).send("Email already exists");
            return;
        }

        // hash the password, to securely store on DB
        await bcrypt.hash(user.password, 8).then((hash) => {
            user.password = hash;
        });

        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send();
            return;
        }

        // if all ok, send 201 response
        res.status(201).send('User created');
    }

    changePassword = async (req: Request, res: Response) => {
        // get id from JWT
        const id = res.locals.jwtPayload.userId;

        // get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        // get user from the database
        const userRepository = ds.getRepository(User);
        try {
            const user = await userRepository.findOne({ where: { id: id } });
            if (!user) {
                res.status(401).send("User not found");
                return;
            }

            // check if old password matchs
            if (!bcrypt.compareSync(oldPassword, user.password)) {
                res.status(401).send("Old password is incorrect");
                return;
            }

            // validate model (password length)
            user.password = newPassword;
            const errors = await validate(user);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }

            // hash the new password and save
            await bcrypt.hash(user.password, 8).then((hash) => {
                user.password = hash;
            });
            await userRepository.save(user);

            res.status(200).send("Password updated");
        } catch (error) {
            console.log(error);

            res.status(401).send();
        }
    }
}

export default new UserController();