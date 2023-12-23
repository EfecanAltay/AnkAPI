import { WeatherForecast } from '@/common/data/WeatherForecast';
import * as rm from 'typed-rest-client/RestClient' 

export class AuthonticationAPI{
    public static async Get(){
        let client: rm.RestClient = new rm.RestClient('rest-samples','http://localhost:5042');
        let options: rm.IRequestOptions = {acceptHeader: "application/json",};
        const result =  await client.get<WeatherForecast[]>('/WeatherForecast',options);
        console.log(result.result);
    }
}