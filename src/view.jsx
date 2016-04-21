/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { shallowEqual } from 'alaska-admin-view';

export default class MixedFieldView extends React.Component {

  static propTypes = {
    model: React.PropTypes.object,
    field: React.PropTypes.object,
    data: React.PropTypes.object,
    errorText: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: JSON.stringify(props.value, null, 4),
      style: undefined
    };
  }

  componentWillReceiveProps(props) {
    if (props.value !== undefined) {
      this.setState({
        text: JSON.stringify(props.value, null, 4)
      });
    }
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || !shallowEqual(state, this.state);
  }

  handleChange = (e) => {
    let value = e.target.value;
    let json;
    let state = {
      text: value
    };
    try {
      JSON.parse(value);
      state.style = undefined;
    } catch (e) {
      try {
        json = eval('json=' + value);
        state.style = undefined;
      } catch (err) {
        state.style = 'has-error';
      }
    }
    this.setState(state);
  };

  handleBlur = (e) => {
    let value = e.target.value;
    let json;
    let state = {
      text: value
    };
    try {
      json = JSON.parse(value);
      state.style = undefined;
    } catch (e) {
      try {
        json = eval('json=' + value);
        state.style = undefined;
      } catch (err) {
        state.style = 'has-error';
      }
    }
    this.setState(state);
    if (json !== undefined && this.props.onChange) {
      this.props.onChange(json);
    }
  };

  render() {
    let { field, disabled } = this.props;

    let inputElement;
    if (disabled || field.static) {
      inputElement = <pre>{this.state.text}</pre>;
    } else {
      inputElement = <textarea
        className="form-control"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      >{this.state.text}</textarea>;
    }

    let className = 'form-group ' + this.state.style;

    let helpElement = field.help ? <p className="help-block">{field.help}</p> : null;

    let label = field.nolabel ? '' : field.label;

    if (field.horizontal === false) {
      let labelElement = label ? (
        <label className="control-label">{label}</label>
      ) : null;
      return (
        <div className={className}>
          {labelElement}
          {inputElement}
          {helpElement}
        </div>
      );
    }

    return (
      <div className={className}>
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-10">
          {inputElement}
          {helpElement}
        </div>
      </div>
    );
  }
}
