import './style.css'

const btn = document.getElementById('btn')
const save = document.getElementById('btn-save')

let loadedFile = {}

function loadFile () {
  const input = document.createElement('input')
  input.type = 'file'

  input.onchange = e => {
    const file = e.target.files[0]
    loadedFile = file
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = readerEvent => {
      const content = readerEvent.target.result
      loadedFile.content = content
    }
  }

  input.click()
}

function saveFile () {
  const blob = new Blob([loadedFile.content], { type: loadedFile.type })
  const anchor = document.createElement('a')

  anchor.download = loadedFile.name
  anchor.href = (window.webkitURL || window.URL).createObjectURL(blob)
  anchor.dataset.downloadurl = [
    loadedFile.type, anchor.download, anchor.href
  ].join(':')
  anchor.click()
}

btn.addEventListener('click', loadFile)
save.addEventListener('click', saveFile)

function previewFile (file) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    const img = document.createElement('img')
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
  }
}

const dropArea = document.getElementById('drop-area')

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

// Добавить класс highlight в CSS!!!
function highlight () {
  dropArea.classList.add('highlight')
}

function unhighlight () {
  dropArea.classList.remove('highlight')
}

function handleFiles (files) {
  const filesArray = Array.from(files)
  // Что-то сделать, например, сделать превью
  previewFile(filesArray[0])
}

function handleDrop (e) {
  const dt = e.dataTransfer
  const { files } = dt
  handleFiles(files)
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
});
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

dropArea.addEventListener('drop', handleDrop, false)
