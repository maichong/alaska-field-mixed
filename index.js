/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const mongoose = require('mongoose');

class MixedField extends alaska.Field {
}

MixedField.views = {
  cell: {
    name: 'MixedFieldCell',
    path: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'MixedFieldView',
    path: __dirname + '/lib/view.js'
  }
};

MixedField.plain = mongoose.Schema.Types.Mixed;

module.exports = MixedField;
