import Link from 'next/link'
import Image from 'next/image'
import styles from './itemcard.module.css'
import { Item } from '../lib/common/item.interface'
import { createImageURL } from '../lib/api/utils'
import styled from 'styled-components'

export default function Itemcard({ item }: { item: Item }) {
  return (
    <StyledContainer>
      <Link href={`/i/${item._id}`} passHref>
        <StyledCard>
          <StyledContent>
            <StyledImagecontent>
              <Image
                layout='fill'
                objectFit='cover'
                src={createImageURL(item.imageUrls ? item.imageUrls[0] : '')}
                alt=''
              ></Image>
            </StyledImagecontent>
            <StyledItemcontent>
              <StyledText>{item.title}</StyledText>
              <StyledText>{item.price} €</StyledText>
              <Divider></Divider>
              <StyledDescription>{item.description}</StyledDescription>
            </StyledItemcontent>
          </StyledContent>
        </StyledCard>
      </Link>
    </StyledContainer>
  )
}

const StyledText = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: rgb(15, 29, 14);
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
`

const StyledDescription = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 12px;
  line-height: 16px;
`

const StyledContainer = styled.div`
  width: calc(50% - 8px);
  margin: 4px;
  @media (min-width: ${props => props.theme.breakpoints.mobileL}) {
    width: calc(50% - 8px);
  }
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: calc(33% - 8px);
  }
  @media (min-width: ${props => props.theme.breakpoints.laptop}) {
    width: calc(25% - 8px);
  } ;
`

const StyledCard = styled.a`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;

  font-size: 16px;
  min-height: auto;
  border: none;
  background: none transparent;
  text-decoration: none;
  user-select: none;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  border-radius: 12px;
  border: 1px solid rgb(226, 232, 235);
`
const StyledImagecontent = styled.div`
  border-radius: 12px 12px 0px 0px;
  position: relative;
  width: 100%;
  height: 210px;
  & img {
    border-radius: 12px 12px 0px 0px;
  }
`

const StyledItemcontent = styled.div`
  background-color: white;
  padding: 8px;
  border-radius: 0 0 12px 12px;
`
const Divider = styled.div`
  box-sizing: border-box;
  display: block;
  flex: 1 1 100%;
  overflow: hidden;
  margin-left: 16px;
  margin-bottom: 8px;
`
