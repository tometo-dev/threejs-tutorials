import { createRef, MutableRefObject } from "react"

const state = {
  sections: 3,
  pages: 3,
  zoom: 1,
  top: createRef<any>() as MutableRefObject<any>,
}

export default state
