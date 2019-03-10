import * as React from "react";

export interface IProps {
  name: string;
  enthusiasmLevel?: number;
}

interface IState {
  currentEnthusiasm: number;
}

class Hello extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentEnthusiasm: props.enthusiasmLevel || 1
    };
  }

  public render() {
    const { name } = this.props;

    if (this.state.currentEnthusiasm <= 0) {
      throw new Error("You could be a little more enthusiastic :D");
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
        </div>
        <button onClick={this.onDecrement}> - </button>
        <button onClick={this.onIncrement}> + </button>
      </div>
    );
  }

  // these are class property initializers with arrow functions
  // 1. avoids issues with orphaned uses of this
  // 2. instance properties are created once - initialize in render and they are remade every render

  private onIncrement = () =>
    this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
  private onDecrement = () =>
    this.updateEnthusiasm(this.state.currentEnthusiasm - 1);

  private updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({ currentEnthusiasm });
  }
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join("!");
}
