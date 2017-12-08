import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const TOGGLE_CONTEXT = '__toggle__';

function ToggleOn({children}, context) {
  const {on} = context[TOGGLE_CONTEXT];
  return on ? children : null;
}

ToggleOn.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

function ToggleOff({children}, context) {
  const {on} = context[TOGGLE_CONTEXT];
  return on ? null : children;
}

ToggleOff.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

function ToggleButton(props, context) {
  const {on, toggle} = context[TOGGLE_CONTEXT];
  return <Switch on={on} onClick={toggle} {...props} />;
}

ToggleButton.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = {onToggle: () => {}};
  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  }
  state = {on: false};


  toggle = () => {
    return this.setState(
      ({on}) => ({on: !on}),
      () => {this.props.onToggle(this.state.on)}
    );
  };

  getChildContext() {
    return {
      [TOGGLE_CONTEXT] : {
        on: this.state.on,
        toggle: this.toggle
      }
    };
  }

  render() {
    return <div>{this.props.children}</div>
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
          <div>
            <Toggle.On>The button is on</Toggle.On>
          </div>
        </Toggle>
      </div>
    );
  }
}

export default App;
