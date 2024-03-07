class EntityChecker {
  // Private method to check if the entity is null
  _isNull(entity) {
    return entity === null;
  }

  // Private method to check if the entity is undefined
  _isUndefined(entity) {
    return entity === undefined;
  }

  // Private method to check if the entity is NaN (Not a Number)
  _isNaN(entity) {
    return typeof entity === "number" && isNaN(entity);
  }

  // Private method to check if the entity is zero
  _isZero(entity) {
    return entity === 0;
  }

  // Private method to check if the entity is false
  _isFalse(entity) {
    return entity === false;
  }

  // Private method to check if the entity is an empty array (including empty strings)
  _isEmptyArray(entity) {
    return (
      Array.isArray(entity) &&
      (entity.length === 0 || entity.every((item) => item === ""))
    );
  }

  // Private method to check if the entity is an empty object
  _isEmptyObject(entity) {
    return typeof entity === "object" && Object.keys(entity).length === 0;
  }

  // Method to check if the provided entity is null, undefined, NaN, zero, false, an empty array, an array with empty strings, or an empty object
  isNotFound(entity) {
    return (
      this._isNull(entity) ||
      this._isUndefined(entity) ||
      this._isNaN(entity) ||
      this._isZero(entity) ||
      this._isFalse(entity) ||
      this._isEmptyArray(entity) ||
      this._isEmptyObject(entity)
    );
  }
}

const entityChecker = new EntityChecker();

// Public API object containing only the desired method
const publicAPI = {
  isNotFound: entityChecker.isNotFound.bind(entityChecker),
};

module.exports = publicAPI;
