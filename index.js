'use strict';
var beautify_js = require('js-beautify');
var beautify_html = require('js-beautify').html;
var CleanCSS = require('clean-css');

function minifyCss(content, options) {
  if (!options) {
    options = {};
  }
  return new CleanCSS(options).minify(content).styles;
}
var js_options = {
  'indent_size':2,
  'indent_char':'',
  'preserve_newlines':true,
  'max_preserve_newlines':1,
  'jslint_happy':false,
  'space_after_anon_function':false,
  'brace_style':'collapse',
  'space_before_conditional':true,
  'unescape_strings':false,
  'wrap_line_length':'unlimited',
  'end_with_newline':false
};
var css_options = {
  advanced: false,
  aggressiveMerging: true,
  benchmark: undefined,
  compatibility: {
    colors: {
      opacity: true
    },
    properties: {
      backgroundClipMerging: false,
      backgroundOriginMerging: false,
      backgroundSizeMerging: false,
      colors: true,
      iePrefixHack: false,
      ieSuffixHack: true,
      merging: true,
      spaceAfterClosingBrace: true,
      urlQuotes: false,
      zeroUnits: true
    },
    selectors: {
      adjacentSpace: false,
      ie7Hack: false,
      special: /(\-moz\-|\-ms\-|\-o\-|\-webkit\-|:dir\([a-z-]*\)|:first(?![a-z-])|:fullscreen|:left|:read-only|:read-write|:right|:placeholder)/
    },
    units: {
      ch: true,
      rem: true,
      vh: true,
      vm: true,
      vmax: true,
      vmin: true,
      vw: true
    }
  },
  debug: undefined,
  explicitRoot: false,
  explicitTarget: false,
  inliner: {
    timeout: 5000,
    request: {}
  },
  keepBreaks: true,
  keepSpecialComments: '*',
  mediaMerging: true,
  processImport: true,
  rebase: true,
  relativeTo: undefined,
  restructuring: true,
  roundingPrecision: undefined,
  semanticMerging: false,
  shorthandCompacting: true,
  sourceMap: undefined,
  sourceMapInlineSources: false,
  target: undefined
};
var html_options = {
  'indent_inner_html': true,
  'indent_size': 2,
  'indent_char': ' ',
  'wrap_line_length': 0,
  'brace_style': 'collapse',
  'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u'],
  'preserve_newlines': true,
  'max_preserve_newlines':1,
  'indent_handlebars': false,
  'extra_liners': [],
  'indent_level': 0,
  'indent_with_tabs': false,
  'jslint_happy': false,
  'space_after_anon_function': false,
  'keep_array_indentation': false,
  'keep_function_indentation': false,
  'space_before_conditional': true,
  'break_chained_methods': false,
  'eval_code': false,
  'unescape_strings': false,
  type: 'html'
}
module.exports = function (ret, conf, settings, opt) {
  var content;
  fis.util.map(ret.src, function (subpath, file) {
    if (file.isHtmlLike) {
      content = beautify_html(file.getContent(),html_options);
      file.setContent(content);
    }
    if (file.isCssLike) {
      content = minifyCss(file.getContent(),css_options);
      file.setContent(content);
    }
    if (file.isJsLike) {
      content = beautify_js(file.getContent(),js_options);
      file.setContent(content);
    }
  });
}