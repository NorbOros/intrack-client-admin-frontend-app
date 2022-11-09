import axios from 'axios';

const clientAdminServiceBaseUrl = process.env.REACT_APP_CLIENT_ADMIN_SERVICE_BASE_URL;
const v1ClientAdminRoot = process.env.REACT_APP_V1_CLIENT_ADMIN_ROOT;


export const fetchClientsByStatus = async status => {
    return await axios.get(clientAdminServiceBaseUrl + v1ClientAdminRoot + '/' + status)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
};

export const changeAppointmentStatus = async client => {
    return await axios.post(clientAdminServiceBaseUrl + v1ClientAdminRoot, client)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            return error;
        });
}

