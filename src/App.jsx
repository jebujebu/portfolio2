import { useEffect, useRef, useState } from 'react'
import content from './content.json'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M3.333 8h9.334M8 3.333 12.667 8 8 12.667" />
    </svg>
  )
}

function Header({ page, onNavigate }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" onClick={() => onNavigate('home')}>
        <span className="wordmark-mark">{content.identity.monogram}</span>
        <span>{content.identity.name}</span>
      </a>
      <nav className="main-nav" aria-label={content.navigation.label}>
        <a
          className={page === 'home' ? 'nav-link active' : 'nav-link'}
          href="#home"
          onClick={() => onNavigate('home')}
        >
          {content.navigation.profile}
        </a>
        <a
          className={page === 'gallery' ? 'nav-link active' : 'nav-link'}
          href="#gallery"
          onClick={() => onNavigate('gallery')}
        >
          {content.navigation.gallery}{' '}
          <span className="nav-count">
            {String(
              content.gallery.projects.filter((project) => project.type === 'image').length,
            ).padStart(2, '0')}
          </span>
        </a>
      </nav>
      <a className="header-contact" href={`mailto:${content.identity.email}`}>
        {content.navigation.contact} <ArrowIcon />
      </a>
    </header>
  )
}

function SectionHeading({ number, children, aside }) {
  return (
    <div className="section-heading">
      <div className="section-title-wrap">
        <span className="section-number">{number}</span>
        <h2>{children}</h2>
      </div>
      {aside && <span className="section-aside">{aside}</span>}
    </div>
  )
}

function PortraitPlaceholder() {
  return (
    <div
      className="portrait-placeholder"
      role="img"
      aria-label={content.hero.portraitLabel}
    >
      <div className="portrait-orbit orbit-one" />
      <div className="portrait-orbit orbit-two" />
      <div className="portrait-sun" />
      <div className="portrait-hill hill-back" />
      <div className="portrait-hill hill-front" />
      <span className="portrait-caption">{content.about.portraitPlaceholder}</span>
    </div>
  )
}

function ResumePage({ onNavigate }) {
  return (
    <main>
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            {content.hero.eyebrow}
          </div>
          <h1>
            {content.hero.titleFirst}
            <br />
            <span>{content.hero.titleAccent}</span> {content.hero.titleMiddle}
            <br />
            {content.hero.titleLast}
          </h1>
          <p className="hero-description">{content.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#gallery" onClick={() => onNavigate('gallery')}>
              {content.hero.portfolioButton} <ArrowIcon />
            </a>
            <a className="text-link" href={`mailto:${content.identity.email}`}>
              {content.navigation.contactLink}
            </a>
          </div>
          <div className="hero-meta">
            <span>{content.identity.location.toLocaleUpperCase('fi-FI')}</span>
            <span>{content.identity.coordinates}</span>
          </div>
        </div>
        <div className="hero-visual">
          <PortraitPlaceholder />
          <div className="image-index">
            <span>{content.hero.imageIndex}</span>
            <span className="index-line" />
            <span>{content.about.sectionTitle.toLocaleUpperCase('fi-FI')}</span>
          </div>
          <div className="hero-sticker">
            <span>{content.hero.stickerFirst}</span>
            <span>{content.hero.stickerSecond}</span>
            <span className="sticker-star">✳</span>
          </div>
        </div>
      </section>

      <section className="about section-shell section-block">
        <SectionHeading number="01">{content.about.sectionTitle}</SectionHeading>
        <div className="about-grid">
          <p className="about-lead">{content.about.lead}</p>
          <div className="about-detail">
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className="text-link" href={`mailto:${content.identity.email}`}>
              {content.about.moreLink} <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="experience section-shell section-block">
        <SectionHeading number="02" aside={content.experienceSection.aside}>
          {content.experienceSection.title}
        </SectionHeading>
        <div className="experience-list">
          {content.experienceSection.items.map((item) => (
            <article className="experience-item" key={item.role}>
              <span className="experience-period">{item.period}</span>
              <div className="experience-role">
                <h3>{item.role}</h3>
                <span>{item.company}</span>
              </div>
              <p>{item.description}</p>
              <span className="experience-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="details section-shell section-block">
        <div>
          <SectionHeading number="03">{content.skillsSection.title}</SectionHeading>
          <div className="skill-list">
            {content.skillsSection.items.map((skill) => (
              <span className="skill-chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="education">
          <SectionHeading number="04">{content.educationSection.title}</SectionHeading>
          <div className="education-item">
            <span className="experience-period">{content.educationSection.period}</span>
            <h3>{content.educationSection.degree}</h3>
            <span>{content.educationSection.school}</span>
          </div>
          <a
            className="text-link cv-link"
            href={`mailto:${content.identity.email}?subject=${encodeURIComponent(content.educationSection.cvSubject)}`}
          >
            {content.educationSection.cvLink} <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="contact-band">
        <div className="section-shell contact-inner">
          <div>
            <span className="eyebrow">{content.contact.eyebrow}</span>
            <h2>{content.contact.title}</h2>
          </div>
          <a className="button button-light" href={`mailto:${content.identity.email}`}>
            {content.identity.email} <ArrowIcon />
          </a>
        </div>
      </section>
    </main>
  )
}

function GalleryArtwork({ project, lightbox = false }) {
  return (
    <div
      className={`project-art ${project.art}${lightbox ? ' lightbox-art' : ''}`}
      role="img"
      aria-label={project.label}
    >
      {project.media && <img className="project-media" src={project.media} alt="" />}
    </div>
  )
}

function GalleryPage() {
  const imageProjects = content.gallery.projects.filter((project) => project.type === 'image')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const dialogRef = useRef(null)
  const isOpen = selectedIndex !== null
  const selectedProject = isOpen ? imageProjects[selectedIndex] : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!isOpen || !dialog) return undefined

    dialog.showModal()
    return () => dialog.close()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedIndex((index) => (index - 1 + imageProjects.length) % imageProjects.length)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedIndex((index) => (index + 1) % imageProjects.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [imageProjects.length, isOpen])

  const showPreviousImage = () => {
    setSelectedIndex((index) => (index - 1 + imageProjects.length) % imageProjects.length)
  }
  const showNextImage = () => {
    setSelectedIndex((index) => (index + 1) % imageProjects.length)
  }

  return (
    <main className="gallery-page section-shell">
      <div className="gallery-intro">
        <div className="eyebrow">
          <span className="status-dot" />
          {content.gallery.eyebrow}
        </div>
        <h1>
          {content.gallery.titleFirst}{' '}
          <span>{content.gallery.titleAccent}</span>
        </h1>
        <p>{content.gallery.description}</p>
      </div>
      <SectionHeading number="05" aside={content.gallery.sectionAside}>
        {content.gallery.sectionTitle}
      </SectionHeading>
      <div className="gallery-grid">
        {imageProjects.map((project, index) => (
          <button
            className={`gallery-image-button project-card ${project.shape}`}
            key={project.title}
            type="button"
            aria-haspopup="dialog"
            aria-label={`Avaa kuva ${index + 1}: ${project.label}`}
            onClick={() => setSelectedIndex(index)}
          >
            <GalleryArtwork project={project} />
          </button>
        ))}
      </div>
      {selectedProject && (
        <dialog
          className="image-lightbox"
          ref={dialogRef}
          aria-label={selectedProject.label}
          onClick={(event) => {
            if (event.target === dialogRef.current) setSelectedIndex(null)
          }}
          onClose={() => setSelectedIndex(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Sulje kuva"
            onClick={() => setSelectedIndex(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <button
            className="lightbox-arrow lightbox-previous"
            type="button"
            aria-label="Edellinen kuva"
            onClick={showPreviousImage}
          >
            <ArrowIcon />
          </button>
          <GalleryArtwork project={selectedProject} lightbox />
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            aria-label="Seuraava kuva"
            onClick={showNextImage}
          >
            <ArrowIcon />
          </button>
        </dialog>
      )}
      <div className="gallery-note">
        <span className="note-star">✳</span>
        <p>{content.gallery.note}</p>
      </div>
    </main>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer section-shell">
      <a className="wordmark footer-wordmark" href="#home" onClick={() => onNavigate('home')}>
        <span className="wordmark-mark">{content.identity.monogram}</span>
        <span>{content.identity.name}</span>
      </a>
      <span>
        {content.footer.label} · {new Date().getFullYear()}
      </span>
      <div className="footer-links">
        <a href={`mailto:${content.identity.email}`}>{content.navigation.emailLink}</a>
        <a href="#gallery">{content.navigation.galleryLink}</a>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState(
    () => (window.location.hash === '#gallery' ? 'gallery' : 'home'),
  )

  useEffect(() => {
    document.title = content.site.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content.site.description)

    const syncPage = () => setPage(window.location.hash === '#gallery' ? 'gallery' : 'home')
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  return (
    <>
      <Header page={page} onNavigate={setPage} />
      {page === 'gallery' ? (
        <GalleryPage />
      ) : (
        <ResumePage onNavigate={setPage} />
      )}
      <Footer onNavigate={setPage} />
    </>
  )
}
