'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alaskaAdminView = require('alaska-admin-view');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-22
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MixedFieldView = function (_React$Component) {
  _inherits(MixedFieldView, _React$Component);

  function MixedFieldView(props) {
    _classCallCheck(this, MixedFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MixedFieldView).call(this, props));

    _this.handleChange = function (e) {
      var value = e.target.value;
      var json = void 0;
      var state = {
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
      _this.setState(state);
    };

    _this.handleBlur = function (e) {
      var value = e.target.value;
      var json = void 0;
      var state = {
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
      _this.setState(state);
      if (json && _this.props.onChange) {
        _this.props.onChange(json);
      }
    };

    _this.state = {
      text: JSON.stringify(props.value, null, 4),
      style: undefined
    };
    return _this;
  }

  _createClass(MixedFieldView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.value !== undefined) {
        this.setState({
          text: JSON.stringify(props.value, null, 4)
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model') || !(0, _alaskaAdminView.shallowEqual)(state, this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var field = this.props.field;
      return _react2.default.createElement(_reactBootstrap.Input, {
        ref: 'input',
        type: 'textarea',
        label: field.label,
        value: this.state.text,
        bsStyle: this.state.style,
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        labelClassName: 'col-xs-2',
        wrapperClassName: 'col-xs-10'
      });
    }
  }]);

  return MixedFieldView;
}(_react2.default.Component);

MixedFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
exports.default = MixedFieldView;