import * as React from 'react' // React doesn't have a default export

/* Babel does a 'synthetic' default export for interopability
 * which allows for 'import React from "React"'
 * TypeScript 2.7 introduced esModuleInterop (this tutorial is probs old)
 */

export interface IProps {
  name: string // name is a required string
  enthusiasmLevel?: number // enthusiasmLevel is an optional(?) number
}

/* If we wanted to try this with a class the TS syntax would be:
 * class Hello extends React.Component<Props, object> {
 */

const Hello = ({ name, enthusiasmLevel = 1}: IProps) => {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic :D')
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  )
}

export default Hello

const getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!')
