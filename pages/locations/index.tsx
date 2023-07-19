import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {API} from 'assets/api/api';
import {CharacterType, EpisodeType, ResponseType} from 'assets/api/rick-and-morty-api';
import {Header} from 'components/Header/Header';
import {notFound} from 'next/navigation';


type PropsType = {
  episodes: ResponseType<EpisodeType>
}
export const getServerSideProps = async () => {
  const episodes = await API.rickAndMorty.getEpisodes()

  if (!episodes) {
    return {
      notFound: true
    }
  }

  return {props: {episodes}}
}


const Episodes = ({episodes}: PropsType) => {

  const episodesList=episodes.results.map(e=> <div key={e.id}>{e.name}</div>)

  return <PageWrapper>
    <Header/>
    {episodesList}
  </PageWrapper>
}

export default Episodes