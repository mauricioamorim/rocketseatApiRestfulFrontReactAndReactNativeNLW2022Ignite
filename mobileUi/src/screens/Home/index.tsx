import { View, Image, FlatList } from 'react-native';
import { GamingCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { GAMES } from '../../utils/games';

import logoImg from '../../assets/logo-nlw-esports.png';



export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
        title="Encontre seu duo!" 
        subtitle='Selecione o game que deseja jogar...'
      ></Heading>

      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GamingCard data={item} />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}