/**
 * Created by kurosaki on 2018/9/4.
 */

export default class HttpUtils {
    //基于 fetch 封装的 GET请求
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                return response.json();
            }).then((result) => {
                return resolve(result)
            }).catch((error) => {
                return reject(error)
            })
        })
    }
    //基于 fetch 封装的 POST请求
    static post(url, data) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '',
        }
        //获取本地的token
        let token = localStorage.getItem('myTaoAuthorization');
        headers.Authorization = token;

        return new Promise((resolve, reject) => {
            //118.25.110.85:8098
            fetch('http://localhost:8098' + url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                return response.json();
            }).then((result) => {
                return resolve(result)
            }).catch((error) => {
                return reject(error)
            })
        })
    }
}

