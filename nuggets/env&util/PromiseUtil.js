const $ = require("./Env");

module.exports = class PromiseUtil {
	static GET = "get";
	static POST = "post";

	/**
	 * 构造并返回 Promise
	 *
	 * @param baseUrl 基地址
	 * @param url 接口名
	 * @param method 请求方式
	 * @param headers 请求头
	 * @param body 请求体
	 * @param resHandelr 结果处理器
	 * */
	static buildPromise(baseUrl, url, method, headers, body, resHandler) {
		if (!$[method]) {
			throw new Error("未知方法");
		}

		let option = {
			url: `${baseUrl}${url}`,
			headers: headers,
			timeout: 10000,
		};

		if (body) {
			option.body = body;
		}

		return new Promise((resolve, reject) => {
			$[method](option, (err, resp, data) => {
				if (err) {
					reject(err);
				} else {
					if (resHandler) {
						data = resHandler(data);
					}
					resolve(data);
				}
			});
		});
	}
};
