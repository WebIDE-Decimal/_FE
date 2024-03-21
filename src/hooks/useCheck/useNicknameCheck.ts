const useNicknameCheck = (nickname: string) => {
  const pattern = /^\S{2,15}$/;
  return pattern.test(nickname);
};

export default useNicknameCheck;
