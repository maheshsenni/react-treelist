# react-treelist [![Build Status](https://travis-ci.org/maheshsenni/react-treelist.svg?branch=master)](https://travis-ci.org/maheshsenni/react-treelist)

A React treelist component to display data in tree structure.

[Demo](https://maheshsenni.github.io/react-treelist/)

## Features

- [x] Resize columns
- [x] Sort columns
- [x] Expand all rows by default
- [ ] Filtering

## Installation

```sh
npm install --save react-treelist
```

## Usage

```js
import TreeList from 'react-treelist';

<TreeList
  data={DATA}  
  columns={COLUMNS}
  options={OPTIONS}
  id={'id'}
  parentId={'parentId'}></TreeList>
```

|Property|Type|Description|
|--------|----|-----------|
|`data`|array|Array of data objects which become rows in the treelist|
|`columns`|array|Array of column configuration options. See [column options](#column-options) for more details.|
|`options`|object|Component level configuration options. See [component options](#component-options) for more details.|
|`id`|string|Data field which uniquely identifies each record|
|`parentId`|string|Data field which identifies the parent row of a record. Data objects with `null` value in this field are treated as top-level parent records|  

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
|`class`|string|no|Class name to be added to the cells in the column. Can be used for applying specific styles for the column values|
|`formatter`|function|no|If provided, the return value of this function will be dispayed in the rows for this column. The value of `field` from the data object will be passed as an argument.

### Component options

Component level options are accepted via the property, `options`.

|Property name|Type|Required|Description|
|-------------|----|--------|-----------|
|`expandAll`|bool|no|If set to `true` will expand all rows by default when the component is rendered for the first time. Defaults to `false`.
|`height`|number|no|Height of the treelist body. When not provided, the component will expand to show all available rows.|
|`minimumColWidth`|number|no|Minimum width of columns. Columns can't be resized below this value.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

