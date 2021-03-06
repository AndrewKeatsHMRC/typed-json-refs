// Generated by typings
// Source: https://raw.githubusercontent.com/AndrewKeatsHMRC/typed-json-refs/master/index.d.ts
declare namespace JsonRefs {

  /**
   * The options used for various JsonRefs APIs.
   *
   * @typedef {object} JsonRefsOptions
   *
   * @param {string|string[]|function} [filter=function () {return true;}] - The filter to use when gathering JSON
   * References *(If this value is a single string or an array of strings, the value(s) are expected to be the `type(s)`
   * you are interested in collecting as described in {@link module:JsonRefs.getRefDetails}.  If it is a function, it is
   * expected that the function behaves like {@link module:JsonRefs~RefDetailsFilter}.)*
   * @param {boolean} [includeInvalid=false] - Whether or not to include invalid JSON Reference details *(This will make
   * it so that objects that are like JSON Reference objects, as in they are an `Object` and the have a `$ref` property,
   * but fail validation will be included.  This is very useful for when you want to know if you have invalid JSON
   * Reference definitions.  This will not mean that APIs will process invalid JSON References but the reasons as to why
   * the JSON References are invalid will be included in the returned metadata.)*
   * @param {object} [loaderOptions] - The options to pass to
   * {@link https://github.com/whitlockjc/path-loader/blob/master/docs/API.md#module_PathLoader.load|PathLoader~load}
   * @param {module:JsonRefs~RefPreProcessor} [refPreProcessor] - The callback used to pre-process a JSON Reference like
   * object *(This is called prior to validating the JSON Reference like object and getting its details)*
   * @param {module:JsonRefs~RefPostProcessor} [refPostProcessor] - The callback used to post-process the JSON Reference
   * metadata *(This is called prior filtering the references)*
   * @param {string} [options.relativeBase] - The base location to use when resolving relative references *(Only useful
   * for APIs that do remote reference resolution.  If this value is not defined,
   * {@link https://github.com/whitlockjc/path-loader|path-loader} will use `window.location.href` for the browser and
   * `process.cwd()` for Node.js.)*
   * @param {string|string[]} [options.subDocPath=[]] - The JSON Pointer or array of path segments to the sub document
   * location to search from
   */

  interface JsonRefsOptions {
    filter?: string|string[]|((obj: JsonRefs.UnresolvedRefDetails, refPath: string[]) => boolean);
    includeInvalid?: boolean;
    loaderOptions?: Object;
    refPreProcessor?: RefPreProcessor;
    refPostProcessor?: RefPostProcessor;
    relativeBase?: string;
    subDocPath?: string | string[];
  }

  /**
   * Simple function used to filter out JSON References.
   *
   * @typedef {function} RefDetailsFilter
   *
   * @param {module:JsonRefs~UnresolvedRefDetails} refDetails - The JSON Reference details to test
   * @param {string[]} path - The path to the JSON Reference
   *
   * @returns {boolean} whether the JSON Reference should be filtered *(out)* or not
   */
  /**
   * Simple function used to pre-process a JSON Reference like object.
   *
   * @typedef {function} RefPreProcessor
   *
   * @param {object} obj - The JSON Reference like object
   * @param {string[]} path - The path to the JSON Reference like object
   *
   * @returns {object} the processed JSON Reference like object
   */
  interface RefPreProcessor {
    (obj: Object, path: string[]): Object;
  }
  /**
   * Simple function used to post-process a JSON Reference details.
   *
   * @typedef {function} RefPostProcessor
   *
   * @param {module:JsonRefs~UnresolvedRefDetails} refDetails - The JSON Reference details to test
   * @param {string[]} path - The path to the JSON Reference
   *
   * @returns {object} the processed JSON Reference details object
   */
  interface RefPostProcessor {
    (refDetails: Object, path: string[]): Object;
  }
  /**
   * Detailed information about resolved JSON References.
   *
   * @typedef {module:JsonRefs~UnresolvedRefDetails} ResolvedRefDetails
   *
   * @property {boolean} [circular] - Whether or not the JSON Reference is circular *(Will not be set if the JSON
   * Reference is not circular)*
   * @property {boolean} [missing] - Whether or not the referenced value was missing or not *(Will not be set if the
   * referenced value is not missing)*
   * @property {*} [value] - The referenced value *(Will not be set if the referenced value is missing)*
   */
  interface ResolvedRefDetails extends UnresolvedRefDetails {
    circular?: boolean;
    missing?: boolean;
    value?: any;
  }
  /**
   * The results of resolving the JSON References of an array/object.
   *
   * @typedef {object} ResolvedRefsResults
   *
   * @property {module:JsonRefs~ResolvedRefDetails} refs - An object whose keys are JSON Pointers *(fragment version)*
   * to where the JSON Reference is defined and whose values are {@link module:JsonRefs~ResolvedRefDetails}
   * @property {object} resolved - The array/object with its JSON References fully resolved
   */
  interface ResolvedRefsResults {
    refs: {
      [JSONPointer: string]: ResolvedRefDetails;
    };
    resolved: any[] | Object;
  }
  /**
   * An object containing the retrieved document and detailed information about its JSON References.
   *
   * @typedef {module:JsonRefs~ResolvedRefsResults} RetrievedRefsResults
   *
   * @property {object} value - The retrieved document
   */
  /**
   * An object containing the retrieved document, the document with its references resolved and  detailed information
   * about its JSON References.
   *
   * @typedef {object} RetrievedResolvedRefsResults
   *
   * @property {module:JsonRefs~UnresolvedRefDetails} refs - An object whose keys are JSON Pointers *(fragment version)*
   * to where the JSON Reference is defined and whose values are {@link module:JsonRefs~UnresolvedRefDetails}
   * @property {ResolvedRefsResults} - An object whose keys are JSON Pointers *(fragment version)*
   * to where the JSON Reference is defined and whose values are {@link module:JsonRefs~ResolvedRefDetails}
   * @property {object} value - The retrieved document
   */
  /**
   * Detailed information about unresolved JSON References.
   *
   * @typedef {object} UnresolvedRefDetails
   *
   * @property {object} def - The JSON Reference definition
   * @property {string} [error] - The error information for invalid JSON Reference definition *(Only present when the
   * JSON Reference definition is invalid or there was a problem retrieving a remote reference during resolution)*
   * @property {string} uri - The URI portion of the JSON Reference
   * @property {object} uriDetails - Detailed information about the URI as provided by
   * {@link https://github.com/garycourt/uri-js|URI.parse}.
   * @property {string} type - The JSON Reference type *(This value can be one of the following: `invalid`, `local`,
   * `relative` or `remote`.)*
   * @property {string} [warning] - The warning information *(Only present when the JSON Reference definition produces a
   * warning)*
   */
  interface UnresolvedRefDetails {
    def: Object;
    error?: string;
    uri: string;
    uriDetails: Object;
    type: string;
    warning?: string;
  }

  /**
   * Clears the internal cache of remote documents, reference details, etc.
   *
   * @alias module:JsonRefs.clearCache
   */
  function clearCache(): void;

  /**
   * Takes an array of path segments and decodes the JSON Pointer tokens in them.
   *
   * @param {string[]} path - The array of path segments
   *
   * @returns {string} the array of path segments with their JSON Pointer tokens decoded
   *
   * @throws {Error} if the path is not an `Array`
   *
   * @see {@link https://tools.ietf.org/html/rfc6901#section-3}
   *
   * @alias module:JsonRefs.decodePath
   */
  function decodePath(path: any): any;

  /**
   * Takes an array of path segments and encodes the special JSON Pointer characters in them.
   *
   * @param {string[]} path - The array of path segments
   *
   * @returns {string} the array of path segments with their JSON Pointer tokens encoded
   *
   * @throws {Error} if the path is not an `Array`
   *
   * @see {@link https://tools.ietf.org/html/rfc6901#section-3}
   *
   * @alias module:JsonRefs.encodePath
   */
  function encodePath(path: any): any;

  /**
   * Finds JSON References defined within the provided array/object.
   *
   * @param {array|object} obj - The structure to find JSON References within
   * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
   *
   * @returns {object} an object whose keys are JSON Pointers *(fragment version)* to where the JSON Reference is defined
   * and whose values are {@link module:JsonRefs~UnresolvedRefDetails}.
   *
   * @throws {Error} when the input arguments fail validation or if `options.subDocPath` points to an invalid location
   *
   * @alias module:JsonRefs.findRefs
   *
   * @example
   * // Finding all valid references
   * var allRefs = JsonRefs.findRefs(obj);
   * // Finding all remote references
   * var remoteRefs = JsonRefs.findRefs(obj, {filter: ['relative', 'remote']});
   * // Finding all invalid references
   * var invalidRefs = JsonRefs.findRefs(obj, {filter: 'invalid', includeInvalid: true});
   */
  function findRefs(obj: any, options: any): {};

  /**
   * Finds JSON References defined within the document at the provided location.
   *
   * This API is identical to {@link module:JsonRefs.findRefs} except this API will retrieve a remote document and then
   * return the result of {@link module:JsonRefs.findRefs} on the retrieved document.
   *
   * @param {string} location - The location to retrieve *(Can be relative or absolute, just make sure you look at the
   * {@link module:JsonRefs~JsonRefsOptions|options documentation} to see how relative references are handled.)*
   * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
   *
   * @returns {Promise} a promise that resolves a {@link module:JsonRefs~RetrievedRefsResults} and rejects with an
   * `Error` when the input arguments fail validation, when `options.subDocPath` points to an invalid location or when
   *  the location argument points to an unloadable resource
   *
   * @alias module:JsonRefs.findRefsAt
   *
   * @example
   * // Example that only resolves references within a sub document
   * JsonRefs.findRefsAt('http://petstore.swagger.io/v2/swagger.json', {
 *     subDocPath: '#/definitions'
 *   })
   *   .then(function (res) {
 *      // Do something with the response
 *      //
 *      // res.refs: JSON Reference locations and details
 *      // res.value: The retrieved document
 *   }, function (err) {
 *     console.log(err.stack);
 *   });
   */
  function findRefsAt(location: any, options: any): any;

  /**
   * Returns detailed information about the JSON Reference.
   *
   * @param {object} obj - The JSON Reference definition
   *
   * @returns {module:JsonRefs~UnresolvedRefDetails} the detailed information
   *
   * @alias module:JsonRefs.getRefDetails
   */
  function getRefDetails(obj: any): {
    def: any;
  };

  /**
   * Returns whether the argument represents a JSON Pointer.
   *
   * A string is a JSON Pointer if the following are all true:
   *
   *   * The string is of type `String`
   *   * The string must be empty, `#` or start with a `/` or `#/`
   *
   * @param {string} ptr - The string to check
   * @param {boolean} [throwWithDetails=false] - Whether or not to throw an `Error` with the details as to why the value
   * provided is invalid
   *
   * @returns {boolean} the result of the check
   *
   * @throws {error} when the provided value is invalid and the `throwWithDetails` argument is `true`
   *
   * @alias module:JsonRefs.isPtr
   *
   * @see {@link https://tools.ietf.org/html/rfc6901#section-3}
   *
   * @example
   * // Separating the different ways to invoke isPtr for demonstration purposes
   * if (isPtr(str)) {
 *   // Handle a valid JSON Pointer
 * } else {
 *   // Get the reason as to why the value is not a JSON Pointer so you can fix/report it
 *   try {
 *     isPtr(str, true);
 *   } catch (err) {
 *     // The error message contains the details as to why the provided value is not a JSON Pointer
 *   }
 * }
   */
  function isPtr(ptr: any, throwWithDetails: any): boolean;

  /**
   * Returns whether the argument represents a JSON Reference.
   *
   * An object is a JSON Reference only if the following are all true:
   *
   *   * The object is of type `Object`
   *   * The object has a `$ref` property
   *   * The `$ref` property is a valid URI *(We do not require 100% strict URIs and will handle unescaped special
   *     characters.)*
   *
   * @param {object} obj - The object to check
   * @param {boolean} [throwWithDetails=false] - Whether or not to throw an `Error` with the details as to why the value
   * provided is invalid
   *
   * @returns {boolean} the result of the check
   *
   * @throws {error} when the provided value is invalid and the `throwWithDetails` argument is `true`
   *
   * @alias module:JsonRefs.isRef
   *
   * @see {@link http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03#section-3}
   *
   * @example
   * // Separating the different ways to invoke isRef for demonstration purposes
   * if (isRef(obj)) {
 *   // Handle a valid JSON Reference
 * } else {
 *   // Get the reason as to why the value is not a JSON Reference so you can fix/report it
 *   try {
 *     isRef(str, true);
 *   } catch (err) {
 *     // The error message contains the details as to why the provided value is not a JSON Reference
 *   }
 * }
   */
  function isRef(obj: any, throwWithDetails: any): boolean;

  /**
   * Returns an array of path segments for the provided JSON Pointer.
   *
   * @param {string} ptr - The JSON Pointer
   *
   * @returns {string[]} the path segments
   *
   * @throws {Error} if the provided `ptr` argument is not a JSON Pointer
   *
   * @alias module:JsonRefs.pathFromPtr
   */
  function pathFromPtr(ptr: any): any;

  /**
   * Returns a JSON Pointer for the provided array of path segments.
   *
   * **Note:** If a path segment in `path` is not a `String`, it will be converted to one using `JSON.stringify`.
   *
   * @param {string[]} path - The array of path segments
   * @param {boolean} [hashPrefix=true] - Whether or not create a hash-prefixed JSON Pointer
   *
   * @returns {string} the corresponding JSON Pointer
   *
   * @throws {Error} if the `path` argument is not an array
   *
   * @alias module:JsonRefs.pathToPtr
   */
  function pathToPtr(path: any, hashPrefix: any): string;

  /**
   * Finds JSON References defined within the provided array/object and resolves them.
   *
   * @param {array|object} obj - The structure to find JSON References within
   * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
   *
   * @returns {Promise} a promise that resolves a {@link module:JsonRefs~ResolvedRefsResults} and rejects with an
   * `Error` when the input arguments fail validation, when `options.subDocPath` points to an invalid location or when
   *  the location argument points to an unloadable resource
   *
   * @alias module:JsonRefs.resolveRefs
   *
   * @example
   * // Example that only resolves relative and remote references
   * JsonRefs.resolveRefs(swaggerObj, {
 *     filter: ['relative', 'remote']
 *   })
   *   .then(function (res) {
 *      // Do something with the response
 *      //
 *      // res.refs: JSON Reference locations and details
 *      // res.resolved: The document with the appropriate JSON References resolved
 *   }, function (err) {
 *     console.log(err.stack);
 *   });
   */
  function resolveRefs(obj: any[] | Object, options?: JsonRefsOptions): Promise<ResolvedRefsResults>;

  /**
   * Resolves JSON References defined within the document at the provided location.
   *
   * This API is identical to {@link module:JsonRefs.resolveRefs} except this API will retrieve a remote document and then
   * return the result of {@link module:JsonRefs.resolveRefs} on the retrieved document.
   *
   * @param {string} location - The location to retrieve *(Can be relative or absolute, just make sure you look at the
   * {@link module:JsonRefs~JsonRefsOptions|options documentation} to see how relative references are handled.)*
   * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
   *
   * @returns {Promise} a promise that resolves a {@link module:JsonRefs~RetrievedResolvedRefsResults} and rejects with an
   * `Error` when the input arguments fail validation, when `options.subDocPath` points to an invalid location or when
   *  the location argument points to an unloadable resource
   *
   * @alias module:JsonRefs.resolveRefsAt
   *
   * @example
   * // Example that loads a JSON document (No options.loaderOptions.processContent required) and resolves all references
   * JsonRefs.resolveRefsAt('./swagger.json')
   *   .then(function (res) {
 *      // Do something with the response
 *      //
 *      // res.refs: JSON Reference locations and details
 *      // res.resolved: The document with the appropriate JSON References resolved
 *      // res.value: The retrieved document
 *   }, function (err) {
 *     console.log(err.stack);
 *   });
   */
  function resolveRefsAt(location: string, options?: JsonRefsOptions): Promise<Object>;
}
