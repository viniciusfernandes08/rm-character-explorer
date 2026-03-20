'use client'

import { FC, ReactNode, useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion, PanInfo } from 'framer-motion'
import { IoIosClose } from 'react-icons/io'
import { useMediaQuery } from '@/shared'

type SheetProps = {
  isOpen: boolean
  toggleOpen: () => void
  children: ReactNode
  className?: string
  title: string
  titleClasses?: string
}

const Sheet: FC<SheetProps> = ({
  isOpen,
  toggleOpen,
  children,
  className,
  title,
  titleClasses,
}) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggleOpen()
    }

    const handleClickOutside = (event: MouseEvent) => {
      const modal = modalRef.current
      if (modal && !modal.contains(event.target as Node)) {
        toggleOpen()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, toggleOpen])

  const variants = useMemo(() => {
    return isDesktop
      ? {
          initial: { x: '100%', y: 0 },
          animate: { x: 0, y: 0 },
          exit: { x: '100%', y: 0 },
        }
      : {
          initial: { y: '100%', x: 0 },
          animate: { y: 0, x: 0 },
          exit: { y: '100%', x: 0 },
        }
  }, [isDesktop])

  const transition = { type: 'spring', stiffness: 420, damping: 38 }

  const dragAxis = isDesktop ? 'x' : 'y'
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 80
    if (!isDesktop) {
      if (info.offset.y > threshold || info.velocity.y > 800) toggleOpen()
    } else {
      if (info.offset.x > threshold || info.velocity.x > 800) toggleOpen()
    }
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm backdrop-filter"
          ></motion.div>
          <div
            className={`${className} fixed z-50 ${
              isDesktop
                ? 'bottom-0 right-0 w-full sm:w-80'
                : 'inset-x-0 bottom-0 w-full'
            }`}
          >
            <motion.div
              key="sheet"
              ref={modalRef}
              className="modal h-dvh flex w-full flex-col overflow-y-auto bg-white"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={transition}
              drag={dragAxis}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <div className="flex w-full items-center gap-2 pl-4 pt-4">
                <button onClick={toggleOpen} aria-label="Fechar" className='cursor-pointer'>
                  <IoIosClose
                    size={22}
                    className="rounded-lg bg-[#0267B9] text-white transition-colors"
                  />
                </button>
                <p className={titleClasses}>{title}</p>
              </div>

              <div>{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export { Sheet }
