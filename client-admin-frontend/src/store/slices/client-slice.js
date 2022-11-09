import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clientQueue: [],
    currentClient: {}
};

const initClientQueue = (state, action) => {
    state.clientQueue = action.payload;
}

const addNewClientToQueue = (state, action) => {
    const newClient = action.payload;
    if (!(state.clientQueue.find(cl => cl.id === newClient.id))) {
        state.clientQueue.push(newClient);
    }
}

const removeClientFromQueue = (state, action) => {
    state.clientQueue = state.clientQueue.filter((client) => client.id !== action.payload.id);
}

const modifyCurrentClient = (state, action) => {
    state.currentClient = action.payload;
}

const clearCurrentClient = (state) => {
    state.currentClient = {};
}

const clientSlice = createSlice({
    name: 'clientSlice',
    initialState: initialState,
    reducers: {
        modifyCurrentClient,
        initClientQueue,
        addNewClientToQueue,
        removeClientFromQueue,
        clearCurrentClient
    },
});

export const clientActions = clientSlice.actions;
export default clientSlice;