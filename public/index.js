const linkinput = document.getElementById('input-link')
const handlesubmit = () => {
  if (linkinput.value) {
    location.href = linkinput.value
  }
}
