import 'ie-shim';

import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import 'ts-helpers';

import {enableProdMode} from '@angular/core';

if ('production' === process.env.NODE_ENV) {
	enableProdMode();
} else {
	Error['stackTraceLimit'] = Infinity;
	require('zone.js/dist/long-stack-trace-zone');
}

import '@angular/platform-browser';
import '@angular/core';
import '@angular/http';

import 'rxjs/Observable';
import 'rxjs/Observer';
import 'rxjs/observable/merge';
import 'rxjs/observable/fromEvent';

import 'lodash/each';
import 'lodash/map';
import 'lodash/reduce';
import 'lodash/filter';
import 'lodash/forEach';
import 'lodash/union';
import 'lodash/uniq';
import 'lodash/difference';
import 'lodash/findIndex';
import 'lodash/groupBy';
import 'lodash/isEmpty';
import 'lodash/size';
import 'lodash/maxBy';
import 'lodash/transform';
import 'lodash/isNull';
import 'lodash/isUndefined';
import 'lodash/noop';
import 'lodash/orderBy';
import 'lodash/flattenDeep';
import 'lodash/concat';
import 'lodash/chain';
import 'lodash/sortBy';
