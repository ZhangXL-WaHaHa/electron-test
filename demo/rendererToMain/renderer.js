/*
 * @Author: Tobi
 * @Date: 2023-09-03 14:15:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 16:13:53
 * @Description: 
 * @FilePath: \test\demo\rendererToMain\renderer.js
 */
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})