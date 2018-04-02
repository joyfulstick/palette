import { ColorInput } from './ColorInput'
import React from 'react'
import renderer from 'react-test-renderer'

describe('ColorInput', () => {
  it('initialezes the `state` with an empty input value', () => {
    const tree = renderer.create(<ColorInput />).getInstance()
    expect(tree.state.inputValue).toEqual('')
  })
})
