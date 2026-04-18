import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

/* ─── AOS ─────────────────────────────────────────────────── */
function useAos() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('aos-visible'); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function AosDiv({ className = '', children, delay = 0 }) {
  const ref = useAos()
  return (
    <div ref={ref} className={`aos-hidden ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── Dữ liệu ảnh khách hàng ─────────────────────────────── */
const ANH_CUOI = [
  '/anh_cuoi/DSC02618.JPG',
  '/anh_cuoi/DSC04680.JPG',
  '/anh_cuoi/DSC04991.JPG',
  '/anh_cuoi/DSC05002.JPG',
  '/anh_cuoi/DSC05016%20(1).jpg',
  '/anh_cuoi/DSC05700.jpg',
  '/anh_cuoi/DSC05940.jpg',
  '/anh_cuoi/IMG_3491.JPG',
  '/anh_cuoi/IMG_6560.JPG',
  '/anh_cuoi/20x30%20-in%20tguong.JPG',
  '/anh_cuoi/20x30%20in%20tguong.JPG',
  '/anh_cuoi/20x30%20trangguong.jpg',
  '/anh_cuoi/20x30tg.JPG',
  '/anh_cuoi/20x30tguongg(1).jpg',
  '/anh_cuoi/20x30tguongg.JPG',
  '/anh_cuoi/att.HbbUUwSyDrlfr3JeQpdYYFkzEZiIOGhCpS_kydDHt4s.jpg',
]

const ANH_BAU = [
  '/anh_bau/2I4A1234.jpg',
  '/anh_bau/2I4A1297.jpg',
  '/anh_bau/2I4A1308.jpg',
  '/anh_bau/2I4A1716.jpg',
  '/anh_bau/2I4A5985.jpg',
  '/anh_bau/2%20(1).jpg',
  '/anh_bau/2I4A9536%201%20copy.JPG',
  '/anh_bau/2I4A9632%201%20copy.JPG',
  '/anh_bau/DSC03745%20copy.jpg',
  '/anh_bau/DSC03791%20copy.jpg',
  '/anh_bau/DSC09599%20copy.jpg',
  '/anh_bau/DSC09682%20copy.jpg',
  '/anh_bau/IMG_3256.PNG',
  '/anh_bau/IMG_3998.JPG',
  '/anh_bau/IMG_3999.JPG',
  '/anh_bau/IMG_4004.JPG',
  '/anh_bau/IMG_4006.JPG',
  // Bỏ HEIC (IMG_9124.HEIC, IMG_9130.HEIC) vì trình duyệt không hỗ trợ
  // Bỏ 'White Minimalist Photo Collage.jpg' (template design)
]

const ANH_BE = [
  '/anh_be/DSC04894%20(1).jpg',
  '/anh_be/DSC05028.jpg',
  '/anh_be/IMG_3690.JPG',
  '/anh_be/z7738164656853_39f9c441c31be78d830b8d23a374f7fd.jpg',
  '/anh_be/z7738164659013_e80d146ac0c1ff1a0d3da867b88f453e.jpg',
  '/anh_be/z7738164663086_88f049b42e41482575e73462a057bc35.jpg',
  '/anh_be/z7738164670674_a9347030411d1726dd1a2bcfc6ea31e6.jpg',
  '/anh_be/z7738164672578_175e887847c51678e2e24e3b14f012ab.jpg',
  '/anh_be/z7738164681751_07c87e16cb12a84bb96f9b0dcc8473b6.jpg',
  '/anh_be/z7738164923119_39dd63b94e29e85c1b31ff95528c0fd3.jpg',
  '/anh_be/z7738164928340_38503666863700a4c8f31d5f8bb86385.jpg',
  '/anh_be/z7738165191100_b57c594279dd3d9f5f03e5654ba1eb62.jpg',
  '/anh_be/z7738165364568_35f7f8b24d08e02ea54d9d48095abc50.jpg',
  '/anh_be/z7738165384458_4bdde23dc7ae76a27529544645eee7b6.jpg',
  '/anh_be/z7738165394902_fdc57b056426c2c4848fd789c1e5c61c.jpg',
  '/anh_be/z7738165444535_3745f102a7b4955771399341dd2d3611.jpg',
  '/anh_be/z7738165838538_1fa025f57334949af9860aa0c215e40d.jpg',
  '/anh_be/z7738166431545_8d8cdf7fed0461c47679234ab10cda41.jpg',
  '/anh_be/z7738166643541_509116551f7773c8e30170bec06a3ec0.jpg',
]

const ANH_KIMONO = [
  '/anh_kimono/DSC04452.JPG',
  '/anh_kimono/DSC02969.jpg',
  '/anh_kimono/DSC04680.JPG',
  '/anh_kimono/DSC04991.JPG',
  '/anh_kimono/DSC05002.JPG',
  '/anh_kimono/DSC05700.jpg',
  '/anh_kimono/DSC05940.jpg',
  '/anh_kimono/DSC02618.JPG',
  '/anh_kimono/IMG_6560.JPG',
  '/anh_kimono/20x30tguongg.JPG',
]

/* ─── Lightbox ────────────────────────────────────────────── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 md:left-8 text-white/60 hover:text-white text-3xl font-light w-14 h-14 flex items-center justify-center transition-colors duration-200 z-10"
      >
        ←
      </button>
      <img
        src={images[index]}
        alt=""
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 md:right-8 text-white/60 hover:text-white text-3xl font-light w-14 h-14 flex items-center justify-center transition-colors duration-200 z-10"
      >
        →
      </button>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-light w-10 h-10 flex items-center justify-center transition-colors duration-200 z-10"
      >
        ✕
      </button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 font-body text-xs tracking-widest">
        {index + 1} / {images.length}
      </p>
    </div>
  )
}

/* ─── Gallery Grid ────────────────────────────────────────── */
function GalleryGrid({ images, title }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const total = images.length

  if (!total) return null

  return (
    <div className="mt-16">
      <AosDiv className="mb-8">
        <p className="section-label">{title}</p>
      </AosDiv>
      <div className="masonry-grid">
        {images.map((src, i) => (
          <AosDiv key={i} delay={i * 40} className="masonry-item">
            <div
              className="overflow-hidden group cursor-pointer"
              onClick={() => setLightboxIdx(i)}
            >
              <img
                src={src}
                alt=""
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </AosDiv>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + total) % total)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % total)}
        />
      )}
    </div>
  )
}

/* ─── Bảng giá: Wedding ───────────────────────────────────── */
function WeddingPrice({ isJp, priceTitle }) {
  const [img1, img2] = isJp
    ? ['/Bang_gia/chup_cuoi_1_left.jpg', '/Bang_gia/chup_cuoi_2_left.jpg']
    : ['/Bang_gia/chup_cuoi_1.jpg', '/Bang_gia/chup_cuoi_2.jpg']

  return (
    <div className="mt-12">
      <AosDiv className="mb-8">
        <p className="section-label">{priceTitle}</p>
      </AosDiv>
      <AosDiv className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <img src={img1} alt="Bảng giá cưới 1" className="w-full object-contain rounded-sm shadow-md" />
        <img src={img2} alt="Bảng giá cưới 2" className="w-full object-contain rounded-sm shadow-md" />
      </AosDiv>
    </div>
  )
}

/* ─── Bảng giá: Kimono ────────────────────────────────────── */
function KimonoPrice({ priceTitle }) {
  return (
    <div className="mt-12">
      <AosDiv className="mb-8">
        <p className="section-label">{priceTitle}</p>
      </AosDiv>
      {/* 5.jpg nằm trên cùng - full width */}
      <AosDiv className="mb-4 md:mb-6">
        <img src="/kimono/5.jpg" alt="Bảng giá kimono" className="w-full object-contain rounded-sm shadow-md" />
      </AosDiv>
      {/* 4 ảnh còn lại: 2x2 grid */}
      <AosDiv className="grid grid-cols-2 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((n) => (
          <img key={n} src={`/kimono/${n}.jpg`} alt={`Kimono ${n}`} className="w-full object-contain rounded-sm shadow-md" />
        ))}
      </AosDiv>
    </div>
  )
}

/* ─── Bảng giá: đơn ảnh (Mẹ Bầu / Em Bé) ────────────────── */
function SinglePrice({ isJp, mainImg, leftImg, priceTitle }) {
  const src = isJp ? leftImg : mainImg
  return (
    <div className="mt-12">
      <AosDiv className="mb-8">
        <p className="section-label">{priceTitle}</p>
      </AosDiv>
      <AosDiv className="max-w-2xl mx-auto">
        <img src={src} alt="Bảng giá" className="w-full object-contain rounded-sm shadow-md" />
      </AosDiv>
    </div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────  */
const TABS = ['wedding', 'kimono', 'bau', 'be']

const TAB_HERO_IMGS = {
  wedding: '/anh_cuoi/DSC05002.JPG',
  kimono: '/anh_kimono/DSC04452.JPG',
  bau: '/anh_bau/2I4A1234.jpg',
  be: '/anh_be/DSC05028.jpg',
}

export default function Services() {
  const { t, lang } = useLang()
  const tr = (k) => t(`services.${k}`)
  const [searchParams] = useSearchParams()
  const initialTab = TABS.includes(searchParams.get('tab')) ? searchParams.get('tab') : 'wedding'
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (TABS.includes(tab)) setActiveTab(tab)
  }, [searchParams])
  const [openFaq, setOpenFaq] = useState(null)
  const isJp = lang === 'jp'
  const faqItems = t('services.faq') || []

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end pb-16 overflow-hidden">
        <img
          key={activeTab}
          src={TAB_HERO_IMGS[activeTab]}
          alt={activeTab}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        <AosDiv className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="section-label text-cream/60 mb-2">{tr('hero.label')}</p>
          <h1 className="section-title-light whitespace-pre-line mb-4">{tr('hero.title')}</h1>
          <p className="font-body font-light text-sm text-cream/70 max-w-lg">{tr('hero.subtitle')}</p>
        </AosDiv>
      </section>

      {/* Tab Navigator */}
      <section className="bg-cream border-b border-bone sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-stretch overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 flex flex-col items-center justify-center px-8 py-5 font-body font-medium text-xs tracking-widest uppercase transition-all duration-300 border-b-2 whitespace-nowrap
                  ${activeTab === tab
                    ? 'border-b-2 text-ink'
                    : 'border-transparent text-mist hover:text-ink'
                  }`}
                style={activeTab === tab ? { borderBottomColor: '#BBA18E', color: '#BBA18E' } : {}}
              >
                {tr(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Package Header */}
          <AosDiv key={activeTab} className="max-w-2xl mb-4">
            <h2 className="section-title mb-4">{tr(`descriptions.${activeTab}.title`)}</h2>
            <p className="font-body font-light text-sm text-stone leading-relaxed">
              {tr(`descriptions.${activeTab}.desc`)}
            </p>
          </AosDiv>

          {/* Pricing Images */}
          {activeTab === 'wedding' && (
            <WeddingPrice isJp={isJp} priceTitle={tr('priceTitle')} />
          )}
          {activeTab === 'kimono' && (
            <KimonoPrice priceTitle={tr('priceTitle')} />
          )}
          {activeTab === 'bau' && (
            <SinglePrice
              isJp={isJp}
              mainImg="/Bang_gia/chup_anh_bau.jpg"
              leftImg="/Bang_gia/chup_anh_bau_left.jpg"
              priceTitle={tr('priceTitle')}
            />
          )}
          {activeTab === 'be' && (
            <SinglePrice
              isJp={isJp}
              mainImg="/Bang_gia/chup_anh_be.jpg"
              leftImg="/Bang_gia/chup_anh_be_left.jpg"
              priceTitle={tr('priceTitle')}
            />
          )}

          {/* Customer Gallery */}
          {activeTab === 'wedding' && (
            <GalleryGrid images={ANH_CUOI} title={tr('galleryTitle')} />
          )}
          {activeTab === 'kimono' && (
            <GalleryGrid images={ANH_KIMONO} title={tr('galleryTitle')} />
          )}
          {activeTab === 'bau' && (
            <GalleryGrid images={ANH_BAU} title={tr('galleryTitle')} />
          )}
          {activeTab === 'be' && (
            <GalleryGrid images={ANH_BE} title={tr('galleryTitle')} />
          )}

          {/* Book CTA */}
          <AosDiv className="mt-16 pt-12 border-t border-bone text-center">
            <Link to="/booking" className="btn-outline">
              {tr('bookNow')}
            </Link>
          </AosDiv>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-sand">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <AosDiv className="mb-12">
            <p className="section-label">{tr('faqTitle')}</p>
          </AosDiv>
          <div className="space-y-px bg-bone">
            {faqItems.map((item, i) => (
              <AosDiv key={i} delay={i * 80} className="bg-cream">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 px-8 py-6 text-left"
                >
                  <span className="font-body font-medium text-sm text-ink">{item.q}</span>
                  <span className={`font-display text-xl text-mist flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? 'max-h-60' : 'max-h-0'}`}>
                  <p className="font-body font-light text-sm text-stone leading-relaxed px-8 pb-6">{item.a}</p>
                </div>
              </AosDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-center px-6">
        <AosDiv>
          <h2 className="section-title-light mb-6">{t('home.ctaSection.title').replace('\n', ' ')}</h2>
          <Link to="/booking" className="btn-outline-cream">{t('home.ctaSection.button')}</Link>
        </AosDiv>
      </section>
    </div>
  )
}
