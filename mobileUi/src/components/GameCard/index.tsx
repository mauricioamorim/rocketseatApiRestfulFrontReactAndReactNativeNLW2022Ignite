import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
    id: string;
    title: string;
    _count: {
      adsenses: number;
    }
    bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps
}

export function GamingCard({data, ...rest}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        <ImageBackground 
            style={styles.cover}
            source={{uri:data.bannerUrl}}
        >
          
          <LinearGradient 
            colors={THEME.COLORS.FOOTER}
            style={styles.footer}
          >
            <Text style={styles.name}>
              {data.title}
            </Text>
            <Text style={styles.ads}>
              {data._count.adsenses} anúncios
            </Text>
          </LinearGradient>

        </ImageBackground>
    </TouchableOpacity>
  );
}