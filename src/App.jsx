import { useEffect, useState } from 'react'
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
            {String(content.gallery.projects.length).padStart(2, '0')}
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

function GalleryPage() {
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
        {content.gallery.projects.map((project, index) => (
          <article className={`project-card ${project.shape}`} key={project.title}>
            <div
              className={`project-art ${project.art}`}
              role={project.media ? undefined : 'img'}
              aria-label={project.media ? undefined : project.label}
            >
              {project.media ? (
                project.type === 'video' ? (
                  <video
                    className="project-media"
                    src={project.media}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={project.label}
                  />
                ) : (
                  <img className="project-media" src={project.media} alt={project.label} />
                )
              ) : (
                <>
                  <span className="placeholder-label">{content.gallery.placeholderLabel}</span>
                  {project.type === 'video' && (
                    <span className="play-button" aria-label={content.gallery.videoLabel}>
                      <svg aria-hidden="true" viewBox="0 0 20 20">
                        <path d="m7 4.5 9 5.5-9 5.5v-11Z" />
                      </svg>
                    </span>
                  )}
                </>
              )}
              <span className="project-index">0{index + 1}</span>
            </div>
            <div className="project-info">
              <div className="project-copy">
                <h3>{project.title}</h3>
                <span>{project.category}</span>
                <p>{project.description}</p>
              </div>
              <span className="project-type">
                {project.type === 'video' ? content.gallery.videoType : content.gallery.imageType}
              </span>
            </div>
          </article>
        ))}
      </div>
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
