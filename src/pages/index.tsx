import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Button, Box, Flex, Stack, Image, Text } from '@chakra-ui/react'

type ListProps = {
  name: string;
  url: string;
}

interface PokeProps {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  }
  types: {
    type: {
      name: string;
    }
  }[]
}

const Home: NextPage = () => {

  const [PokeList, setPokeList] = useState([])
  const [PokeShowing, setPokeShowing] = useState<PokeProps>()

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=300')
      .then(res => res.json())
      .then(res => setPokeList(res.results))


  }, [])

  const getPokemon = async (url: string) => {
    const response = await fetch(url)
    const pokemon = await response.json()
    setPokeShowing(pokemon)
  }

  console.log(PokeList)
  console.log(PokeShowing)

  return (
    <div>
      <Flex w='100vw' align='center' justify='center' h='5vh'>
        <Text>Pokedex!</Text>
      </Flex>
      <Head>
        <title>PokeTest!</title>
      </Head>
      <Flex w='100vw' p='300px' h='95vh' align='center' justify='center' >
        <Flex bg='brand.800' borderRadius='3xl' px='4' justify='space-between' w='50vw' align='center'>
          <Flex maxWidth={800}
            px='10'
            py='4'
            maxHeight={500}
            overflow='scroll'
            overflowX='hidden'
            flexDirection='column'
            borderColor='#9b9b9b'
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
                background: '#fff'
              }
            }}
          >
            <Stack spacing='4'>
              {PokeList.map((item: ListProps, idx) => (
                <Button key={idx} p='6' bg='brand.700'  onClick={async () => await getPokemon(item.url)}>
                  {item.name}
                </Button>
              ))}
            </Stack>
          </Flex>
          {PokeShowing != undefined ? (
            <Flex bg='blue.300' border='8px' borderRadius='3xl' borderColor='blue.500' w='30vw' h='50vh' flexDirection='column' align='center' justify='center'>
              <Text>{PokeShowing.name}</Text>
              <Image src={PokeShowing.sprites.front_default} alt={PokeShowing.name} w='200px' h='200px' />
              <Text>{PokeShowing.types[0].type.name}</Text>
            </Flex>) :
            ''
          }
        </Flex>
      </Flex>
    </div>
  )
}

export default Home
