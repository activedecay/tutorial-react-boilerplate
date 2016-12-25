import AddTodo from '../index'
import React from 'react'
import { mount } from 'enzyme'
import expect from 'expect'
import Button from '../../../components/Button'
import sinon from 'sinon'

describe('<AddTodo />', () => {
  xit('should have an input and a button', () => {
    const onClick = sinon.spy()
    const wrapper = mount(<AddTodo onClick={onClick} />)

    wrapper.find(Button).simulate('click')
    expect(onClick.calledOnce).toBe(true) // todo, pending test line
  })
})
