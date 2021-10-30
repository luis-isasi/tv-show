import { useState } from 'react'
import Image from 'next/image'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded'

import { useContextFavoriteShow } from '@Context/contextFavoriteShow'
import useResponsive from '@Hooks/useResponsive'
import { MEDIAQUERY_SM } from '@Constants'
import type { Show } from '@Types'
import Switch from '@Components/Switch'
import ModalShowInfo from '@Components/modals/ModalShowInfo'

const ShowView: React.FC<{ show: Show; isFavorite: boolean }> = ({
  show,
  isFavorite,
}) => {
  const { addNewFavoriteShow, deleteFavoriteShow } = useContextFavoriteShow()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const isMobile = useResponsive({
    maxMediaQuery: MEDIAQUERY_SM,
  })

  const {
    name,
    image,
    rating: { average },
    language,
    premiered,
  } = show

  const handleClickSwitch = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (isFavorite) {
      deleteFavoriteShow(show.id)
    } else {
      addNewFavoriteShow(show)
    }
  }

  const handleClickShow = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <article
        onClick={handleClickShow}
        className="bg-gray-200 mb-5 flex flex-col sm:flex-row rounded-xl hover:cursor-pointer"
      >
        {image?.medium ? (
          <Image
            layout={isMobile ? 'responsive' : 'fixed'}
            loader={({ src }) => `${src}`}
            src={image.medium}
            width={isMobile ? 200 : 150}
            height={isMobile ? 350 : 150}
            unoptimized={true}
            alt={name}
          />
        ) : (
          <div className="w-36 h-36 bg-gray-200 flex justify-center items-center text-center text-sm">
            Image Not Found 😕
          </div>
        )}
        <div className="flex-1 px-4 py-2 flex justify-between items-center">
          <div className="">
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="text-xs flex flex-col">
              <div className="my-2 flex items-center">
                <DateRangeRoundedIcon style={{ fontSize: '20px' }} />
                <span className="ml-1">{premiered}</span>
              </div>
              <div className="flex items-center">
                <span>{language}</span>
                <div className="flex items-center ml-2">
                  <StarRoundedIcon className="fill-current text-yellow-400" />
                  <span>{average}</span>
                </div>
              </div>
            </div>
          </div>
          <Switch isActive={isFavorite} handleClick={handleClickSwitch} />
        </div>
      </article>
      {isOpenModal && (
        <ModalShowInfo
          isFavorite={isFavorite}
          show={show}
          handleIsOpenModal={handleClickShow}
        />
      )}
    </>
  )
}

export default ShowView
