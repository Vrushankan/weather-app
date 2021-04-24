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

export const getWeatherResponse=(lat, long,units='metric', AppId='95c1e4ae5257659710fe02d9c4125ee8')=>{
    const apiPath =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${units}&APPID=${AppId}`;
    let response =makeGetCall(apiPath)
    return handleResponse(response,false).then((resp)=>{
        return resp
    })
}

export const getNearbyPlaces=(query, lat, long, limit = 5, radius = 10000,apiKey='6wVm73OG43Zb29Vd9yPs5JPdBYMTU7N6') =>{
    let baseUrl = 'https://api.tomtom.com/search/2/poiSearch';
    let queryString = `limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${apiKey}`;
    let response =makeGetCall(`${baseUrl}/${query}.json?${queryString}`)
    return handleResponse(response,false).then((resp)=>{
        return resp
    })
}