import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Background } from '../../components/Background';
import { GameCardProps, GamingCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';

export function Home() {
  //navigação das telas 
  const navigation = useNavigation();
  function handleOpenGame({ id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', { id, title, bannerUrl });
  }

  // Atenção ao setGames e setGames(data)
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(()=>{
    fetch('http:192.168.100.73:3333/games')
      .then(response=>response.json())
      .then(data=>setGames(data))
      .catch(err=>console.log(err))
  })

  return (
    <Background>
      <SafeAreaView style={styles.container}>
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
            <GamingCard 
              onPress={()=>handleOpenGame(item)} 
              data={item} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}