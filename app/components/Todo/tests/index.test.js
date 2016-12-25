import Todo from '../index'
import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'
import { fromJS } from 'immutable'
import sinon from 'sinon'

describe('<Todo />', () => {
  it('todo element has a click handler', () => {
    const onClick = sinon.spy()
    const t = fromJS({ text: 'hi', id: 1, completed: false })
    const wrapper = shallow(<Todo todo={t} onClick={onClick} />)

    wrapper.find('li').simulate('click')

    expect(onClick.calledOnce).toBe(true)
    expect(onClick.calledWith(t.get('id'))).toBe(true)
  })
})
