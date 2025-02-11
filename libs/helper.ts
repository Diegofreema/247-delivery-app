export const checkTextLength = (text: string, length = 30) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }

  return text;
};
