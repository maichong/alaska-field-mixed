/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { shallowEqual } from 'alaska-admin-view';
import { Input } from 'react-bootstrap';

export default class MixedFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
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
        state.style = 'error';
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
        state.style = 'error';
      }
    }
    this.setState(state);
    if (json && this.props.onChange) {
      this.props.onChange(json);
    }
  }

  render() {
    let { field, disabled } = this.props;
    if (disabled) {

      return <div className="form-group">
        <label className="control-label col-xs-2">{field.label}</label>
        <div className="col-xs-10">
          <pre>{this.state.text}</pre>
        </div>
      </div>
    }
    return (
      <Input
        ref="input"
        type="textarea"
        label={field.label}
        value={this.state.text}
        bsStyle={this.state.style}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        labelClassName="col-xs-2"
        wrapperClassName="col-xs-10"
      />
    );
  }
}
