
import './Kontak.css'

const contacts = [
  {
    icon: '📍',
    title: 'Alamat',
    value: 'Alamat Suku Dinas Kesehatan Jakarta Selatan',
  },
  {
    icon: '☎',
    title: 'Telepon',
    value: '(021) XXX-XXXX',
  },
  {
    icon: '✉',
    title: 'Email',
    value: 'email@contoh.go.id',
  },
  {
    icon: '◎',
    title: 'Instagram',
    value: '@instagram_placeholder',
  },
]

function Kontak() {
  return (
    <main className="contact-page">
      <div className="contact-container">
        <h1>Kontak & Bantuan</h1>

        <div className="contact-grid">
          {contacts.map((contact) => (
            <article className="contact-card" key={contact.title}>
              <span className="contact-icon">{contact.icon}</span>
              <div>
                <h2>{contact.title}</h2>
                <p>{contact.value}</p>
              </div>
            </article>
          ))}
        </div>

        <section className="contact-note">
          <h2>Butuh bantuan lebih lanjut?</h2>
          <p>
            Silakan hubungi Suku Dinas Kesehatan Jakarta Selatan melalui
            informasi kontak yang tersedia.
          </p>
        </section>
      </div>
    </main>
  )
}

export default Kontak
