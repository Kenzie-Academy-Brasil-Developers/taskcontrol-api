import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { AppError } from "../errors";
import { createSession, returnSession } from "../interfaces/session.interface";

export class SessionService {

    public login = async({name, email, password}: createSession): Promise<returnSession> => {

        const foundUser = await prisma.user.findFirst({where: {email}})
    
        if(!foundUser){
            throw new AppError("User not exists!", 404)
        }

        const passwordMatch = await compare(password, foundUser.password)
        if(!passwordMatch){
            throw new AppError("Email and password doesn't match", 401)

        }

        const secret = process.env.SECRET_KEY!;
        const expiresIn = process.env.EXPIRES_IN!;

        const token = sign({id: foundUser.id, }, secret, {
            expiresIn,
            subject: foundUser.email,
        })

        return { token };
    }
}
