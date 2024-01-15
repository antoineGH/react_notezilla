import uniqBy from 'lodash/uniqBy'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearch, setSearch } from '../../features/search/searchSlice'
import { resetOptions } from './utils'
import { AutoComplete, Row, Col, Button } from 'antd'
import './SearchBarComponent.css'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

export default function SearchBarComponent(props) {
  const { handleSearch, handleResetSearch, notes } = props
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [options, setOptions] = useState([])
  const searchParam = useSelector(selectSearch)

  useEffect(() => {
    notes.forEach(note => {
      setOptions(previousState => {
        return uniqBy([...previousState, { value: note.note_title }], 'value')
      })
    })
  }, [notes])

  useEffect(() => {
    if (value.length === 0) {
      dispatch(setSearch(''))
    }
  }, [value, dispatch])

  const onSearch = searchText => {
    setOptions(!searchText ? resetOptions(notes) : checkExists(searchText))
  }

  const onSelect = data => {
    handleSearch(data)
  }

  const onChange = data => {
    setValue(data)
  }

  const checkExists = str => {
    if (str.length < value.length) {
      const resetOptions = []
      notes.forEach(note => {
        resetOptions.push({ value: note.note_title })
      })
      const newValues = []
      Object.values(resetOptions).forEach(value => {
        if (value.value.toLowerCase().includes(str.toLowerCase())) {
          newValues.push({ value: value.value })
        }
      })
      return uniqBy(newValues, Object.entries.value)
    }
    if (options) {
      const newValues = []
      Object.values(options).forEach(value => {
        if (value.value.toLowerCase().includes(str.toLowerCase())) {
          newValues.push({ value: value.value })
        }
      })
      return uniqBy(newValues, Object.entries.value)
    } else {
      return { value: [] }
    }
  }

  const clickResetSearch = () => {
    handleResetSearch()
    setValue('')
  }

  return (
    <>
      <Row className="row-search-component">
        <Col span={18}>
          <AutoComplete
            className="search-component custom-autocomplete"
            id="search-component"
            value={value}
            options={options}
            style={{
              width: '100%',
              borderRadius: '3px!important',
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
          />
        </Col>
        <Col span={4}>
          <Button
            className="custom-search-button"
            id="search-button"
            type="primary"
            onClick={() => handleSearch(value)}
            icon={<SearchOutlined style={{ fontSize: '1rem' }} />}
          />
        </Col>
      </Row>
      <Row className="row-delete-search">
        <Col>
          {searchParam && (
            <Button
              id="button-delete-search"
              type="primary"
              onClick={clickResetSearch}
            >
              {searchParam}
              <CloseOutlined />
            </Button>
          )}
        </Col>
      </Row>
    </>
  )
}
