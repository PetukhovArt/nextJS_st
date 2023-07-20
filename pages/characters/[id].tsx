import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {API} from 'assets/api/api';
import {CharacterType} from 'assets/api/rick-and-morty-api';
import {CharacterCard} from 'components/Card/CharacterCard/CharacterCard';
import {getLayout} from 'components/Layout/BaseLayout/BaseLayout';
import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';

export  const getStaticPaths: GetStaticPaths = async () => {

	const {results} = await API.rickAndMorty.getCharacters()
	const paths=results.map(char => ({
			params: {id: String(char.id)}
}))
	return {
		paths,
		fallback: 'blocking',
		// or fallback: true , use with router
	}
}
export const getStaticProps: GetStaticProps = async ({params}) => {
	const {id} = params || {}
	const character = await API.rickAndMorty.getCharacter(id as string)
	if (!character) {
		return {notFound: true}
	}
	return {props: {character}}
}

type PropsType = {
	character: CharacterType
}

const Character = ({character}: PropsType) => {

	const router = useRouter()
	const charId = router.query.id //id берется из названия файла [id]
	// так достаем параметры из урла

	if (router.isFallback) return <h1>Loading...</h1>

	const goToChars = () => {
		return router.push('/characters')
	}

	return (
		<PageWrapper>
			<Container>
				<Button onClick={goToChars}>go to characters</Button>
				<IdText>ID: {charId}</IdText>
				<CharacterCard key={character.id} character={character}/>
			</Container>
		</PageWrapper>
	)
}

Character.getLayout = getLayout
export default Character

const IdText=styled.div`
font-size: 48px;
`
const Button=styled.button`
	width: 200px;
	height: 50px;
	border-radius: 10px;
	cursor: pointer;
	
	&:hover {
		background-color: #529bfa;
		transition: 0.3s;
	}
`
const Container=styled.div`
display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
	justify-content: center;
`
