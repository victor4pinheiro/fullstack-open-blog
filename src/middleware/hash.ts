import bcrypt from "bcrypt";
const saltRounts = 10;

const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounts);
  } catch (error) {
    return null;
  }
};

const comparePassword = async (password: string, userPassword: string) => {
  try {
    const state = await bcrypt.compare(password, userPassword);

    if (!state)
      return false;
    return true;
  } catch (error) {
    return false;
  }
};

export { hashPassword, comparePassword };
