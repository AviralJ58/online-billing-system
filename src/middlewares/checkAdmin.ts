import { Request, Response, NextFunction } from "express";
import { ds } from "../data-source";
import { User } from "../entities/User";

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = ds.getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });
        if (user.role === "admin") {
            next();
        } else {
            res.status(401).send("Only admins can access this route");
        }
    } catch (error) {
        res.status(401).send("Only admins can access this route");
    }
}