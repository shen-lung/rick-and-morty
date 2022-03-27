import 'regenerator-runtime/runtime'
import * as redux from "react-redux"
import React from 'react';
import { mount } from '../../enzyme';

import SearchEpisodeComponent from '../SearchEpisodeComponent';

describe('Mount component', () => {
    const mountComponent = (props) =>
        mount(<SearchEpisodeComponent />)
    
    describe('Basic mounting', () => {
        it('should mount head component', () => {
            const mockDispatchFn = jest.fn()
            const useDispatchSpy = jest.spyOn(redux, 'useDispatch') 
            const useSelectorSpy = jest.spyOn(redux, 'useSelector') 
            useDispatchSpy.mockReturnValue(mockDispatchFn)
            useSelectorSpy.mockReturnValue([])

            const wrapper = mountComponent()
            
            expect(wrapper.find('.MuiContainer-root').exists()).toBe(true)

            useDispatchSpy.mockClear()
            useSelectorSpy.mockClear()

            wrapper.unmount()
        })
    })
})
