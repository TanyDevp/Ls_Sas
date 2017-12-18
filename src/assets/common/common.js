
import { message } from 'antd';
import createHistory from 'history/createHashHistory';
/*通用组件*/

const BASE_URL = process.NODE_ENV === 'production' ? 'http://113.105.237.98:8806/BSPRT-API/' : 'http://192.168.1.68:22222/';
// const BASE_URL = 'http://192.168.1.68:22222/';
const history = createHistory();

export default class BaseFunction {
    static getServerData = (funcName, params, func) => {
        let SessionKey = localStorage.lskey;
        var searchParams;
        try {
            searchParams = new URLSearchParams()
            searchParams.set('SessionKey', SessionKey);
            for (let parm in params) {
                searchParams.set(parm, params[parm]);
            }
        }
        catch (e) {
            searchParams = 'SessionKey=' + SessionKey;
            for (let parm in params) {
                searchParams += '&' + parm + '=' + params[parm]
            }
        }
        return fetch(BASE_URL + funcName, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json, text/javascript, */*; q=0.01",
            },
            body: searchParams
        }).then(response => response.json())
            .then(responseJson => {
                if (responseJson.IsPass === false || responseJson.IsErr === true) {
                    message.warning('登录身份已过期，请重新登录！');
                    history.push('/login');
                    return;
                }
                func(responseJson);
                return responseJson;
            }).catch(err => {
                // window.location.href = '/#/login';
                // window.location.reload();
                message.error('服务器异常，请联系系统管理员！');
                console.error(err);
                history.push('/login');
                return err;
            });
    };

    static getServerDatabyget = (funcName, params, func) => {
        let SessionKey = localStorage.lskey;
        var searchParams;
        searchParams = 'SessionKey=' + SessionKey;
        for (var parm in params) {
            searchParams += '&' + parm + '=' + params[parm]
        }
        return fetch(BASE_URL + funcName + '?' + searchParams, {
            method: "GET",
        }).then(response => response.json())
            .then(responseJson => {
                func(responseJson);
                return responseJson;
            }).catch(err => {
                message.error('服务器异常，请联系系统管理员！');
                console.error(err);
                history.push('/login');
                return err;
            });
    };



}

