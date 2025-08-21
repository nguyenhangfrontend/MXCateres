export type loginFormPropsType = {
  onLogin: (values: loginFormType) => void;
};
export type loginFormType = {
  email: string;
  password: string;
};
