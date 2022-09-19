import { ImageBackground } from 'react-native';

import backgroundSRC from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface Props {
    children: React.ReactNode;
}

export function Background({children}: Props) {
  return (
    <ImageBackground 
        source={backgroundSRC}
        style={styles.container}
        defaultSource={backgroundSRC}
    >
            {children}
    </ImageBackground>
  );
}