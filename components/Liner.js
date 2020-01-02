import React from 'react';
import {View, Text} from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';

function Liner(props) { 
    const [items, setItems] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [currentIdx, setCurrentIdx] = React.useState(0);
    
    setInterval(()=> {
        items[currentIdx] = Math.random();
        setItems(items);
        setCurrentIdx(currentIdx + 1 > items.length ? 0 : currentIdx + 1);
    }, 3000);

    return (
        <View>
            <Text>테스트 드로잉</Text>
            <Svg height="100" width="100%">
                <Rect fill={"#101010"} width="100%" height="100%"></Rect>
                {items.map((item, idx)=>(
                    <Circle cx={ (idx * 100 / (items.length - 1)) + "%" } cy={100 - (item * 100)} r="1" fill="pink" key={`circle-${idx}`}></Circle>
                ))}
            </Svg>
            <Text>{currentIdx} {items.length}</Text>
            {items.map((item, idx)=>(
                <Text key={`key-${idx}`}>{idx} {item.toString()}</Text>
            ))}
        </View>
    )
}

export default Liner;