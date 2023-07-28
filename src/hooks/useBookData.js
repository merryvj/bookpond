import React, {useState, useEffect, useRef} from 'react'


const initialData = [
    {
        title: "Science",
        id: 1
    }, 
    {
        title: "History",
        id: 2
    },
    {
        title: "Literature",
        id: 3
    },
    {
        title: "Art",
        id: 4
    }
]


const makeLinkData = (sourceNode, targetNodes) => {
    let ret = [];
    targetNodes.forEach(target => {
        ret.push({
            source: sourceNode.id,
            target: target.id
        })
    })
    return ret;
}

function useBookData(node) {
    const [nodeData, setNodeData] = useState(initialData);
    const [linkData, setLinkData] = useState([]);
    const firstRender = useRef(true);

    const makeNodeData = (node) => {
        let ret = [];
        for (let i = 0; i < 5; i++) {
            ret.push({
                id: nodeData.length + 1 + i,
                title: node.title,
            })
        }

        return ret;
    }

    useEffect(() => {
        if (firstRender.current === true) {
            firstRender.current = false;
        } else {
            let nodes = makeNodeData(node);
            setNodeData((oldNodes) => [...oldNodes, ...nodes]);
            let links = makeLinkData(node, nodes);
            setLinkData((oldLinks) => [...oldLinks, ...links]);
        }
       
    }, [node])

    return {nodeData, linkData};
}

export default useBookData