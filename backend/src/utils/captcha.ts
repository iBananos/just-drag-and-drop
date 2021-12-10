import svgCaptcha from 'svg-captcha';

export default class Captcha {

    data : string;

    response : string;


    constructor() {
        var captcha = svgCaptcha.create({size: 5});
        let data : any = captcha.data;
        data = data.replaceAll(/([#])\d+/g, "#bba422");

        this.data = data;
        this.response = captcha.text;
    }

    getData() {
        return this.data;
    }

    getResponse() {
        return this.response;
    }
}