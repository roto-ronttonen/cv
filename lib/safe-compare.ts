// Avoid timing attacks with safecompare
// https://security.stackexchange.com/questions/83660/simple-string-comparisons-not-secure-against-timing-attacks
export const safeCompare = (str1: string, str2: string) => {
  try {
    const arr1 = str1.split('');
    const arr2 = str2.split('');
    arr1.forEach((item, index) => {
      if (item !== arr2[index]) {
        throw new Error('Mismatch');
      }
    });
  } catch (e) {
    return false;
  }
  return true;
};
