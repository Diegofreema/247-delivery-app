export const checkTextLength = (text: string) => {
  if (text.length > 37) {
    return text.substring(0, 37) + '...';
  }

  return text;
};
