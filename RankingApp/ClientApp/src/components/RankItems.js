import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages';
import RankingGrid from './RankingGrid';
import ItemCollection from './ItemCollection';

const RankItems = () => {

    const [reload, setReload] = useState(false);

    const [items, setItems] = useState([]);
    const dataType = 1;

    function Reload() {
        setReload(true);
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetElm.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }
    }

    useEffect(() => {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            });
    }, []);

    return (
        (items != null) ?
            <main>
                <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={MovieImageArr} />
                <button onClick={Reload} className="reload" style={{ "marginTop": "10px" }}> <span className="text" >Reload</span > </button>
            </main>
            : <main>Loading...</main>
    );
}

export default RankItems;
