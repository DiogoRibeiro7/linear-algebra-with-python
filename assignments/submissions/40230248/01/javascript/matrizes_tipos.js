const output = document.getElementById("output")


const A = math.matrix([
  [1, 2],
  [3, 4]
])


const det = math.det(A)
const inv = math.inv(A)

output.innerHTML = `
  <p><b>Matriz A:</b> ${A}</p>
  <p><b>Determinante:</b> ${det}</p>
  <p><b>Inversa:</b> ${inv}</p>
`