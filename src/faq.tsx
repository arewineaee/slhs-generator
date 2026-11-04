
import { useState } from 'react'
import './FAQ.css'

const faqItems = [
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'Consectetur adipiscing elit?',
    answer:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Sed do eiusmod tempor incididunt?',
    answer:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    question: 'Ut enim ad minim veniam?',
    answer:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    question: 'Quis nostrud exercitation ullamco?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="faq-page">
      <div className="faq-container">
        <h1>FAQ</h1>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <article className="faq-item" key={index}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default FAQ
