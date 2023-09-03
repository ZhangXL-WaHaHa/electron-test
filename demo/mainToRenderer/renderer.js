/*
 * @Author: Tobi
 * @Date: 2023-09-03 14:15:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 15:32:17
 * @Description: 
 * @FilePath: \test\demo\rendererMainTwoWay\renderer.js
 */
const counter = document.getElementById('counter')

window.electronAPI.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue
  event.sender.send('counter-value', newValue)
})