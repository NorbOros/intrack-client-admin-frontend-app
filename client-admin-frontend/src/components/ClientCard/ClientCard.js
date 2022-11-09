import { useDispatch, useSelector } from 'react-redux';
import { clientActions } from '../../store/slices/client-slice';
import { changeAppointmentStatus } from '../../service/check-in-api-service';
import { parseStringToTime } from '../../service/date-time-converter';
import { STATUSES } from '../../constants/statuses';

const ClientCard = (props) => {
    const client = props.client;
    const { id, title, checkInDateTime, dueDateTime } = client;
    const currentClient = useSelector(state => state.clientReducer.currentClient);
    const dispatch = useDispatch();

    const callClickHandler = async () => {
        if (Object.keys(currentClient).length !== 0) {
            return;
        }
        const response = await changeAppointmentStatus({ appointmentId: id, status: STATUSES.CALLED, administratorId: 'Admin123', desk: 'A23' });
        if (response === 200) {
            dispatch(clientActions.modifyCurrentClient(client));
            dispatch(clientActions.removeClientFromQueue({ id: id }));
        }
    }
    return (
        <div className='card shadow bg-body rounded mb-3'>
            <div className='card-body d-flex flex-row justify-content-between'>
                <div>
                    <h5 className='card-title mb-3'>{title}</h5>
                    <div className='d-flex flex-row justify-content-between'>
                        <div className='card-text me-3'>Check In date</div>
                        <div className='card-text'>{parseStringToTime(checkInDateTime)}</div>
                    </div>
                    {dueDateTime &&
                        <div className='d-flex flex-row justify-content-between'>
                            <div className='card-text'>Due date</div>
                            <div className='card-text'>{parseStringToTime(dueDateTime)}</div>
                        </div>
                    }
                </div>
                <button
                    className='btn btn-outline-success btn-sm position-absolute bottom-0 end-0 mb-2 me-2'
                    onClick={callClickHandler}>Call Client</button>
            </div>
        </div >
    );
}

export default ClientCard;
