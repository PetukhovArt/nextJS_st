import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {API} from 'assets/api/api';
import {CharacterType, ResponseType} from 'assets/api/rick-and-morty-api';
import {Header} from 'components/Header/Header';
import {CharacterCard} from 'components/Card/CharacterCard/CharacterCard';
import Episodes from 'pages/episodes';
import {getLayout} from 'components/Layout/BaseLayout/BaseLayout';

export const getStaticProps = async () => {
  const characters = await API.rickAndMorty.getCharacters()
  return {props: {characters}}
}

type PropsType = {
  characters: ResponseType<CharacterType>
}

const Characters = ({characters}: PropsType) => {

  const charactersList=characters.results.map(c=> <CharacterCard key={c.id} character={c}/>)

  return <PageWrapper>
    {charactersList}
  </PageWrapper>
}

Characters.getLayout = getLayout
export default Characters
