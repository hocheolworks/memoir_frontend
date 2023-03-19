export const resetToken = () => {
  sessionStorage.removeItem("token");
};

export const getToken = () => sessionStorage.getItem("token") ?? "";
export const setToken = (token: string) =>
  sessionStorage.setItem("token", token);
