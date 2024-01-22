export const checkTextLength = (text: string) => {
  if (text.length > 30) {
    return text.substring(0, 30) + '...';
  }

  return text;
};
