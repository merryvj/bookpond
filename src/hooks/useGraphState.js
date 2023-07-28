import {useReducer, useState} from 'react'
import useBookData from './useBookData'


function useGraphState({nodeData, linkData}) {
    const [origin, setOrigin] = useState({ title: "test", id: 0})

    const initialState = {
        origin: origin,
        nodes: nodeData, 
        links: linkData,
        ancestors: [],
    }
        
    const reducer = (state, action) => {
        switch (action.type) {
          case 'SelectNode':
            return { ...state, origin: action.origin};
          default:
            return state;
        }
    };

    return useReducer(reducer, initialState);
}

export default useGraphState