import { useRef, useLayoutEffect } from 'react'

import Image from 'next/image'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'

import { useContextFavoriteShow } from '@Context/contextFavoriteShow'
import ButtonPrimary from '@Components/buttons/ButtonPrimary'
import ModalBase from './ModalBase'
import type { Show } from '@Types'

interface Props {
  isFavorite: boolean
  handleIsOpenModal: () => void
  show: Show
}

const ModalShowInfo: React.FC<Props> = ({
  handleIsOpenModal,
  show,
  isFavorite,
}) => {
  const { addNewFavoriteShow, deleteFavoriteShow } = useContextFavoriteShow()
  const divRef = useRef<HTMLDivElement>(null)

  const { name, image, summary } = show

  useLayoutEffect(() => {
    divRef.current.innerHTML = `${summary}`
  }, [])

  const handleClick = () => {
    if (isFavorite) {
      deleteFavoriteShow(show.id)
    } else {
      addNewFavoriteShow(show)
    }
  }

  return (
    <ModalBase className="bg-gray-400/30 backdrop-filter backdrop-blur-sm flex sm:justify-center sm:items-center">
      <div className="overflow-y-auto">
        <div className="bg-gray-200 max-w-2xl max-h-screen overflow-y-auto  sm:h-auto shadow-2xl p-5 relative flex flex-col items-center rounded-md mx-auto">
          <button
            type="button"
            name="closeModal"
            onClick={handleIsOpenModal}
            className="absolute top-2 right-2"
          >
            <HighlightOffRoundedIcon />
          </button>
          <h3 className="text-2xl font-bold">{name}</h3>
          <div className="mt-3">
            <Image
              layout="intrinsic"
              loader={({ src }) => `${src}`}
              src={image.medium}
              width={220}
              height={300}
              unoptimized={true}
              alt={name}
            />
          </div>
          <div className="flex flex-col items-center mb-4">
            {show.externals?.imdb && (
              <a
                target="_blank"
                href={`https://www.imdb.com/title/${show.externals.imdb}`}
                rel="noreferrer"
                className="text-xs mb-4 underline"
              >
                Ver en IMDB
              </a>
            )}
            <div ref={divRef} className="text-center" />
          </div>
          <ButtonPrimary onClick={handleClick}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </ButtonPrimary>
        </div>
      </div>
    </ModalBase>
  )
}

export default ModalShowInfo
