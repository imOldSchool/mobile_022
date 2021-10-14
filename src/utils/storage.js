export const getItem = name => {
    const data = window.localStorage.getItem(name)
    //查询提取 本地储存
    try{
        //转换为对象格式传出 
        return JSON.parse(data)
    } catch(err){
        return data
    }
}

export const setItem = (name, value) => {
    //储存更新 本地储存
    //如果传进来的参数是对象格式 就转化为字符串格式
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}

export const removeItem = name => {
    //删除本地储存某个 key
    window.localStorage.removeItem(name)
}