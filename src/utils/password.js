import bcrypt from 'bcryptjs'


export const hashearPassword = async ({ password, salt = 10 } = {}) => {
    return await bcrypt.hash(password, salt);
}

export const evaluarPassword = async ({ password, hashPassword }) => {
    return await bcrypt.compare(password, hashPassword);
}