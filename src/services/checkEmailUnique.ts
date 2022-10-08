import { ErrorHandler } from './../utils/helpers/errorHandler';
import { prisma } from './../../prisma/prisma-client';
export const emailUniqueness = async(email: string): Promise<void> => {

    const existingUserEmail = await prisma.user.findUnique({
        where: { email },
        select: { id: true }
    })

    if(existingUserEmail) throw new ErrorHandler('Email already in use', 401);
}