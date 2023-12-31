import { LinearGradient } from 'expo-linear-gradient';

export const LinearComponent = (): JSX.Element => {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.48)']}
      style={{ flex: 1 }}
    />
  );
};
