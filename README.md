# 青龙面板自用库

## (一) 青龙面板使用

**1.1 内置命令**
```
# 更新并重启青龙
ql update                                                    
# 运行自定义脚本extra.sh
ql extra                                                     
# 添加单个脚本文件
ql raw <file_url>                                             
# 添加单个仓库的指定脚本
ql repo <repo_url> <whitelist> <blacklist> <dependence> <branch>   
# 删除旧日志
ql rmlog <days>                                              
# 启动tg-bot
ql bot                                                       
# 检测青龙环境并修复
ql check                                                     
# 重置登录错误次数
ql resetlet                                                  
# 禁用两步登录
ql resettfa                                                  

# 依次执行，如果设置了随机延迟，将随机延迟一定秒数
task <file_path>                                             
# 依次执行，无论是否设置了随机延迟，均立即运行，前台会输出日，同时记录在日志文件中
task <file_path> now                                         
# 并发执行，无论是否设置了随机延迟，均立即运行，前台不产生日，直接记录在日志文件中，且可指定账号执行
task <file_path> conc <env_name> <account_number>(可选的) 
# 指定账号执行，无论是否设置了随机延迟，均立即运行 
task <file_path> desi <env_name> <account_number>         
```

**1.2 参数说明**
- file_url: 脚本地址
- repo_url: 仓库地址
- whitelist: 拉取仓库时的白名单，即就是需要拉取的脚本的路径包含的字符串
- blacklist: 拉取仓库时的黑名单，即就是需要拉取的脚本的路径不包含的字符串
- dependence: 拉取仓库需要的依赖文件，会直接从仓库拷贝到- - scripts下的仓库目录，不受黑名单影响
- branch: 拉取仓库的分支
- days: 需要保留的日志的天数
- file_path: 任务执行时的文件路径
- env_name: 任务执行时需要并发或者指定时的环境变量名称
- account_number: 任务执行时指定某个环境变量需要执行的账号序号

**1.3 GitHub地址**

[点击直达[https://github.com/whyour/qinglong]](https://github.com/whyour/qinglong)


## (二) 自用脚本

**2.1 掘金自动签到,抽奖脚本**
```
脚本路径: task-掘金每日签到抽奖.js
cron:   0 8 * * *
脚本描述: 每天8点自动进行[掘金]签到,抽奖(每天第一抽免费),获取矿石数量并推送消息
使用方法: 青龙面板内添加环境变量[JUEJIN_SESSION_ID],其值可使用电脑登录[掘金]后,从开发者工具中Cookie里面获取
```