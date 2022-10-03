import './App.css';
import {useEffect, useState} from "react";
import { EventSourcePolyfill } from 'event-source-polyfill';
import axios from "axios";


const BASE_URL = "http://localhost:8080"

function App() {
    const [count, setCount] = useState(null);

    const handleConnect = () =>{
        const sse = new EventSourcePolyfill(`${BASE_URL}/connect`);

        sse.addEventListener('connect', (e) => {
            const { data: receivedConnectData } = e;

            console.log('connect event data: ',receivedConnectData);
        });

        sse.addEventListener('count', e => {

            const { data: receivedCount } = e;

            // setData(JSON.parse(receivedSections));
            console.log("count event data",receivedCount);
            setCount(receivedCount);
        })
    }


    const handleCountClick = async () => {
        await axios.post(`${BASE_URL}/count`)
            .then(function (response) {
                console.log('handleCountClick',response);
            })
            .catch(function (error) {
                console.log('error',error);
            });
    }


  return (
    <div className="App">
        <button onClick={handleConnect}>connect 요청</button>
        <button onClick={handleCountClick}>count 요청</button>
        <div>{count}</div>
    </div>
  );
}

export default App;
