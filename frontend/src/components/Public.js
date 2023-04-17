import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <section>
      <header></header>
      <main>
        <div style={{ fontSize: '20px' }}>
          Public page for Time<b>Keeper</b>
        </div>
        <p>Please log in to continue...</p>
      </main>
      <footer></footer>
    </section>
  )
  return content
}
export default Public
