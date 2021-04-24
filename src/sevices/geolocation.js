import axios from "axios";

const headers = new Headers({
	"Content-Type": "application/json",
});
function handleResponse(result, alertVisible = true) {
	return result
		.then(data => {
			return data.data;
		})
		.catch(error => {
			console.log(error);
		});
}
const makeGetCall = (endPoint) => axios.get(`${endPoint}`, headers);

export const getWeatherResponse=(lat, long, AppId='95c1e4ae5257659710fe02d9c4125ee8')=>{
    const apiPath =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&APPID=${AppId}`;
    let response =makeGetCall(apiPath)
    return handleResponse(response,false).then((resp)=>{
        return resp
    })
}