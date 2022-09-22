export function getTime() {
    let Time = new Date();
    let Year = Time.getFullYear(); //!fullyear获取完整的年数 number+''空字符串变成字符串类型
    let Month = Time.getMonth();
    let MonthDate = Time.getDate();
    let Week = Time.getDay();
    let House = Time.getHours();
    let Minutes = Time.getMinutes();
    let Seconds = Time.getSeconds();
    //处理个位数为0
    let NewHouse =(House.toString().length==1)?('0'+House):(House)
    let NewMinutes =(Minutes.toString().length==1)?('0'+Minutes):(Minutes)
    let NewSeconds =(Seconds.toString().length==1)?('0'+Seconds):(Seconds)
    //设置周期大小写
    let chinesWeek=['一','二','三','四','五','六','日']
    let NowTime =
      Year +
      "年" +
      Month +
      "月" +
      MonthDate +
      "日" +
      " " +
      "星期" +
     chinesWeek[Week-1]  +' '+
     NewHouse +
      ":" +
      NewMinutes +
      ":" +
      NewSeconds
  
    return NowTime;
  }