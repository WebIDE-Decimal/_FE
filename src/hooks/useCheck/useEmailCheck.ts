const useEmailCheck = (email: string): boolean => {
  const pattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/;
  return pattern.test(email);
};
export default useEmailCheck;
