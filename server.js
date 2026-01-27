import "dotenv/config"; // inicia dotenv (.env)
import app from './src/app.js'

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
});