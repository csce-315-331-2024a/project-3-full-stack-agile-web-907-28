/**
 * Component representing a set of items which should be laid out in a grid.
 * @param children The items to lay out in a grid.
 * @param args Arguments passed to the enclosing div (for example, key).
 * @returns {JSX.Element} The grid of items.
 * @constructor
 */
export default function ItemGrid({ children, ...args }) {
  return (
    <div className="p-3 px-9" {...args}>
      <div className="gap-2 grid grid-cols-3 sm:grid-cols-6">
        { children }
      </div>
    </div>
  )
}
