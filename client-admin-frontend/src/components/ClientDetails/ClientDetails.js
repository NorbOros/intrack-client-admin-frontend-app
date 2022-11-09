import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../constants/statuses';
import { changeAppointmentStatus } from '../../service/check-in-api-service';
import { parseStringToTime } from '../../service/date-time-converter';
import { clientActions } from '../../store/slices/client-slice';

const ClientDetails = () => {
    const dispatch = useDispatch();
    const currentClient = useSelector(state => state.clientReducer.currentClient);
    const { id, title, dueDateTime, checkInDateTime, registrationNm } = currentClient;

    const doneClickHandler = async () => {
        const response = await changeAppointmentStatus({ appointmentId: id, status: STATUSES.CLOSED, administratorId: 'AdminId' });
        if (response === 200) {
            dispatch(clientActions.clearCurrentClient());
        }
    }

    const sendBackToQueueClickHandler = async () => {
        if (Object.keys(currentClient).length === 0) return;
        const response = await changeAppointmentStatus({ appointmentId: id, status: STATUSES.CHECKED_IN, administratorId: 'AdminId' });
        if (response === 200) {
            dispatch(clientActions.addNewClientToQueue(currentClient));
            dispatch(clientActions.clearCurrentClient());
        }
    }

    return (
        <Fragment>
            {Object.keys(currentClient).length !== 0 &&
                <div className='card shadow pt-4 pb-4 ps-4 pe-3 bg-body rounded'>
                    <h3 className='mb-3'>Appointment details</h3>
                    <h5>{title}</h5>
                    <div>Ticket number</div>
                    <p>{registrationNm}</p>
                    {checkInDateTime &&
                        <div className='mb-2'>
                            <div>Check In date</div>
                            <div>{parseStringToTime(checkInDateTime)}</div>
                        </div>
                    }
                    {dueDateTime &&
                        <div>
                            <div>Due date</div>
                            <div>{parseStringToTime(dueDateTime)}</div>
                        </div>
                    }
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-outline-success btn-lg mt-5 mb-3 mt-3 w-25'
                            onClick={doneClickHandler}>Done</button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-outline-warning btn-sm mb-3 w-25'
                            onClick={sendBackToQueueClickHandler}>Send Back to Queue</button>
                    </div>
                </div>}
        </Fragment>
    );
}

export default ClientDetails;