const information = document.getElementById('info')
information.innerText = `本应用正在使用${_w.platform} Electron (v${_w.electron()})`


document.getElementById('btn').onclick = async function () {
  const res = await _w.send('send to main')
  console.log(`back from main：${res}`)
}