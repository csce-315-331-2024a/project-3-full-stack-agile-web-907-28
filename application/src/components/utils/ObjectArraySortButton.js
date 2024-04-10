import {Button} from "@nextui-org/react";
import {FaArrowDown19, FaArrowDownAZ, FaArrowUp19, FaArrowUp91, FaArrowUpAZ, FaArrowUpZA} from "react-icons/fa6";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

/**
 * Button element imitating slicer functionality (allows sorting & switching sort order).
 * @param prop {string} The object property to sort by when this element is selected.
 * @param sortProps {Object} The sort properties from useObjectArraySorter.
 * @param onSortPropsChange {(Object) => void} Callback function when changing sort properties.
 * @param children Children.
 * @param type {"az" | "19" | "plain" | "none"} Which type of arrow to use.
 * @param props Properties passed to Button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ObjectArraySortButton({prop, sortProps, onSortPropsChange, children, type, ...props}) {
  return (
    <Button
      onClick={() => {
        if (sortProps.key === prop) {
          onSortPropsChange({key: prop, order: sortProps.order === "asc" ? "desc" : "asc", enable: true});
        } else {
          onSortPropsChange({key: prop, order: "asc", enable: true});
        }
      }}
      endContent={
        (sortProps.key === prop) ? (
          (type === "az") ? (
            (sortProps.order === "asc") ? <FaArrowDownAZ /> : <FaArrowUpZA />
          ) : (type === "19") ? (
            (sortProps.order === "asc") ? <FaArrowDown19 /> : <FaArrowUp91 />
          ) : (type === "plain") ? (
            (sortProps.order === "asc") ? <FaArrowDown /> : <FaArrowUp />
          ) : (
            <></>
          )
        ) : (
          <></>
        )
      }
      variant="light"
      size="sm"
      {...props}
    >
      {children}
    </Button>
  )
}
