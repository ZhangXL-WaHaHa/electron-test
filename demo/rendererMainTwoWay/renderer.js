/*
 * @Author: Tobi
 * @Date: 2023-09-03 14:15:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 16:13:16
 * @Description: 
 * @FilePath: \test\demo\rendererMainTwoWay\renderer.js
 */
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
const TodoUl = document.getElementById('todoList')
setButton.addEventListener('click', async () => {
  const list = await window.electronAPI.setTodo(titleInput.value)
  TodoUl.innerHTML = list.map(item => {
    return "<li>"+ item +"<\/li>";
  }).join('')
})