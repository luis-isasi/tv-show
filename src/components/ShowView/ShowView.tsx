import { useRef } from 'react'
import Image from 'next/image'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded'

import type { Show } from '@Types'
import Switch from '@Components/Switch'

const ShowView: React.FC<{ show: Show }> = ({ show }) => {
  const {
    name,
    image: { medium },
    rating: { average },
    summary,
    language,
    premiered,
  } = show
  console.log({ summary })

  // const refDiv = useRef<HTMLDivElement>(null)
  // refDiv.current.innerHTML = `${summary}`

  return (
    <article className="bg-gray-200 mb-5 flex rounded-xl">
      <Image
        loader={({ src }) => `${src}`}
        src={medium}
        width={150}
        height={150}
        unoptimized={true}
        alt={name}
      />
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
        <Switch />
      </div>
    </article>
  )
}

export default ShowView
