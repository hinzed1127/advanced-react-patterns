import React, { Component } from 'react';
import './App.css';

function ToggleOn({on, children}) {
  return on ? children : null;
}

function ToggleOff({on, children}) {
  return on ? null : children;
}

function ToggleButton({on, toggle, ...props}) {
  return <Switch on={on} onClick={toggle} {...props} />;
}

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = {onToggle: () => {}};
  state = {on: false};

  toggle = () => {
    return this.setState(
      ({on}) => ({on: !on}),
      () => {this.props.onToggle(this.state.on)}
    );
  };

  render() {
    const children = React.Children.map(
      this.props.children,
      child => React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      }),
    )

    return <div>{children}</div>
  } 
}

function Switch({on, onClick}) {
  return (
    <div className='toggle-container'>
      <label className="switch">
        <input type="checkbox" checked={on} onChange={onClick}/>
        <span className="slider round" />
      </label>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Toggle onToggle={on => console.log(on)}>
          <Toggle.Off>The button if off</Toggle.Off>
          <Toggle.Button />
          <Toggle.On>The button is on</Toggle.On>
        </Toggle>
      </div>
    );
  }
}

export default App;
