# entity-checker

[![npm version](https://badge.fury.io/js/entity-checker.svg)](https://badge.fury.io/js/entity-checker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight utility for handling 'not found' scenarios in JavaScript applications. This library provides helper method to determine if a given entity is null, undefined, an empty array, or an empty object, simplifying the process of checking for missing or empty data. Enhance your code readability and maintainability by encapsulating the logic for common 'not found' checks.

## Installation

You can install the library via npm:

```bash
npm install entity-checker
```
## Usage

```javascript
const notFoundUtil = require('entity-checker');

// Example usage
class Library {
  constructor() {
    this.data = [];
  }

  fetchData() {
    // Fetch data logic
    return this.data;
  }

  processData() {
    const data = this.fetchData();

    if (notFoundUtil.isNotFound(data)) {
      console.log('Data not found or empty.');
    } else {
      console.log('Data found:', data);
    }
  }
}
```
## API

### `isNotFound(entity)`

Check if the provided entity is null, undefined, an empty array, or an empty object.

- **Parameters:**
  - `entity` (any): The entity to check.

- **Returns:**
  - `true` if the entity is null, undefined, an empty array, or an empty object.
  - `false` otherwise.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

