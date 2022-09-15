import { View, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { GameCardProps, GamingCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

export function Home() {

  // Atenção ao setGames e setGames(data)
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(()=>{
    fetch('http:192.168.100.73:3333/games')
      .then(response=>response.json())
      .then(data=>setGames(data))
      .catch(err=>console.log(err))
  })

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
        data={games}
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