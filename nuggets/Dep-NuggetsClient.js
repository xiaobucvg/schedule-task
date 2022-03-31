const PromiseUtil = require("./Dep-PromiseUtil");

/**
 * 掘金客户端
 **/
module.exports = class NuggetsClient {
	// ============================================== 相关地址 >>> ==============================================
	// 掘金 API 基地址
	static API_BASE_URL = "https://api.juejin.cn";

	// 掘金基地址
	static BASE_URL = "https://juejin.cn";

	// 获取用户信息接口
	static API_USER_INFO = "/user_api/v1/user/get";

	// 签到接口
	static API_CHECK_IN = "/growth_api/v1/check_in";

	// 抽奖接口
	static API_LOTTERY_DRAW = "/growth_api/v1/lottery/draw";

	// 获取当前矿石数量接口
	static API_GET_CUR_POINT = "/growth_api/v1/get_cur_point";

	// 获取 Token 接口
	static API_GET_TOKEN = "/get/token";
	// ============================================== 相关地址 <<< ==============================================

	constructor(cookie) {
		if (!cookie) {
			throw new Error("构造客户端需要有效的Cookie");
		}
		this.headers = {
			"content-type": "application/json; charset=utf-8",
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
			"sec-ch-ua": `'Chromium';v='88', 'Google Chrome';v='88', ';Not A Brand';v='99'`,
			"sec-ch-ua-mobile": "?0",
			accept: "*/*",
			credentials: "include",
			Cookie: cookie,
		};
	}

	/**
	 * 获取用户信息
	 * */
	async userInfo() {
		return PromiseUtil.buildPromise(
			NuggetsClient.API_BASE_URL,
			NuggetsClient.API_USER_INFO,
			PromiseUtil.GET,
			this.headers,
			null,
			(data) => {
				data = JSON.parse(data);
				return data;
			}
		);
	}

	/**
	 * 校验用户是否有效
	 * */
	async validateUser() {
		return PromiseUtil.buildPromise(
			NuggetsClient.API_BASE_URL,
			NuggetsClient.API_USER_INFO,
			PromiseUtil.GET,
			this.headers,
			null,
			(data) => {
				data = JSON.parse(data);
				return data.err_no === 0;
			}
		);
	}

	/**
	 * 获取 Token
	 * */
	async getToken() {
		return PromiseUtil.buildPromise(
			NuggetsClient.BASE_URL,
			NuggetsClient.API_GET_TOKEN,
			PromiseUtil.GET,
			this.headers,
			null,
			(data) => {
				data = JSON.parse(data);
				if (data.data) {
					return data;
				}
				return null;
			}
		);
	}

	/**
	 * 签到
	 * */
	async signIn() {
		return PromiseUtil.buildPromise(
			NuggetsClient.API_BASE_URL,
			NuggetsClient.API_CHECK_IN,
			PromiseUtil.POST,
			this.headers,
			null,
			(data) => {
				data = JSON.parse(data);
				return data.err_msg;
			}
		);
	}

	/**
	 * 抽奖
	 * */
	async lottery() {
		return PromiseUtil.buildPromise(
			NuggetsClient.API_BASE_URL,
			NuggetsClient.API_LOTTERY_DRAW,
			PromiseUtil.POST,
			this.headers,
			null,
			(data) => {
				data = JSON.parse(data);
				if (data.err_no === 0) {
					return data.data.lottery_name;
				}
				return err_msg;
			}
		);
	}

	/**
	 * 获取矿石数量
	 * */
	async getAmountOfOre() {
		return PromiseUtil.buildPromise(
			NuggetsClient.API_BASE_URL,
			NuggetsClient.API_GET_CUR_POINT,
			PromiseUtil.GET,
			this.headers,
			null,
			(data) => {
				data = JSON.parse(data);
				if (data.err_no === 0) {
					return data.data;
				}
				return "获取失败";
			}
		);
	}
};
