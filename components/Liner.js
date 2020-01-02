import React from 'react';
import {View, Text, Animated, Button} from 'react-native';
import Svg, { Rect, Circle, Line } from 'react-native-svg';

function calculate(x1, y1, x2, y2, length) {
    return { 
        x2: x1 * (100-length)/100 + x2 * (length)/100, 
        y2: y1 * (100-length)/100 + y2 * (length)/100
    }
}

function Liner(props) { 
    const lengthAnim = new Animated.Value(0);
    const [items, setItems] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [currentIdx, setCurrentIdx] = React.useState(0);
    const [isAnimeStart, setIsAnimeStart] = React.useState(false);
    const refs = items.map(()=>React.createRef());

    lengthAnim.addListener((item) => {
        let [ x1, y1, x2, y2 ] = [
            currentIdx - 1 < 0 ? 0 : ((currentIdx - 1) / items.length) * 100,
            currentIdx - 1 < 0 ? items[items.length - 1] : items[currentIdx - 1] * 100,
            ((currentIdx) / items.length) * 100,
            items[currentIdx] * 100
        ];
        const calc = calculate(x1, y1, x2, y2, Number(item.value));
        if(refs[currentIdx].current) refs[currentIdx].current.setNativeProps({ x2: calc.x2 + "%", y2: calc.y2+ "%"})
        // console.log(refs[currentIdx], currentIdx);
    });

    function animated() {
        if(!isAnimeStart) { return; };
 
        Animated.timing(
            lengthAnim,
            { toValue: 100, duration: 300 }
        ).start(() => {
            const nextIdx = currentIdx + 1 >= items.length ? 0 : currentIdx + 1;
            items[nextIdx] = Math.random();

            setCurrentIdx(nextIdx);
            setItems(items);
        });
    }

    React.useEffect(animated, [isAnimeStart, currentIdx]);

    return (
        <View>
            <Text>테스트 드로잉</Text>
            <Svg height="100" width="100%">
                <Rect fill={"#101010"} width="100%" height="100%"></Rect>
                {items.map((item, idx)=>{
                    let [ x1, y1, x2, y2 ] = [
                        idx - 1 < 0 ? 0 : ((idx - 1) / items.length) * 100,
                        idx - 1 < 0 ? items[items.length - 1] : items[idx - 1] * 100,
                        ((idx) / items.length) * 100,
                        item * 100
                    ]; 
                    
                    return (
                        <>
                            <Circle cx={ x1 + "%" } cy={ y1 + "%"} r="1" fill="pink" key={`circle-${idx}`}></Circle>
                            <Line x1={ x1 + "%" } y1={ y1 + "%" } ref={refs[idx]} x2={ x2 + "%" } y2={ y2 + "%" } stroke="pink" strokeWidth="1"></Line>
                        </>
                    )
                })}
            </Svg>
            <Text>{currentIdx} {items.length}</Text>
            {items.map((item, idx)=>(
                <Text key={`key-${idx}`}>{idx} {item.toString()}</Text>
            ))}
            <Button onPress={()=>{setIsAnimeStart(!isAnimeStart)}} title={isAnimeStart ? "종료" : "시작"}></Button>
        </View>
    )
}

export default Liner;