import commonAPI from "./commonAPI";
import SERVERURL from "./serverurl";

//register
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/register`,reqBody)
}

//login
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/login`,reqBody)
}

//addproperty
export const addPropertyAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/property/add`,reqBody,reqHeader)
}

//getallproperties
export const allPropertyAPI = async (reqHeader, type = '', location = '') => {
    let url = `${SERVERURL}/all-properties`;
    if (type || location) {
        const params = [];
        if (type) params.push(`type=${type}`);
        if (location) params.push(`location=${location}`);
        url += `?${params.join('&')}`;
    }
    return await commonAPI("GET", url, "", reqHeader);
}


//getuserproperties
export const userPropertyAPI = async (reqHeader, purpose = '') => {
    let url = `${SERVERURL}/user-properties`;
    if (purpose) {
      url += `?purpose=${purpose}`;
    }
    return await commonAPI("GET", url, "", reqHeader);
  }

// get property by ID
export const getPropertyByIdAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/property/${id}`, "", reqHeader);
 }

 // get user details by ID
 export const getUserDetailsAPI = async (userId, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/user/${userId}`, "", reqHeader);
}

// Edit property by ID
export const editPropertyAPI = async (pid, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/property/${pid}/edit`, reqBody, reqHeader);
}


// /property/:pid/remove
export const removePropertyAPI = async (pid,reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/property/${pid}/remove`,{},reqHeader);

}

//save feedback
export const saveFeedbackAPI = async (feedbackData, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/feedback`, feedbackData, reqHeader);
};
 

