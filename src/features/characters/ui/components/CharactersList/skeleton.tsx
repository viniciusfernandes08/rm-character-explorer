import { FC } from "react"

type Props = {
  length: number
}

const Skeleton: FC<Props> = ({ length }) => {
  return (
    <section 
      className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 pt-4 pb-10"
    >
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg flex flex-col items-center py-2"
        >
          <div className="bg-gray-400 opacity-75 h-24 w-20 animate-pulse"></div>
          <div className="flex flex-col animate-pulse w-full h-full gap-2">
            <div className="h-4 w-full rounded-full bg-gray-400 opacity-75 mt-2"></div>
            <div className="h-4 w-full rounded-full bg-gray-400 opacity-75"></div>
          </div>
        </div>
      ))}
    </section>
  )
}

export { Skeleton }