import bcrypt from "bcrypt";
const saltRounts = 10;

const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounts);
  } catch (error) {
    return null;
  }
};

export default hashPassword;
