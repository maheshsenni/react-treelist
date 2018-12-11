# react-treelist [![Build Status](https://travis-ci.org/maheshsenni/react-treelist.svg?branch=master)](https://travis-ci.org/maheshsenni/react-treelist)

A React treelist component to display data in tree structure. Uses virtual scrolling to display large data sets without performance issues.

[Demo](https://maheshsenni.github.io/react-treelist/)

## Features

* Display large data sets
* Resize columns
* Sort columns
* Expand all rows by default
* Apply custom styles to rows and columns
* Custom handlers when rows are selected

## Installation

```sh
npm install --save react-treelist
```

## Usage

```js
import TreeList from 'react-treelist';
import 'react-treelist/build/css/index.css';

<TreeList
  data={DATA}  
  columns={COLUMNS}
  options={OPTIONS}
  handlers={HANDLERS}
  id={'id'}
  parentId={'parentId'}></TreeList>
```

|Property|Type|Description|
|--------|----|-----------|
|`data`|array|Array of data objects which become rows in the treelist|
|`columns`|array|Array of column configuration options. See [column options](#column-options) for more details.|
|`options`|object|Component level configuration options. See [component options](#component-options) for more details.|
|`handlers`|object|Component level handlers. See [handlers](#handlers) for more details.|
|`id`|string|Data field which uniquely identifies each record|
|`parentId`|string|Data field which identifies the parent row of a record. Data objects with `null` value in this field are treated as top-level parent records|  
|`refresh`|number|This optional property can be used to improve render performance if the data is not expected to change often. A hash is computed for every render to check if the data has changed, so that the DOM can be re-rendered again. If the dataset is large, this can affect performance. Setting this property will disable the built-in hash calculation and the component will be re-rendered only if this property changes.|

See `src/js/index.js` for an example.

## Options

### Column options

The component accepts an array of column objects via the property `columns`. The column objects can accept the following properties.

|Property name|Type|Required|Description|
|-------------|----|--------|-----------|
|`title`|string|yes|Will be displayed as column header|
|`field`|string|yes|Property in the data object whose value will be displayed in the rows against this column|
|`type`|string|yes|Data type of the values displayed in the column. Required for sorting and applying formatting. Valid values: `number`, `string`, `date`|
|`width`|number|no|Width of the column|
|`expand`|bool|no|Shows the expand or collapse in this column if set to `true`. If this option is not provided, the icons are shown in the first column by default.|
|`class`|string &#124; function|no|Class name (string) to be added to the cells in the column. Can be used for applying specific styles for the column values. A function can also be provided, which will be executed with the row's data object to determine the class name.|
|`formatter`|function|no|If provided, the return value of this function will be dispayed in the rows for this column. The function receives two arguments: value of `field` from the data object as the first argument and entire row's data as the second argument.

### Component options

Component level options are accepted via the property, `options`.

|Property name|Type|Required|Description|
|-------------|----|--------|-----------|
|`expandAll`|bool|no|If set to `true` will expand all rows by default when the component is rendered for the first time. Defaults to `false`.|
|`height`|number|no|Height of the treelist body. When not provided, the component will expand to show all available rows.|
|`minimumColWidth`|number|no|Minimum width of columns. Columns can't be resized below this value.|
|`canSelect`|bool|no|Set this as `true` to enable the row selection handler. See `onSelectRow` in [handlers](#handlers) for details.|
|`rowClass`|string &#124; function|no|Class name (string) to be added to rows. Can be used for applying specific styles for the rows. A function can also be provided, which will be executed with the row's data object to determine the class name.|

### Handlers

|Property name|Type|Required|Description|
|-------------|----|--------|-----------|
|`onSelectRow`|function|no|Handler function to be called with the row data whenever a row is selected. Requires `canSelect` [component option](#component-options) to be set.|

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
