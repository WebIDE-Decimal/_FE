const usePasswordCheck = (password: string): boolean => {
  const pattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  return pattern.test(password);
};

export default usePasswordCheck;
