import Image from 'next/image'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded'

import { useContextFavoriteShow } from '@Context/contextFavoriteShow'
import type { Show } from '@Types'
import Switch from '@Components/Switch'

const ShowView: React.FC<{ show: Show; isFavorite: boolean }> = ({
  show,
  isFavorite,
}) => {
  const { addNewFavoriteShow, deleteFavoriteShow } = useContextFavoriteShow()

  const {
    name,
    image,
    rating: { average },
    summary,
    language,
    premiered,
  } = show

  const handleClick = () => {
    if (isFavorite) {
      deleteFavoriteShow(show.id)
    } else {
      addNewFavoriteShow(show)
    }
  }

  return (
    <article className="bg-gray-200 mb-5 flex rounded-xl">
      {image?.medium ? (
        <Image
          loader={({ src }) => `${src}`}
          src={image.medium}
          width={150}
          height={150}
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
        <Switch isActive={isFavorite} handleClick={handleClick} />
      </div>
    </article>
  )
}

export default ShowView
