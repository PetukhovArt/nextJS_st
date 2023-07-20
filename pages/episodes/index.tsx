import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {API} from 'assets/api/api';
import {EpisodeType, ResponseType} from 'assets/api/rick-and-morty-api';
import {Header} from 'components/Header/Header';
import {Card} from 'components/Card/Card';
import {getLayout} from 'components/Layout/BaseLayout/BaseLayout';
import Locations from 'pages/locations';


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

  const episodesList=episodes.results.map(e=> <Card key={e.id} name={e.name}/>)

  return <PageWrapper>
    {episodesList}
  </PageWrapper>
}
Episodes.getLayout = getLayout
export default Episodes