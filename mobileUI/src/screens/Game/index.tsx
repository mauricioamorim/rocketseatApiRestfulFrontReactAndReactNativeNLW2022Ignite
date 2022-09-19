import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react';

import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch' 

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {
  // Atenção ao setGames e setAdsense(data)
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [ discordDuoSelected, setDiscordDuoSelected ] = useState('');

  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.navigate('home')
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http:192.168.100.73:3333/ads/${adsId}/discord`)
    .then(response=>response.json())
    .then(data=>setDiscordDuoSelected(data.discordId))
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    fetch(`http:192.168.100.73:3333/games/${game.id}/ads`)
      .then(response=>response.json())
      .then(data=>setDuos(data))
      .catch(err=>console.log(err))
  })


  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo 
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image 
              source={logoImg}
              style={styles.logo}
            />

            <View style={styles.right} />
          </View>

          <Image 
            source={{uri: game.bannerUrl}}
            style={styles.bannerUrl}
            resizeMode="cover"
          />

          <Heading 
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
          />

          <FlatList 
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard 
                data={item} 
                onConnect={()=>getDiscordUser(item.id)}
                />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.empatyListContent]}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={()=>(
              <Text style={styles.emptyListText}>
                Não há anúncio publicado ainda
              </Text>
            )}
          />

          <DuoMatch 
            visible={discordDuoSelected.length > 0}
            onClose={()=>{setDiscordDuoSelected('')}}
            discord={discordDuoSelected}
           />
        </SafeAreaView>
    </Background>
  );
}