import axios from "axios";
import { EventSourcePolyfill } from 'event-source-polyfill';

const BASE_URL = "http://localhost:8080"

export async function connectCall() {
    const sse = new EventSourcePolyfill(`${BASE_URL}/connect`);

    sse.addEventListener('connect', e => {
        const { data: receivedData } = e;
        console.log(receivedData);
    });
}