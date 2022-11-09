import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../constants/statuses';
import { fetchClientsByStatus } from '../../service/check-in-api-service';
import { clientActions } from '../../store/slices/client-slice';
import ClientCard from '../ClientCard/ClientCard';

const checkInServiceBaseUrl = process.env.REACT_APP_CHECKIN_SERVICE_BASE_URL;
const v1CheckInRoot = process.env.REACT_APP_V1_CHECKIN_ROOT;
const streamCheckedInClients = process.env.REACT_APP_STREAM;

const ClientQueue = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const clientQueue = useSelector(state => state.clientReducer.clientQueue);

    const fetchCheckedInClients = async () => {
        dispatch(clientActions.initClientQueue(await fetchClientsByStatus(STATUSES.CHECKED_IN)));
        setIsLoading(false);
    }

    const consumeStreamedClients = () => {
        const checkInEventSource = new EventSource(checkInServiceBaseUrl + v1CheckInRoot + streamCheckedInClients,
            { withCredentials: false });

        checkInEventSource.addEventListener(STATUSES.CHECKED_IN, event => {
            dispatch(clientActions.addNewClientToQueue(JSON.parse(event.data)));
        });

        checkInEventSource.addEventListener(STATUSES.CALLED, event => {
            dispatch(clientActions.removeClientFromQueue(JSON.parse(event.data)));
        })

        checkInEventSource.onerror = event => {
            checkInEventSource.close();
        }

        return () => {
            checkInEventSource.close();
        }
    }

    useEffect(() => {
        consumeStreamedClients();
        fetchCheckedInClients();
    }, []);

    return (
        <div>
            {!isLoading && clientQueue.map(client => <ClientCard key={client.id} client={client} />)}
        </div>
    );
}

export default ClientQueue;
