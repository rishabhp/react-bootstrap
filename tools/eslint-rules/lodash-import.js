/*eslint-disable */
/**
 * @fileoverview Rule to enforce entire lodash library is not imported
 * @author Matt Smith
 * @copyright 2015 Matt Smith. All rights reserved.
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
  return {
    ImportDeclaration: function(node) {
      if (node.source.value !== 'lodash') {
        context.report(node.source, 'Importing the entire lodash library is not permitted, please import the specific functions you need');
      }
    }
  };
};
