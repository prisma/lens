import { CollectionChildren } from "@react-types/shared"
import last from "lodash-es/last"
import isFunction from "lodash-es/isFunction"

/**
 * A hook that parses collection children into Options and the Footer
 * @param children
 * @returns
 */
export function useCollectionComponents<T>({
  children = [],
  footerType,
}: {
  children?: CollectionChildren<T> | [CollectionChildren<T>, React.ReactElement]
  footerType: React.FC
}): { body: CollectionChildren<T>; footer: React.ReactElement | undefined } {
  // `children` may or may not contain a footer
  // `children` may also either be static or dynamic data
  // This means there are 4 cases for us to consider

  let body: CollectionChildren<T>
  let footer: React.ReactElement | undefined

  if (!Array.isArray(children)) {
    // Dynamic data + no footer
    body = children
    footer = undefined
  } else {
    // Assume footer will be the last element (if it exists)
    const lastChild = last(children) as React.ReactElement
    if (lastChild?.type === footerType) {
      const allButLastChildren = children.slice(0, children.length - 1)
      footer = lastChild

      if (isFunction(allButLastChildren[0])) {
        // Dynamic data + footer
        body = allButLastChildren[0]
      } else {
        // Static data + footer
        body = allButLastChildren as CollectionChildren<T>
      }
    } else {
      // Static data + no footer
      body = children as any
      footer = undefined
    }
  }

  return { body, footer }
}
