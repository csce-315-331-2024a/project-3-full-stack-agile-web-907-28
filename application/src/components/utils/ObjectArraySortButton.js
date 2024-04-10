import {Button} from "@nextui-org/react";
import {FaArrowDown19, FaArrowDownAZ, FaArrowUp19, FaArrowUp91, FaArrowUpAZ, FaArrowUpZA} from "react-icons/fa6";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {SortProperties} from "@/react-hooks/useSortedArray";

/**
 * Button element imitating slicer functionality (allows sorting & switching sort order).
 * @param sortKey {SortProperties} The sort properties to use when this button is selected.
 * @param sortProps {SortProperties} The sort properties from useSortedArray().
 * @param onSortPropsChange {(SortProperties) => void} Callback function when changing sort properties.
 * @param children Children.
 * @param type {"az" | "19" | "plain" | "none"} Which type of arrow to use.
 * @param props Properties passed to Button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ObjectArraySortButton({sortKey, sortProps, onSortPropsChange, children, type, ...props}) {
  return (
    <Button
      onClick={() => {
        if (sortProps.key === sortKey.key) {
          onSortPropsChange(new SortProperties(sortKey.compareFn, sortKey.key, sortProps.order === "asc" ? "desc" : "asc"));
        } else {
          onSortPropsChange(sortKey);
        }
      }}
      endContent={
        (sortProps.key === sortKey.key) ? (
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
