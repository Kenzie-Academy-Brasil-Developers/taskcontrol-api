import {compare, hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { TUser, TUserCreate, TUserReturn } from "../interfaces";
import { userReturnSchema } from "../schemas";

export class UserService {

    public create = async( payload: TUserCreate): Promise<TUserReturn> => {

        payload.password = await hash(payload.password, 10);

        const newUser = await prisma.user.create({
            data: payload
        })

        return userReturnSchema.parse(newUser);
    }

    public retrieveUser = async (payload: number): Promise<TUserReturn> => {

        const foundUser = await prisma.user.findFirst({where: {id: payload}})

        return userReturnSchema.parse(foundUser);
    }

    // public read = async(userId: number): Promise<Array<TUserReturn>> => {

    //     const getUser = await prisma.user.findFirst({where: {id: userId}});

    //     return getUser;

    // }

}

