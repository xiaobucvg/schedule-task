/*
掘金签到-抽奖
更新时间：2022-01-26

=========================Loon=============================
[Script]
cron "0 8 * * *" script-path=task-掘金每日签到抽奖.js,tag=掘金签到-抽奖
*/
const $ = require("./Dep-Env");
const NotifyUtil = require("./sendNotify");
const NuggetsClient = require("./Dep-NuggetsClient");

$.cookie = process.env.JUEJIN_COOKIE;

/**
 * 任务执行流程
 */
async function processFlow() {
	// 1. 检查 Cookie 是否存在
	if (!$.cookie) {
		console.log("未获取到掘金Cookie!");
		NotifyUtil.sendNotify($.name, `未获取到掘金Cookie!`);
		return;
	}

	var nuggetsClient = new NuggetsClient($.cookie);

	// 2. 检查 Cookie 是否有效
	let valid = await nuggetsClient.validateUser();
	if (!valid) {
		console.log("用户Cookie已失效!");
		NotifyUtil.sendNotify($.name, `用户Cookie已失效!`);
		return;
	}

	// 3. 开始签到
	let signInfo = await nuggetsClient.signIn();
	console.log("签到信息:" + signInfo);

	// 4. 开始抽奖
	let lotteryInfo = await nuggetsClient.lottery();
	console.log("抽奖结果:" + lotteryInfo);

	// 5. 获取剩余矿石信息
	let oreInfo = await nuggetsClient.getAmountOfOre();
	console.log("剩余矿石信息:" + oreInfo);

	NotifyUtil.sendNotify(
		$.name,
		`
    \n签到结果[${signInfo}]
    \n抽奖结果[${lotteryInfo}]
    \n获取矿石数量[${oreInfo}]
    `
	);
}

processFlow();
