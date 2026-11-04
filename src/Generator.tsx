
import { useEffect, useRef, useState } from 'react'
import './Generator.css'

const LOGO_URL = '/images/logo-slhs.svg'
const CANVAS_SIZE = 1000

function drawCurvedText(
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number,
  fontSize: number,
) {
  const chars = [...text]

  context.save()
  context.font = `800 ${fontSize}px Arial, sans-serif`
  context.fillStyle = '#ffffff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  const widths = chars.map((char) => context.measureText(char).width + 1)
  const totalAngle = widths.reduce(
    (sum, width) => sum + width / radius,
    0,
  )

  let angle = Math.PI / 2 + totalAngle / 2

  chars.forEach((char, index) => {
    const advance = widths[index] / radius
    angle -= advance / 2

    context.save()
    context.translate(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius,
    )
    context.rotate(angle - Math.PI / 2)
    context.fillText(char, 0, 0)
    context.restore()

    angle -= advance / 2
  })

  context.restore()
}

function renderLogo(canvas: HTMLCanvasElement, number: string) {
  const context = canvas.getContext('2d')
  if (!context) return

  const image = new Image()

  image.onload = () => {
    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE

    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    context.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE)

    const line = `NO. SERTIFIKAT ${number}`.toUpperCase()

    drawCurvedText(context, line, 500, 440, 355, 22)
  }

  image.onerror = () => {
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    context.fillStyle = '#687a72'
    context.font = '18px Arial, sans-serif'
    context.textAlign = 'center'
    context.fillText(
      'Logo gagal dimuat. Periksa file logo-slhs.svg',
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2,
    )
  }

  image.src = LOGO_URL
}

function Generator() {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [message, setMessage] = useState('')
  const [step, setStep] = useState<'input' | 'generated'>('input')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (step === 'generated' && canvasRef.current) {
      renderLogo(canvasRef.current, certificateNumber)
    }
  }, [step, certificateNumber])

  function handleGenerate() {
    const number = certificateNumber.trim()

    if (!number) {
      setMessage('Masukkan nomor sertifikat SLHS terlebih dahulu.')
      setStep('input')
      return
    }

    setCertificateNumber(number)
    setMessage('Logo berhasil dibuat. Silakan unduh hasilnya.')
    setStep('generated')
  }

  function downloadLogo() {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')

    link.download = `logo-slhs-${certificateNumber.replace(
      /[^a-zA-Z0-9_-]/g,
      '-',
    )}.png`

    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <main className="generator-page">
      <section className="generator-heading">
        <a href="/" className="back-home">
          ← Kembali ke Beranda
        </a>

        <span className="eyebrow">LAYANAN DIGITAL</span>

        <h1>Generator Logo SLHS</h1>

        <p>
          Masukkan nomor sertifikat SLHS untuk membuat logo
          secara otomatis.
        </p>
      </section>

      <section className="generator-layout">
        <div className="generator-panel">
          <div className="generator-step">
            <span className="step-number">01</span>
            <div>
              <h2>Masukkan Nomor Sertifikat</h2>
              <p>
                Isi nomor sertifikat SLHS yang ingin ditampilkan
                pada logo.
              </p>
            </div>
          </div>

          <label htmlFor="certificate-number">
            Nomor sertifikat SLHS
          </label>

          <input
            id="certificate-number"
            type="text"
            value={certificateNumber}
            autoComplete="off"
            placeholder="Masukkan nomor sertifikat"
            onChange={(event) => {
              setCertificateNumber(event.target.value)
              setMessage('')
              setStep('input')
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleGenerate()
              }
            }}
          />

          <button
            type="button"
            className="verify-button"
            onClick={handleGenerate}
          >
            Buat Logo SLHS
            <span aria-hidden="true">→</span>
          </button>

          {message && (
            <div className="verification-message" role="status">
              {message}
            </div>
          )}

          <div className="generator-notice">
            <span className="notice-icon">i</span>
            <p>
              <strong>Informasi penggunaan</strong>
              <br />
              Generator ini hanya membuat logo berdasarkan nomor
              yang dimasukkan. Nomor sertifikat tidak diverifikasi
              terhadap database resmi.
            </p>
          </div>
        </div>

        <section className="logo-preview-panel" aria-live="polite">
          <div className="preview-heading">
            <span className="step-number">02</span>
            <div>
              <h2>Pratinjau Logo</h2>
              <p>
                Hasil logo akan muncul setelah nomor sertifikat
                dimasukkan.
              </p>
            </div>
          </div>

          {step === 'generated' ? (
            <>
              <div className="logo-preview">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  aria-label={`Pratinjau logo SLHS nomor ${certificateNumber}`}
                />
              </div>

              <button
                type="button"
                className="download-button"
                onClick={downloadLogo}
              >
                Unduh Logo PNG
                <span aria-hidden="true">↓</span>
              </button>
            </>
          ) : (
            <div className="preview-empty">
              <p>
                Pratinjau logo akan muncul di sini setelah kamu
                memasukkan nomor sertifikat.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default Generator
