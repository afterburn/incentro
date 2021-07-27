import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import getImageUrl from '../utils/get-image-url'

const List = styled(({ className, title, data }) => {
  return <div className={className}>
    <h2>{title}</h2>
    <div className='items'>
      {data.length > 0 && data.map((item, i) => 
        <ListItem
          key={i}
          data={item}
        />
      )}
      {data.length === 0 &&
        <p>No result(s).</p>
      }
    </div>
  </div>
})`
  h2 {
    display: block;
    padding: 8px;
  }

  .items {
    padding: 8px 0;
  }
`

const ListItem = styled(({ className, data }) => {
  const { name, album, popularity } = data

  return <div className={className}>
    <div className='content'>
      <div className='album-cover' />
      <div className='info'>
        <Link to={`/${data.type}/${data.id}`}>
          <span>{name}</span>
        </Link>
        <div className='artists'>
        {data.artists.map((artist, i) => {
          return <Link to={`/${artist.type}/${artist.id}`} key={i}>{artist.name}</Link>
        })}
        </div>
      </div>
      <div>
        <Link to={`/${album.type}/${album.id}`}>{album.name}</Link>
      </div>
      <div>
        {album.release_date}
      </div>
      <div>
        {popularity} / 100
      </div>
    </div>
  </div>
})`
  padding: 8px;
  cursor: pointer;

  a:hover {
    text-decoration: underline;
  }

  .content {
    display: flex;
    align-items: center;

    > div {
      margin-right: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:last-of-type {
        display: flex;
        justify-content: flex-end;
      }

      &:nth-of-type(1) {}
      &:nth-of-type(2) {
        width: calc((100% / 12 * 4) - 8px);
      }
      &:nth-of-type(3) {
        width: calc((100% / 12 * 4) - 8px);
      }
      &:nth-of-type(4) {
        width: calc((100% / 12 * 2) - 8px);
      }
      &:nth-of-type(5) {
        width: calc((100% / 12 * 2) - 8px);
      }
    }

    .info {
      display: flex;
      flex-direction: column;

      .artists {
        a {
          margin-right: 4px;
        }
      }
    }

    .album-cover {
      width: 30px;
      height: 30px;
      background-image: url(${props => getImageUrl(props.data.album.images)});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: var(--borderRadius);
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }
`

export default List