import {
  ChevronRight,
  Folder,
  FileText,
} from "lucide-react"

import { useState } from "react"

const FolderNode = ({
  item,
  level = 0,
  activePage,
  setActivePage,
}) => {
  const hasChildren =
    Array.isArray(item.children) &&
    item.children.length > 0

  const [open, setOpen] = useState(
    item.id === "projects-folder" ||
    item.id === "stack-folder"
  )

  const isActive =
    !hasChildren &&
    activePage === item.id

  const handleClick = () => {
    if (hasChildren) {
      setOpen((previous) => !previous)
      return
    }

    setActivePage(item.id)
  }

  return (
    <div>

      {/* ITEM */}
      <button
        type="button"
        onClick={handleClick}
        className={`
          group
          relative
          w-full
          min-h-10
          flex
          items-center
          justify-between
          rounded-lg
          text-sm

          transition-colors
          duration-200
          ease-out

          ${
            isActive
              ? "bg-white/[0.09]"
              : "hover:bg-white/[0.045]"
          }
        `}
        style={{
          paddingLeft: `${10 + level * 18}px`,
          paddingRight: "10px",
        }}
      >

        <div className="flex items-center gap-2 min-w-0">

          {/* CHEVRON */}
          {hasChildren ? (
            <ChevronRight
              size={13}
              className={`
                shrink-0
                text-neutral-500

                transition-transform
                duration-200
                ease-out

                ${
                  open
                    ? "rotate-90"
                    : "rotate-0"
                }
              `}
            />
          ) : (
            <span className="w-[13px] shrink-0" />
          )}


          {/* ICON */}
          {hasChildren ? (
            <Folder
              size={15}
              className={`
                shrink-0
                transition-colors
                duration-200

                ${
                  open
                    ? "text-neutral-300"
                    : "text-neutral-600 group-hover:text-neutral-400"
                }
              `}
            />
          ) : (
            <FileText
              size={14}
              className={`
                shrink-0
                transition-colors
                duration-200

                ${
                  isActive
                    ? "text-white"
                    : "text-neutral-600 group-hover:text-neutral-400"
                }
              `}
            />
          )}


          {/* NAME */}
          <span
            className={`
              truncate
              transition-colors
              duration-200

              ${
                isActive
                  ? "text-white"
                  : level === 0
                    ? "text-neutral-300 group-hover:text-white"
                    : "text-neutral-500 group-hover:text-neutral-300"
              }
            `}
          >
            {item.name}
          </span>

        </div>

      </button>


      {/* CHILDREN */}
      {hasChildren && (
        <div
          className={`
            grid

            transition-[grid-template-rows,opacity]
            duration-200
            ease-out

            ${
              open
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >

          <div className="overflow-hidden">

            <div className="relative">

              {/* TREE LINE */}
              <div
                className="absolute top-0 bottom-2 w-px bg-white/[0.06]"
                style={{
                  left: `${24 + level * 18}px`,
                }}
              />


              {/* CHILD ITEMS */}
              {item.children.map((child) => (
                <FolderNode
                  key={child.id}
                  item={child}
                  level={level + 1}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              ))}

            </div>

          </div>

        </div>
      )}

    </div>
  )
}


const FolderTree = ({
  items,
  activePage,
  setActivePage,
}) => {
  return (
    <div className="space-y-0.5">

      {items.map((item) => (
        <FolderNode
          key={item.id}
          item={item}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      ))}

    </div>
  )
}

export default FolderTree